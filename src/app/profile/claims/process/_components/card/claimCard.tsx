"use client"

import { ShowMore } from "@/app/_components/showMore";
import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { createFileUrl, putCommas } from "@/lib/utils";
import { FullClaim } from "@/types/claim.type"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { approveClaimAction, ApproveClaimResponse } from "../../_api/approveClaimAction";
import { StatusCode } from "@/constants/enums";
import { useRouter } from "next/navigation";

interface ClaimCardProps {
    data: FullClaim;
}

export const ClaimCard = ({ data }: ClaimCardProps) => {
    const router = useRouter();
    const t = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleSelectUser = async () => {
        setIsLoading(true);
        try {
            const result: ApproveClaimResponse = await approveClaimAction(data.id);
            if (result.status === StatusCode.Success) {
                setIsOpenModal(false);
                router.replace(`/profile/claims/process?claimId=${result.data?.id}`)
                toast.success(result.message);
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error(t("messages.error"));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-5 rounded-2xl lg:rounded-3xl bg-white">
            <div className="flex justify-between gap-3">
                <Avatar className="size-12 lg:block hidden">
                    <AvatarImage
                        src={data.user.profile_photo_path
                            ? createFileUrl(data.user.profile_photo_path)
                            : undefined}
                        alt={data.user.nickname}
                    />
                    <AvatarFallback>{data.user.nickname}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <Avatar className="size-12 block lg:hidden">
                                <AvatarImage
                                    src={data.user.profile_photo_path
                                        ? createFileUrl(data.user.profile_photo_path)
                                        : undefined}
                                    alt={data.user.nickname}
                                />
                                <AvatarFallback>{data.user.nickname}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-primary font-normal">
                                    {data.user.nickname}
                                </p>
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Icon key={index}
                                            icon={index < data.user.rate ? "solar--star-bold" : "solar--star-outline"}
                                            sizeClass="size-4"
                                            className="text-amber-400" />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Link
                            href={`/user/${data.user.id}`}
                            className="flex items-center gap-1 text-primary text-sm"
                        >
                            {t("buttons.seeProfile")}
                            <Icon
                                icon="solar--alt-arrow-left-outline"
                                sizeClass="size-4"
                            />
                        </Link>
                    </div>
                    {data.description && <ShowMore
                        className="mt-4 lg:mt-5 mb-3 lg:mb-4"
                        maxHeight={45}
                        buttonVariant="link">
                        <p className="text-text text-sm font-normal text-justify">
                            {data.description}
                        </p>
                    </ShowMore>}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-6 mt-3 lg:mt-4">
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <div className="flex items-center gap-1.5">
                                <Icon
                                    icon="solar--weigher-bold-duotone"
                                    sizeClass="size-5"
                                    className="text-sub"
                                />
                                <p className="text-xs font-normal text-text">{data.weight} {t("unit.kg")}</p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Icon
                                    icon="solar--tag-price-bold-duotone"
                                    sizeClass="size-5"
                                    className="text-sub"
                                />
                                <p className="text-xs font-normal text-text">
                                    {putCommas(parseFloat(data.amount))} {' '} {t("unit.toman")}
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Icon
                                    icon="solar--map-point-wave-bold-duotone"
                                    sizeClass="size-5"
                                    className="text-sub"
                                />
                                <p className="text-xs font-normal text-text">
                                    {t(`address.${data.address_type}`)}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 w-full lg:w-auto">
                            <Button variant={"outline"} size={"sm"} className="py-2 flex-1 lg:flex-initial">
                                {t("buttons.chatWithUser")}
                            </Button>
                            <Button
                                variant={"ghost"}
                                size={"sm"}
                                className="flex-1 lg:flex-initial"
                                onClick={() => setIsOpenModal(true)}
                            >
                                {t("buttons.selectUser")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                open={isOpenModal}
                size="sm"
                onOpenChange={setIsOpenModal}
                title={`${tPages("profile.claims.selectUserConfirmTitle")} ${data.user.nickname}`}
                description={tPages("profile.claims.selectUserConfirmDescription")}
                confirmText={t("buttons.yes")}
                cancelText={t("buttons.cancel")}
                confirmVariant="default"
                onCancel={() => setIsOpenModal(false)}
                loading={isLoading}
                onConfirm={handleSelectUser}
            />
        </div>
    )
};