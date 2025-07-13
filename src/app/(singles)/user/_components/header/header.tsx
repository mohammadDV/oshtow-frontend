import { usePagesTranslation } from "@/hooks/useTranslation";
import { UserInfoResponse } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import Link from "next/link";

interface ProfileHeaderProps {
    data: UserInfoResponse
}

export const ProfileHeader = ({ data }: ProfileHeaderProps) => {
    const t = usePagesTranslation();

    return (
        <div className="bg-white rounded-3xl">
            <img src={data.user?.bg_photo_path as string}
                alt=""
                width={1030}
                height={150}
                className="w-full rounded-t-3xl h-[80px] lg:h-36 object-cover" />
            <div className="px-6 lg:px-12 flex flex-col items-center lg:flex-row lg:items-end gap-3 lg:gap-5 -mt-12">
                <img src={data?.user?.profile_photo_path as string}
                    alt=""
                    width={128}
                    height={128}
                    className="size-28 lg:size-32 rounded-full border-4 border-white" />
                <div className="flex items-center justify-between flex-1 mb-1">
                    <div>
                        <h1 className="text-xl text-title font-semibold text-center lg:text-right mb-3 lg:mb-2.5">
                            {data.user.nickname}
                        </h1>
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Icon key={index}
                                            icon={index < data.user.rate ? "solar--star-bold" : "solar--star-outline"}
                                            sizeClass="size-4"
                                            className="text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-text font-normal text-xs">
                                    {data.user.rate}
                                </span>
                            </div>
                            {/* <div className="w-px hidden lg:block h-5 bg-hint"></div>
                            <p className="text-caption font-normal">
                                عضویت از تاریخ: ۱۲ اردیبهشت ۱۴۰۳
                            </p> */}
                        </div>
                    </div>
                    <Icon
                        icon="solar--share-circle-bold-duotone"
                        sizeClass="hidden lg:block size-9"
                        className="text-text" />
                </div>
            </div>
            <div className="mt-8 lg:mt-10 px-6 lg:px-12 flex items-center justify-center lg:justify-start gap-8 pb-5">
                <Link
                    href={'#reviews'}
                    className="text-primary font-medium relative cursor-pointer">
                    {t("user.lastReviews")}
                    <div className="absolute -bottom-5 h-0.5 bg-primary left-5 right-5">
                    </div>
                </Link>
                <Link
                    href={'#activities'}
                    className="font-normal text-caption relative cursor-pointer">
                    {t("user.lastActivities")}
                </Link>
            </div>
        </div>
    )
}