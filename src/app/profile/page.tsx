import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ProfileStatistics } from "./_components/statistics/profileStatistics";

export default async function ProfilePage() {
    const t = await getTranslations("pages");
    const userData = await getUserData();

    return (
        <div>
            {!userData.verify_access && (
                <div className="hidden lg:flex items-center px-4 py-3.5 rounded-2xl bg-border justify-between">
                    <div className="flex items-center gap-2">
                        <Icon icon="solar--notes-line-duotone" sizeClass="size-6" className="text-primary" />
                        <span className="text-title text-lg font-medium">
                            {t("profile.authTitle")}
                        </span>
                        <span className="text-text text-sm font-normal">
                            {t("profile.authDescription")}
                        </span>
                    </div>
                    <Link href={'/profile/settings/auth'}>
                        <Button variant={"outline"} size={"sm"} className="border-primary border text-primary">
                            {t("profile.completeAuth")}
                        </Button>
                    </Link>
                </div>
            )}
            <ProfileStatistics />
        </div>
    )
}