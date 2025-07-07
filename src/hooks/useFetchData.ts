'use client'

import { getFetch } from "@/core/publicService";
import { useEffect, useState, useCallback } from "react";

export function useFetchData<T>(url: string) {
    const [response, setResponse] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getFetch<T>(url);
            setResponse(result);
        } catch (error) {
            console.error('Error fetching data:', error);
            setResponse(null);
        }
        setLoading(false);
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        response,
        loading,
        refetch: fetchData
    };
}