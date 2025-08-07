"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "../_api/logoutAction";
import { Loading } from "@/ui/loading";
import { useCommonTranslation } from "@/hooks/useTranslation";

export const LogoutHandler = () => {
    const router = useRouter();
    const t = useCommonTranslation();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logoutAction();
            } catch (error) {
                console.error('Logout failed:', error);
            } finally {
                router.push('/auth/login');
            }
        };

        handleLogout();
    }, [router]);

    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <Loading type="ring" size={"lg"} className="mx-auto mb-3" />
                <p className="text-caption">{t("messages.loggingOut")}</p>
            </div>
        </div>
    );
};