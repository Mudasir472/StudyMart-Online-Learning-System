import axios from 'axios';

const api = axios.create({
    baseURL: "https://study-mart-backend.vercel.app/auth",
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`https://study-mart-backend.vercel.app/auth/google?code=${code}`);