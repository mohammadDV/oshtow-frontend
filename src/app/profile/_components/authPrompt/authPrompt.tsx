"use client";

import { checkVerificationAction } from "@/app/auth/check-verification/_api/verificationAction";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { Loading } from "@/ui/loading";
import Link from "next/link";
import { useEffect, useState } from "react";

interface AuthPromptProps {
    variant: "mobile" | "desktop";
}

export default function AuthPrompt({ variant }: AuthPromptProps) {
    const t = usePagesTranslation();
    const [shouldShow, setShouldShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                setShouldShow(res?.status_approval !== "completed");
            } catch (error) {
                setShouldShow(true);
            } finally {
                setIsLoading(false);
            }
        };

        checkVerification();
    }, []);

    if (!shouldShow && !isLoading) {
        return null;
    }

    if (variant === "mobile") {
        return (
            <div className="flex lg:hidden items-center px-4 py-3.5 rounded-2xl bg-border justify-between mt-5 mx-4">
                {isLoading ? (
                    <>
                        <div className="flex items-center gap-2 py-2">
                            <Icon icon="solar--notes-line-duotone" sizeClass="size-6" className="text-primary" />
                            <span className="text-title text-lg font-medium">
                                {t("profile.checkingAuth")}
                            </span>
                        </div>
                        <Loading type="spinner" variant="primary" />
                    </>
                ) : (
                    <>
                        <div className="flex items-center gap-2">
                            <Icon icon="solar--notes-line-duotone" sizeClass="size-6" className="text-primary" />
                            <span className="text-title text-lg font-medium">
                                {t("profile.authTitle")}
                            </span>
                        </div>
                        <Link href={"/profile/settings/auth"}>
                            <Button variant={"outline"} size={"sm"} className="border-primary border text-primary">
                                {t("profile.completeAuth")}
                            </Button>
                        </Link>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="hidden lg:flex mb-5 items-center px-4 py-3.5 rounded-2xl bg-border justify-between">
            {isLoading ? (
                <>
                    <div className="flex items-center gap-2 py-1.5">
                        <Icon icon="solar--notes-line-duotone" sizeClass="size-6" className="text-primary" />
                        <span className="text-title text-lg font-medium">
                            {t("profile.checkingAuth")}
                        </span>
                    </div>
                    <Loading type="spinner" variant="primary" />
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="solar--notes-line-duotone"
                            sizeClass="size-6"
                            className="text-primary"
                        />
                        <span className="text-title text-lg font-medium">
                            {t("profile.authTitle")}
                        </span>
                        <span className="text-text text-sm font-normal">
                            {t("profile.authDescription")}
                        </span>
                    </div>
                    <Link href={"/profile/settings/auth"}>
                        <Button
                            variant={"outline"}
                            size={"sm"}
                            className="border-primary border text-primary"
                        >
                            {t("profile.completeAuth")}
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
}