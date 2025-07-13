"use client"

import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { Icon } from "@/ui/icon"
import { useState } from "react";
import { logoutAction } from "./logoutAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
    const router = useRouter();
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const logoutHandler = async () => {
        setIsLoading(true);
        try {
            const res = await logoutAction();
            if (res?.status === StatusCode.Success) {
                router.replace("/");
            } else {
                toast.error(res?.message || tCommon("messages.error"));
            }
        } catch (error) {
            toast.error(tCommon("messages.error"));
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div
                onClick={() => setIsOpenModal(true)}
                className="flex items-center gap-2 py-2.5 text-destructive cursor-pointer">
                <Icon icon={"solar--logout-2-outline"} sizeClass="size-6" />
                <span>{tPage("profile.logout")}</span>
            </div>
            <Modal
                open={isOpenModal}
                size="sm"
                onOpenChange={setIsOpenModal}
                title={tPage("profile.logoutAccount")}
                description={tPage("profile.logoutConfirm")}
                confirmText={tCommon("buttons.yes")}
                cancelText={tCommon("buttons.cancel")}
                confirmVariant="destructive"
                onCancel={() => setIsOpenModal(false)}
                loading={isLoading}
                onConfirm={logoutHandler}
            />
        </>
    )
}