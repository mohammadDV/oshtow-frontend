import Image from "next/image"
import defaultUserBanner from '@/assets/images/default-user-banner.jpg';
import { Icon } from "@/ui/icon";
import { usePagesTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

export const ProfileHeader = () => {
    const t = usePagesTranslation();

    return (
        <div className="bg-white rounded-3xl">
            <Image src={defaultUserBanner} alt="" width={1030} height={150} className="w-full rounded-t-3xl h-[80px] lg:h-36" />
            <div className="px-6 lg:px-12 flex flex-col items-center lg:flex-row lg:items-end gap-3 lg:gap-5 -mt-12">
                <div className="size-28 lg:size-32 rounded-full border-4 border-white bg-light flex items-center justify-center">
                    <Icon
                        icon="solar--user-rounded-bold-duotone"
                        sizeClass="size-20 lg:size-24"
                        className="text-primary" />
                </div>
                <div className="flex items-center justify-between flex-1 mb-1">
                    <div>
                        <h1 className="text-xl text-title font-semibold text-center lg:text-right mb-3 lg:mb-2.5">
                            سید بامداد لعلی
                        </h1>
                        <div className="flex flex-col lg:flex-row items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-0.5">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Icon key={index}
                                            icon="solar--star-bold"
                                            sizeClass="size-4"
                                            className="text-amber-400" />
                                    ))}
                                </div>
                                <span className="text-text font-normal text-xs">
                                    4.80
                                </span>
                            </div>
                            <div className="w-px hidden lg:block h-5 bg-hint"></div>
                            <p className="text-caption font-normal">
                                عضویت از تاریخ: ۱۲ اردیبهشت ۱۴۰۳
                            </p>
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