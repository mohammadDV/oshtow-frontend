import { API_URL } from '@/configs/global';

interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: any;
    headers?: Record<string, string>;
    isFormData?: boolean;
}

const baseFetchPublic = async <T = any>(
    url: string,
    options: FetchOptions = {}
): Promise<T> => {
    const {
        method = 'GET',
        body,
        headers: customHeaders = {},
        isFormData = false
    } = options;

    const baseHeaders: Record<string, string> = {
        'Accept': 'application/json',
        ...customHeaders
    };

    if (!isFormData) {
        baseHeaders['Content-Type'] = 'application/json';
    }

    const requestBody = body && !isFormData ? JSON.stringify(body) : body;

    const res = await fetch(`${API_URL}${url}`, {
        cache: 'no-store',
        method,
        headers: baseHeaders,
        ...(requestBody && { body: requestBody })
    });

    return await res.json();
};

const getFetch = async <T = any>(url: string): Promise<T> => {
    const res = await baseFetchPublic<T>(url, {
        method: 'GET'
    });
    if (res) {
        return res;
    } else {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};

const postFetch = async <T = any>(url: string, body: any): Promise<T> => {
    return baseFetchPublic<T>(url, {
        method: 'POST',
        body
    });
};

const postFormData = async <T = any>(url: string, formData: FormData): Promise<T> => {
    return baseFetchPublic<T>(url, {
        method: 'POST',
        body: formData,
        isFormData: true
    });
};

export {
    baseFetchPublic,
    getFetch,
    postFetch,
    postFormData
};