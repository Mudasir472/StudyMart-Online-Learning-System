import axios from 'axios';
import { URI } from "../env.js"
const api = axios.create({
    baseURL: URI
    // withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);