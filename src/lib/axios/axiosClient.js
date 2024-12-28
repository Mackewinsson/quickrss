import axios from "axios";
import {getMyAuth0Token} from "./getAccessToken";

// 1) Create an Axios instance
const axiosClient = axios.create({
    // Adjust the baseURL to your Express API origin:
    baseURL: process.env.API_BASE_URL || "http://localhost:3001",
});
// 2) OPTIONAL: Request interceptor to attach token
axiosClient.interceptors.request.use(
    async (config) => {
        // Here, grab your Auth0 access token from wherever you're currently storing it.
        // For example, if you have a custom hook or context that returns the token:
        const token = await getMyAuth0Token();
       // We'll show a snippet next
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token.accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosClient;
