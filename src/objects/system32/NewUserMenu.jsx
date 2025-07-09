import React, { useState, useRef } from 'react';
import './NewUserMenu.css';
import defaultSetup from './img/defaultsetup.png';
import defaultProfilePic from './img/defaultpfp.png';
import { checkUsernameExists, createUser, loginUser } from './userService.js';

const NewUserMenu = ({ setActiveUser, closeWindow }) => {
    const [step, setStep] = useState(0);
    const [username, setUsername] = useState('win98user');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [isExistingUser, setIsExistingUser] = useState(false);

    const handleUsernameNext = async () => {
        const trimmedUsername = username.trim();
        if (!trimmedUsername) return;

        try {
            const exists = await checkUsernameExists(trimmedUsername);
            setIsExistingUser(exists);
            setStep(1);
        } catch (error) {
            alert('Error checking username: ' + error.message);
        }
    };

    const handleSubmit = async () => {
        const trimmedUsername = username.trim();

        try {
            if (isExistingUser) {
                const user = await loginUser(trimmedUsername, password);
                alert(`Welcome back, ${user.username}!`);
                setActiveUser(user);
                closeWindow();
            } else {
                const user = await createUser({
                    username: trimmedUsername,
                    password: String(password),
                    profilePic: profilePic || defaultProfilePic,
                });

                alert(`Welcome, ${user.username}! Your account has been created.`);
                setActiveUser(user);
                closeWindow();
            }
        } catch (error) {
            alert('Error: ' + error.message);
        }
    };

    const renderFormStep = () => {
        switch (step) {
            case 0:
                return (
                    <NewUserForm0
                        onNext={handleUsernameNext}
                        username={username}
                        setUsername={setUsername}
                    />
                );
            case 1:
                return isExistingUser ? (
                    <ExistingUserLoginForm
                        onBack={() => setStep(0)}
                        password={password}
                        setPassword={setPassword}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <NewUserForm1
                        onNext={() => setStep(2)}
                        onBack={() => setStep(0)}
                        password={password}
                        confirmPassword={confirmPassword}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                    />
                );
            case 2:
                return (
                    <NewUserForm2
                        onBack={() => setStep(1)}
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
        <div className="textbox"><h2>User Information</h2></div>
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
            <div className="textbox"><h2>Set Password</h2></div>
            <label>Password</label>
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <label>Confirm Password</label>
            <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordsMatch && <div className="errorMessage">Passwords do not match.</div>}
            <div className="buttonGroup">
                <button type="button" className="backButton" onClick={onBack}>Back</button>
                <button type="button" className="nextButton" onClick={onNext} disabled={!passwordsMatch}>
                    Next
                </button>
            </div>
        </div>
    );
};

const ExistingUserLoginForm = ({ onBack, password, setPassword, onSubmit }) => (
    <div className="NewUserForm">
        <div className="textbox"><h2>Enter Password to Log In</h2></div>
        <label>Password</label>
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <div className="buttonGroup">
            <button type="button" className="backButton" onClick={onBack}>Back</button>
            <button type="button" className="nextButton" onClick={onSubmit} disabled={!password}>
                Log In
            </button>
        </div>
    </div>
);

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
            <div className="textbox"><h2>Profile Pic (Optional)</h2></div>
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
                <button type="button" className="standardButton" onClick={() => fileInputRef.current.click()}>
                    Upload
                </button>
                <button type="button" className="backButton" onClick={onBack}>Back</button>
                <button type="button" className="nextButton" onClick={onSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default NewUserMenu;
