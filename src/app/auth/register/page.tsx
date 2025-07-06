import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import { RegisterForm } from "./_components/registerForm";
import Link from "next/link";

export default async function RegisterPage() {
    const t = await getTranslations("pages");

    return (
        <div className="px-6 py-7 md:p-8">
            <Link href={'/'} className="items-center gap-1.5 hidden md:flex">
                <Icon icon="solar--arrow-right-outline" sizeClass="size-5" className="text-caption" />
                <p className="text-sm font-normal text-caption">{t("auth.returnToHome")}</p>
            </Link>
            <RegisterForm />
            <div className="flex items-center justify-center gap-0.5 mt-5">
                <p className="text-sm font-normal text-caption">{t("auth.haveAccount")}</p>
                <Link href={'/auth/login'}
                    className="text-sm font-normal text-primary">
                    {t("auth.login")}
                </Link>
            </div>
        </div>
    )
}