import { supabase } from './dbConnect/supabaseClient.js';

// Upload base64 image string to Supabase Storage, returns public URL
export async function uploadProfilePic(base64Image, username) {
    if (!base64Image.startsWith('data:image')) {
        // If it's already a URL or null, just return it directly
        return base64Image;
    }

    // Convert base64 to Blob
    const res = await fetch(base64Image);
    const blob = await res.blob();

    // Extract file extension from base64 string (e.g. png, jpeg)
    const fileExt = base64Image.substring("data:image/".length, base64Image.indexOf(";base64"));
    const fileName = `${username}_profile.${fileExt}`;
    const filePath = `profile-pics/${fileName}`;

    // Upload to the 'avatars' bucket in Supabase Storage
    const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        throw new Error('Profile picture upload failed: ' + error.message);
    }

    // Get public URL
    const { publicURL, error: urlError } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

    if (urlError) {
        throw new Error('Failed to get profile picture URL: ' + urlError.message);
    }

    return publicURL;
}

export const checkUsernameExists = async (username) => {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .limit(1);

    if (error) {
        throw new Error(error.message);
    }

    return data.length > 0;
};

export const createUser = async ({ username, password, profilePic }) => {
    // Upload profile picture and get URL if needed
    let profilePicUrl = null;
    if (profilePic) {
        profilePicUrl = await uploadProfilePic(profilePic, username);
    }

    // Insert user with profile_pic URL
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, profile_pic: profilePicUrl }])
        .select();

    if (error) {
        throw new Error(error.message);
    }

    if (!data || data.length === 0) {
        throw new Error('User creation failed');
    }

    return data[0];
};

// Update user's password
export const updatePassword = async (userId, newPassword) => {
    const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', userId);

    if (error) {
        throw new Error('Password update failed: ' + error.message);
    }

    return data;
};

// Update user's profile picture by uploading new image and updating DB
export const updateProfilePic = async (userId, file, username) => {
    // Convert file to base64 string
    const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const publicUrl = await uploadProfilePic(base64Image, username);

    // Update DB with new profile pic URL
    const { data, error } = await supabase
        .from('users')
        .update({ profile_pic: publicUrl })
        .eq('id', userId);

    if (error) {
        throw new Error('Profile pic update failed: ' + error.message);
    }

    return data;
};
