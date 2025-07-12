"use client";

import { useState, useEffect } from "react";

const useLocalStorage = (key: string, initialValue?: any) => {
    const [localStorageValue, setLocalStorageValue] = useState(initialValue);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const value = window.localStorage.getItem(key);
                if (value) {
                    setLocalStorageValue(JSON.parse(value));
                }
            } catch (error) {
                setLocalStorageValue(initialValue);
            }
        }
    }, [key]);

    const saveToLocalStorage = (value: any) => {
        try {
            const valueToStore = value instanceof Function ? value(localStorageValue) : value;
            setLocalStorageValue(valueToStore);
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            setLocalStorageValue(initialValue);
        }
    };

    const removeFromLocalStorage = () => {
        try {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(key);
            }
            setLocalStorageValue(initialValue);
        } catch (error) {
            setLocalStorageValue(initialValue);
        }
    };

    return [localStorageValue, saveToLocalStorage, removeFromLocalStorage];
};

export default useLocalStorage;