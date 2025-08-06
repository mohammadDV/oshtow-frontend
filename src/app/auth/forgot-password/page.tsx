import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ForgotPasswordForm } from "./_components/forgotPasswordForm";

export default async function LoginPage() {
    const t = await getTranslations("pages");

    return (
        <div className="px-6 py-7 md:p-8">
            <Link href={'/'} className="items-center gap-1.5 hidden md:flex">
                <Icon icon="solar--arrow-right-outline" sizeClass="size-5" className="text-caption" />
                <p className="text-sm font-normal text-caption">{t("auth.returnToHome")}</p>
            </Link>
            <ForgotPasswordForm />
            <div className="flex items-center justify-center gap-0.5 mt-5">
                <p className="text-sm font-normal text-caption">{t("auth.haveNotAccount")}</p>
                <Link href={'/auth/register'}
                    className="text-sm font-normal text-primary">
                    {t("auth.register")}
                </Link>
            </div>
        </div>
    )
}