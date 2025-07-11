import { getTranslations } from "next-intl/server";
import { ChangePasswordForm } from "./_components/changePasswordForm";

export default async function ChangePasswordPage() {
    const t = await getTranslations("pages");

    return (
        <div className="bg-white rounded-3xl p-6 pb-12">
            <h1 className="text-title font-medium text-lg">
                {t("profile.changePassword.title")}
            </h1>
            <ChangePasswordForm />
        </div>
    )
}