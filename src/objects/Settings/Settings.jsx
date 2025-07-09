import React, { useState } from 'react';
import './Settings.css';
import defaultpfp from "../system32/img/defaultpfp.png";
import { updatePassword, updateProfilePic } from '../system32/userService.js'; // Adjust path as needed

const Settings = ({ userId, username, profilePic, onUserUpdate }) => {
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [isChangingProfilePic, setIsChangingProfilePic] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [newProfilePicFile, setNewProfilePicFile] = useState(null);
    const [previewPic, setPreviewPic] = useState(null);

    // Password update
    const handlePasswordSubmit = async () => {
        if (!newPassword) {
            alert('Please enter a new password.');
            return;
        }
        try {
            await updatePassword(userId, newPassword);
            alert('Password updated successfully');
            setIsChangingPassword(false);
            setNewPassword('');
        } catch (err) {
            alert('Error updating password: ' + err.message);
        }
    };

    // Profile pic input change
    const handleProfilePicChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProfilePicFile(file);
            setPreviewPic(URL.createObjectURL(file));
        }
    };

    // Profile pic upload submit
    const handleProfilePicSubmit = async () => {
        if (!newProfilePicFile) {
            alert('Please select a new profile picture.');
            return;
        }
        try {
            await updateProfilePic(userId, newProfilePicFile, username);
            alert('Profile picture updated successfully');
            setIsChangingProfilePic(false);
            setNewProfilePicFile(null);
            setPreviewPic(null);
            // Notify parent about update to reload info if needed
            if (onUserUpdate) onUserUpdate();
        } catch (err) {
            alert('Error updating profile picture: ' + err.message);
        }
    };

    return (
        <div className="Settings">
            <img src={previewPic || profilePic || defaultpfp} alt={`${username}'s profile`} />
            <div className="userbar">
                <h2>{username}</h2>
            </div>

            <div className="settingsOptions">
                {/* Change Password */}
                {isChangingPassword ? (
                    <>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                        />
                        <button onClick={handlePasswordSubmit}>Save Password</button>
                        <button onClick={() => setIsChangingPassword(false)}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsChangingPassword(true)}>Change Password</button>
                )}

                {/* Change Profile Pic */}
                {isChangingProfilePic ? (
                    <>
                        <input type="file" accept="image/*" onChange={handleProfilePicChange} />
                        <button onClick={handleProfilePicSubmit}>Upload Picture</button>
                        <button onClick={() => {
                            setIsChangingProfilePic(false);
                            setNewProfilePicFile(null);
                            setPreviewPic(null);
                        }}>Cancel</button>
                    </>
                ) : (
                    <button onClick={() => setIsChangingProfilePic(true)}>Change Profile Pic</button>
                )}
            </div>
        </div>
    );
};

export default Settings;
