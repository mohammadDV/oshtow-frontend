"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useRouter } from "next/navigation";

export const ProfileNavigation = () => {
    const t = useCommonTranslation();
    const router = useRouter();

    const goToPrevPageHandler = () => router.back();

    return (
        <div className="sticky top-0 z-40">
            <div className="h-14 bg-primary w-full rounded-b-2xl z-10"></div>
            <div className="mx-4 p-4 rounded-xl bg-white -mt-8 z-30 relative ">
                <div className="flex items-center justify-between">
                    <div onClick={goToPrevPageHandler} className="flex items-center gap-2">
                        <Icon
                            icon="solar--arrow-right-outline"
                            sizeClass="size-6"
                            className="text-text" />
                        <p className="text-text">
                            {t("buttons.back")}
                        </p>
                    </div>
                    <div className="flex items-center gap-3.5">
                        <Link href={"/profile/notifications"}>
                            <Icon
                                icon="solar--bell-bold-duotone"
                                className="text-text"
                            />
                        </Link>
                        <Icon
                            icon="solar--headphones-round-bold-duotone"
                            className="text-text"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
