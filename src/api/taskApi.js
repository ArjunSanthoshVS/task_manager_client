import axios from "axios"
const URL = import.meta.env.VITE_SERVER_URL

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(`${URL}/task`, taskData, getAuthHeaders());
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export const fetchTasks = async () => {
    try {
        const response = await axios.get(`${URL}/task`, getAuthHeaders());
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${URL}/task/${taskId}`, taskData, getAuthHeaders());
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${URL}/task/${taskId}`, getAuthHeaders());
        return response.data;
    } catch (error) {
        return error.response?.data || error.message;
    }
};
