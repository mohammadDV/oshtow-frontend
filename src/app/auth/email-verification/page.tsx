import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function EmailVerificationPage() {
    const t = await getTranslations("pages");

    return (
        <div className="px-6 py-7 md:p-8">
            <Link href={'/'} className="items-center gap-1.5 hidden md:flex">
                <Icon icon="solar--arrow-right-outline" sizeClass="size-5" className="text-caption" />
                <p className="text-sm font-normal text-caption">{t("auth.returnToHome")}</p>
            </Link>
            <div className="mt-8">
                <Icon icon="solar--mailbox-bold-duotone" sizeClass="size-28" className="text-sub mx-auto" />
                <h3 className="mt-7 text-title text-xl font-medium text-center mb-3">
                    {t("auth.checkEmail")}
                </h3>
                <p className="text-caption text-sm leading-6 font-normal text-center mb-4">
                    {t("auth.checkEmailDescription")}
                </p>
                <Button variant="link" className="mx-auto text-center block">
                    {t("auth.resendLink")}
                </Button>
            </div>
        </div>
    )
}