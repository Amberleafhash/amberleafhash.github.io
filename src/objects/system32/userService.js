import { supabase } from './dbConnect/supabaseClient.js';

export async function updateMinesweeperHighScore(userId, score) {
    const { data, error } = await supabase
        .from('users')
        .update({ minesweeper_high_score: score })
        .eq('id', userId);

    if (error) {
        console.error('Error updating minesweeper high score:', error);
        throw error;
    }
    return data;
}

export async function uploadProfilePic(base64Image, username) {
    if (!base64Image.startsWith('data:image')) return base64Image;

    const res = await fetch(base64Image);
    const blob = await res.blob();
    const fileExt = base64Image.substring("data:image/".length, base64Image.indexOf(";base64"));
    const fileName = `${username}_profile.${fileExt}`;
    const filePath = `profile-pics/${fileName}`;

    const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, blob, { cacheControl: '3600', upsert: true });

    if (error) throw new Error('Profile picture upload failed: ' + error.message);

    const { publicURL, error: urlError } = supabase.storage.from('avatars').getPublicUrl(filePath);
    if (urlError) throw new Error('Failed to get profile picture URL: ' + urlError.message);

    return publicURL;
}

export const checkUsernameExists = async (username) => {
    const { data, error } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .limit(1);

    if (error) throw new Error(error.message);
    return data.length > 0;
};

export const createUser = async ({ username, password, profilePic }) => {
    let profilePicUrl = null;
    if (profilePic) {
        profilePicUrl = await uploadProfilePic(profilePic, username);
    }

    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password, profile_pic: profilePicUrl }])
        .select();

    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error('User creation failed');

    return data[0];
};

export const loginUser = async (username, password) => {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();

    if (error || !data) throw new Error('Invalid username or password');
    return data;
};

export const updatePassword = async (userId, newPassword) => {
    const { data, error } = await supabase
        .from('users')
        .update({ password: newPassword })
        .eq('id', userId);

    if (error) throw new Error('Password update failed: ' + error.message);
    return data;
};

export const updateProfilePic = async (userId, file, username) => {
    const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const publicUrl = await uploadProfilePic(base64Image, username);

    const { data, error } = await supabase
        .from('users')
        .update({ profile_pic: publicUrl })
        .eq('id', userId);

    if (error) throw new Error('Profile pic update failed: ' + error.message);
    return data;
};

