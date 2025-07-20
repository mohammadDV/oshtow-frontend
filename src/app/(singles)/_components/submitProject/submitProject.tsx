"use client"

import { useGetUser } from "@/hooks/useGetUser";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { isEmpty } from "@/lib/utils";
import { SingleProjectResponse } from "@/types/project.type";
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { useState } from "react";
import { RequestModal } from "./requestModal";

interface SubmitProjectCardProps {
    isMobile: boolean;
    projectData: SingleProjectResponse;
    title: string;
    submitLabel: string;
    chatLabel: string
    infoText: string,
    showRequestButton: boolean;
    showChatButton: boolean;
}

export const SubmitProjectCard = ({
    isMobile,
    projectData,
    title,
    submitLabel,
    chatLabel,
    infoText,
    showRequestButton,
    showChatButton
}: SubmitProjectCardProps) => {
    const { userData, isLoading } = useGetUser();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

    const openModalHandler = () => setIsOpenModal(!isOpenModal)

    if (isMobile) {
        return (<div className="fixed bottom-0 left-0 right-0 bg-white z-50 py-4 border-t border-border px-5">
            {!isEmpty(userData)
                ? <div className="flex items-center justify-between gap-3.5">
                    {showRequestButton ? <Button
                        variant={"default"}
                        size={"default"}
                        className="flex-1"
                        onClick={openModalHandler}>
                        {submitLabel}
                        <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
                    </Button>
                        : <div className="flex items-center gap-2">
                            <Icon icon="solar--check-circle-outline" sizeClass="size-5" className="text-success" />
                            <p className="text-success text-sm">
                                {tCommon("messages.hasSubmitRequest")}
                            </p>
                        </div>}
                    {showChatButton && <Button variant={"ghost"} size={"default"} className="flex-1">
                        {chatLabel}
                        <Icon icon="solar--chat-round-dots-outline" sizeClass="size-5" />
                    </Button>}
                </div>
                : <Link href={"/auth/login"}>
                    <Button variant={"default"} size={"default"} className="w-full" isLoading={isLoading}>
                        {tPages("sender.for")} {submitLabel} {tCommon("buttons.signIn")}
                        <Icon icon="solar--login-2-outline" sizeClass="size-5" />
                    </Button>
                </Link>}
            <RequestModal
                title={submitLabel}
                isOpenModal={isOpenModal}
                setIsOpenModal={setIsOpenModal}
                projectData={projectData} />
        </div>)
    } else {
        return (
            <div className="lg:w-1/3 rounded-3xl p-6 bg-white sticky top-4">
                <p className="text-title font-normal text-lg mb-4">
                    {title}
                </p>
                {!isEmpty(userData)
                    ? <>
                        {showRequestButton ? <Button
                            onClick={openModalHandler}
                            variant={"default"}
                            size={"default"}
                            className="mb-3 w-full py-3">
                            {submitLabel}
                            <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
                        </Button>
                            : <div className="flex items-center gap-2 mb-5">
                                <Icon icon="solar--check-circle-outline" sizeClass="size-6" className="text-success" />
                                <p className="text-success">
                                    {tCommon("messages.hasSubmitRequest")}
                                </p>
                            </div>}
                        {showChatButton && <Button variant={"ghost"} size={"default"} className="w-full py-3 mb-2">
                            {chatLabel}
                            <Icon
                                icon="solar--chat-round-dots-outline"
                                sizeClass="size-5"
                            />
                        </Button>}
                    </>
                    : <Link href={"/auth/login"}>
                        <Button variant={"default"} size={"default"} className="mb-3 w-full py-3" isLoading={isLoading}>
                            {tPages("sender.for")} {submitLabel} {tCommon("buttons.signIn")}
                            <Icon icon="solar--login-2-outline" sizeClass="size-5" />
                        </Button>
                    </Link>}
                {isEmpty(userData) && <div className="flex gap-2 mt-2">
                    <Icon
                        icon="solar--info-circle-outline"
                        sizeClass="size-5"
                        className="text-caption"
                    />
                    <p className="text-caption font-light text-sm">
                        {infoText}
                    </p>
                </div>}
                <hr className="border-t border-border my-4 lg:my-4" />
                <Link href={`/user/${projectData.project.user.id}`} className="flex items-center gap-1.5">
                    <img
                        src={projectData?.project?.user?.profile_photo_path!}
                        alt=""
                        width={42}
                        height={42}
                        className="rounded-full object-cover" />
                    <div className="text-sm font-normal text-text">
                        <span className="text-primary">
                            {projectData.project.user.nickname}
                        </span>
                        <span className="ms-1">
                            {tPages("sender.hasSubmitAd")}
                        </span>
                    </div>
                </Link>
                <RequestModal
                    title={submitLabel}
                    isOpenModal={isOpenModal}
                    setIsOpenModal={setIsOpenModal}
                    projectData={projectData} />
            </div>
        )
    }
}