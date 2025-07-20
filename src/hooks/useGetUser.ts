'use client'

import { getUserDataAction } from "@/lib/getUserData";
import { useEffect, useState } from "react";

export function useGetUser<T>() {
    const [userData, setUserData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkVerification = async () => {
            const res = await getUserDataAction();
            setUserData(res as T);
        };

        checkVerification();
        setIsLoading(false);
    }, []);

    return { userData, isLoading };
}