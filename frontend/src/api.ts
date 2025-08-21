import axios from "axios";

export const api = axios.create({
    baseURL: "https://raruearnings.onrender.com",
    timeout: 8000,
})