import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { verifyResetPassword } from "./_api/verifyResetPassword";
import { StatusCode } from "@/constants/enums";
import { notFound } from "next/navigation";
import { ResetPasswordForm } from "./_components/resetPasswordForm";

interface ResetPasswordPageProps {
    searchParams: Promise<{
        token: string;
        email: string;
    }>
}

export default async function ResetPasswordPage({ searchParams }: ResetPasswordPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;

    const verifyData = await verifyResetPassword({
        token: resolvedSearchParams.token,
        email: resolvedSearchParams.email
    })

    if (verifyData.status === StatusCode.Failed) {
        notFound();
    }

    return (
        <div className="px-6 py-7 md:p-8">
            <Link href={'/'} className="items-center gap-1.5 hidden md:flex">
                <Icon icon="solar--arrow-right-outline" sizeClass="size-5" className="text-caption" />
                <p className="text-sm font-normal text-caption">{t("auth.returnToHome")}</p>
            </Link>
            <ResetPasswordForm 
                email={resolvedSearchParams.email} 
                token={resolvedSearchParams.token} 
            />
        </div>
    )
}