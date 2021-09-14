import axios, { AxiosError, AxiosResponse } from 'axios';

const Axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

Axios.interceptors.request.use(async (config) => {
    return config;
});

export const get = async (url: string): Promise<AxiosResponse> => await Axios.get(url);

export const post = async (url: string, body?: unknown): Promise<AxiosResponse> => await Axios.post(url, body);

export const put = async (url: string, body?: unknown): Promise<AxiosResponse> => await Axios.put(url, body);

export const patch = async (url: string, body?: unknown): Promise<AxiosResponse> => await Axios.patch(url, body);

export const _delete = async (url: string, body?: unknown): Promise<AxiosResponse> => await Axios.delete(url, { data: body });

export const handleAlertError = (error: unknown) => {
    const e = error as AxiosError;
    alert(e.response?.data.message);
}
