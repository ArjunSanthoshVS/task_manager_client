import React from 'react';
import "./Navbar.css";
import { GiHamburgerMenu } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setHamburger }) => {
    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        window.dispatchEvent(new Event("storage"));
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">📅</div>
            <div className="navbar-links">
                {userId ? (
                    <button
                        className="navbar-btn navbar-logout"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <button
                            className="navbar-btn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </button>
                        <button
                            className="navbar-btn navbar-signup"
                            onClick={() => navigate('/signup')}
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
            <GiHamburgerMenu
                className="text-3xl text-white"
                onClick={() => setHamburger(true)}
            />
        </nav>
    );
};

export default Navbar;
