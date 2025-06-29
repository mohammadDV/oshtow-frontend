import { API_URL } from "@/configs/global";
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestHeaders } from "axios";

const httpService = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
        // "Authorization": `Bearer ${typeof window !== "undefined" ? JSON.parse(localStorage.getItem('accessToken')!) : null}`
    },
});

export interface ApiResponse {
    isSuccess: boolean;
    data?: any;
}

httpService.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error?.response) {
            throw {
                isSuccess: false,
                ...(error.response?.data as object),
            } as ApiResponse;
        } else {
            throw {
                isSuccess: false,
                message: "خطای ناشناخته رخ داده است",
            } as ApiResponse;
        }
    }
);

async function apiBase<T>(
    url: string,
    options: AxiosRequestConfig
): Promise<T> {
    try {
        const response = await httpService(url, options);
        return {
            isSuccess: true,
            data: response?.data
        } as T
    } catch (error: any) {
        return error
    }
}

async function readData<T>(
    url: string,
    headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        headers: headers,
        method: "GET",
    };
    return await apiBase<T>(url, options);
}

async function createData<T>(
    url: string, data: any, headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: "POST",
        headers: headers,
        data: JSON.stringify(data),
    };
    return await apiBase<T>(url, options);
}

async function updateData<T>(
    url: string,
    data: any,
    headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: "PUT",
        headers: headers,
        data: JSON.stringify(data),
    };
    return await apiBase<T>(url, options);
}

async function createFormData<T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: "POST",
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
        },
        data: formData,
    };
    return await apiBase<T>(url, options);
}

async function updateFormData<T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: "PUT",
        headers: {
            ...headers,
            "Content-Type": "multipart/form-data",
        },
        data: formData,
    };
    return await apiBase<T>(url, options);
}

async function deleteData<T>(
    url: string, headers?: AxiosRequestHeaders
): Promise<T> {
    const options: AxiosRequestConfig = {
        method: "DELETE",
        headers: headers,
    };
    return await apiBase<T>(url, options);
}

export {
    createData,
    deleteData,
    readData,
    updateData,
    createFormData,
    updateFormData
};
