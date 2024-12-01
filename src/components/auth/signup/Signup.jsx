import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Signup.css";
import { signup, googleLogin } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            const response = await signup(formData);

            setLoading(false);

            if (response.message) {
                throw new Error(response.message || "Signup failed");
            }

            setSuccess(true);
            navigate('/login')
        } catch (err) {
            setLoading(false);
            setError(err.message || "Something went wrong.");
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            setLoading(true);
            // Send the Google credential token to your backend for verification and user login/registration
            const response = await googleLogin({ googleToken: credentialResponse.credential });

            setLoading(false);

            if (!response.token || !response.user) {
                throw new Error(response.message || "Login failed");
            }

            localStorage.setItem("token", response.token);
            localStorage.setItem("userId", response.user.id);

            setSuccess(true);

            window.dispatchEvent(new Event("storage"));

            navigate("/");
        } catch (err) {
            setLoading(false);
            setError(err.message || "Google Login failed.");
        }
    };

    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <div className="signup-wrapper">
                <h1 className="signup-heading">Signup</h1>
                <div className="signup-container">
                    <form className="signup-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit" className="btn primary" disabled={loading}>
                            {loading ? "Signing up..." : "Signup"}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">Signup successful!</p>}
                        <p>
                            Already have an account? <span style={{ cursor: "pointer", color: "blue" }} onClick={() => navigate('/login')}>Login</span>
                        </p>
                    </form>
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => setError("Google Login failed")}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
};

export default Signup;
