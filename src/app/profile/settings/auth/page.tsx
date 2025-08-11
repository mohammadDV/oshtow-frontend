import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import { getIdentifyInfo } from "./_api/getIdentifyInfo";
import { AuthForm } from "./_components/authForm";

export default async function AuthPage() {
    const t = await getTranslations("pages");
    const userData = await getUserData();

    let identifyInfo = await getIdentifyInfo({ id: userData.user.id });

    return (
        <div className="bg-white rounded-3xl p-6 pb-12">
            <h1 className="text-title font-medium text-lg">
                {t("profile.auth.title")}
            </h1>
            <ol className="mt-2.5 list-decimal list-inside">
                <li className="text-sm text-caption font-normal">{t("profile.auth.firstRule")}</li>
                <li className="text-sm text-caption my-1 font-normal">{t("profile.auth.secondRule")}</li>
                <li className="text-sm text-caption font-normal">{t("profile.auth.thirdRule")}</li>
                <li className="text-sm text-caption mt-1 font-normal">{t("profile.auth.forthRule")}</li>
            </ol>
            <div className="relative">
                <AuthForm identifyInfo={identifyInfo} />
                {userData.verify_access && (
                    <div className="absolute -left-2 -top-2 -right-2 -bottom-4 backdrop-blur-xs z-20 flex flex-col gap-4 items-center pt-6 md:pt-0 md:justify-center">
                        <Icon icon="solar--check-circle-outline" sizeClass="size-16" className="text-teal-400" />
                        <p className="text-title text-xl md:text-2xl font-medium">
                            {t("profile.auth.authCompleted")}
                        </p>
                    </div>
                )}
                {userData.status_approval === "paid" && (
                    <div className="absolute -left-2 -top-2 -right-2 -bottom-4 backdrop-blur-xs z-20 flex flex-col gap-4 items-center pt-6 md:pt-0 md:justify-center">
                        <Icon icon="solar--magnifer-outline" sizeClass="size-16" className="text-orange-400" />
                        <p className="text-title text-xl md:text-2xl font-medium">
                            {t("profile.auth.authPending")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}