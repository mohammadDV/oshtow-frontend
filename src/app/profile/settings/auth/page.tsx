import { getTranslations } from "next-intl/server";
import { AuthForm } from "./_components/authForm";

export default async function AuthPage() {
    const t = await getTranslations("pages");

    return (
        <div className="bg-white rounded-3xl p-6 pb-12">
            <h1 className="text-title font-medium text-lg">
                {t("profile.auth.title")}
            </h1>
            <ol className="mt-2.5 list-decimal list-inside">
                <li className="text-sm text-caption font-normal">{t("profile.auth.firstRule")}</li>
                <li className="text-sm text-caption my-1 font-normal">{t("profile.auth.secondRule")}</li>
                <li className="text-sm text-caption font-normal">{t("profile.auth.thirdRule")}</li>
            </ol>
            <AuthForm />
        </div>
    )
}