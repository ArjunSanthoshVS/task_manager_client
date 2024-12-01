import React from 'react';
import './Overlay.css';
import { IoCloseSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Overlay = ({ setHamburger }) => {
    const navigate = useNavigate()
    const userId = localStorage.getItem("userId")

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.dispatchEvent(new Event("storage"));
        navigate('/login');
    };

    return (
        <div className="overlay-container">
            <IoCloseSharp
                className="close-icon"
                onClick={() => setHamburger(false)}
            />
            <nav className="overlay-nav">
                {userId ? (
                    <button className="overlay-button logout" onClick={handleLogout} >Log Out</button>
                ) : (
                    <>
                        <button className="overlay-button signup" onClick={() => navigate('/signup')}>Sign Up</button>
                        <button className="overlay-button login" onClick={() => navigate('/login')}>Log In</button>
                    </>
                )}
            </nav>
        </div>
    );
};

export default Overlay;
