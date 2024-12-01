import axios from "axios"
const URL = import.meta.env.VITE_SERVER_URL

export const signup = async (data) => {
    try {
        const response = await axios.post(`${URL}/signup`, data);
        return response.data
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
        return error.response?.data || error.message;
    }

}

export const login = async (data) => {
    try {
        const response = await axios.post(`${URL}/login`, data);
        return response.data
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        return error.response?.data || error.message;
    }

}

export const googleLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/google-login`, data);
        return response.data
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        return error.response?.data || error.message;
    }

}
