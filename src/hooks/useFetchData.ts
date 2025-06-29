'use client'

import { useEffect, useState, useCallback } from "react";
import { AxiosRequestHeaders } from "axios";
import { readData } from "@/core/http-service";

interface UseFetchDataOptions {
    headers?: AxiosRequestHeaders;
}

export function useFetchData<T>(url: string, options?: UseFetchDataOptions) {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const result = await readData<T>(url, options?.headers);
        setResponse(result);
        setLoading(false);
    }, [url, options?.headers]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        response,
        loading,
        refetch: fetchData
    };
}