import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import "./Login.css";
import { login, googleLogin } from "../../../api/authApi";
import { useNavigate } from "react-router-dom";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        try {
            setLoading(true);
            const response = await login(formData);

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
            <div className="login-wrapper">
                <h1 className="login-heading">Login</h1>
                <div className="login-container">
                    <form className="login-form" onSubmit={handleSubmit}>
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
                        <button type="submit" className="btn primary" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        {error && <p className="error">{error}</p>}
                        {success && <p className="success">Login successful!</p>}
                        <p>
                            Don’t have an account?{" "}
                            <span
                                style={{ cursor: "pointer", color: "blue" }}
                                onClick={() => navigate("/signup")}
                            >
                                Signup
                            </span>
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

export default Login;
