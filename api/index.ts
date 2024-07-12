import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://94.198.219.2:8000',
    timeout: 10000
});

export function customFetch<T>(url: string, options: any = {}) {
    const baseURL = 'http://94.198.219.2:8000';
    return $fetch<T>(baseURL+url, {
        headers: {
        },
        ...options
    })
}

export default axiosInstance;