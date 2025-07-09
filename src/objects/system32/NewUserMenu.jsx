import React, { useState, useRef } from 'react';
import './NewUserMenu.css';
import defaultSetup from './img/defaultsetup.png';
import defaultProfilePic from './img/defaultpfp.png';
import { supabase } from '../system32/dbConnect/supabaseClient.js';

const NewUserMenu = ({ setActiveUser, closeWindow }) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState('win98user');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);

    const handleNext = () => setStep((prev) => Math.min(prev + 1, 2));
    const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = async () => {
        const trimmedUsername = username.trim();

        // 1. Check if username already exists
        const { data: existingUsers, error: fetchError } = await supabase
            .from('users')
            .select('id')
            .eq('username', trimmedUsername)
            .limit(1);

        if (fetchError) {
            console.error('Error checking for existing user:', fetchError.message);
            alert('Unexpected error. Please try again.');
            return;
        }

        if (existingUsers && existingUsers.length > 0) {
            alert(`Username "${trimmedUsername}" is already taken. Please choose another.`);
            return;
        }

        // 2. Insert new user
        const user = {
            username: trimmedUsername,
            password: String(password),
            profile_pic: profilePic || defaultProfilePic,
        };

        const { data, error } = await supabase
            .from('users')
            .insert([user])
            .select(); // Ensures data is returned

        if (error || !data || data.length === 0) {
            console.error('Error creating user:', error?.message);
            alert('Failed to create user. Please try again.');
            return;
        }

        // 3. User successfully created
        alert(`Welcome, ${data[0].username}! Your account has been created.`);
        setActiveUser(data[0]);
        closeWindow();
    };

    const renderFormStep = () => {
        switch (step) {
            case 0:
                return (
                    <NewUserForm0
                        onNext={handleNext}
                        username={username}
                        setUsername={setUsername}
                    />
                );
            case 1:
                return (
                    <NewUserForm1
                        onNext={handleNext}
                        onBack={handleBack}
                        password={password}
                        confirmPassword={confirmPassword}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                    />
                );
            case 2:
                return (
                    <NewUserForm2
                        onBack={handleBack}
                        profilePic={profilePic}
                        setProfilePic={setProfilePic}
                        onSubmit={handleSubmit}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="NewUserMenu">
            <div className="imageContainer">
                <img src={defaultSetup} alt="Default Setup Preview" />
            </div>
            {renderFormStep()}
        </div>
    );
};

const NewUserForm0 = ({ onNext, username, setUsername }) => (
    <div className="NewUserForm">
        <div className="textbox">
            <h2>User Information</h2>
        </div>
        <div className="inputContainer">
            <label htmlFor="username">Username</label>
            <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div className="buttonGroup">
                <button type="button" className="nextButton" onClick={onNext} disabled={!username.trim()}>
                    Next
                </button>
            </div>
        </div>
    </div>
);

const NewUserForm1 = ({
                          onBack,
                          onNext,
                          password,
                          confirmPassword,
                          setPassword,
                          setConfirmPassword,
                      }) => {
    const passwordsMatch = password === confirmPassword;

    return (
        <div className="NewUserForm">
            <div className="textbox">
                <h2>User Information</h2>
            </div>
            <label>Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password (Can be blank)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordsMatch && (
                <div className="errorMessage">
                    Passwords do not match.
                </div>
            )}
            <div className="buttonGroup">
                <button type="button" className="backButton" onClick={onBack}>
                    Back
                </button>
                <button
                    type="button"
                    className="nextButton"
                    onClick={onNext}
                    disabled={!passwordsMatch}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

const NewUserForm2 = ({ onBack, profilePic, setProfilePic, onSubmit }) => {
    const fileInputRef = useRef();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="NewUserForm">
            <div className="textbox">
                <h2>Profile Pic (Optional)</h2>
            </div>
            <div className="profilePicContainer">
                <img src={profilePic || defaultProfilePic} alt="Profile Preview" />
            </div>
            <input
                type="file"
                accept="image/png, image/jpeg"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
            />
            <div className="buttonGroup">
                <button
                    type="button"
                    className="standardButton"
                    onClick={() => fileInputRef.current.click()}
                >
                    Upload
                </button>
                <button type="button" className="backButton" onClick={onBack}>
                    Back
                </button>
                <button type="button" className="nextButton" onClick={onSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default NewUserMenu;
