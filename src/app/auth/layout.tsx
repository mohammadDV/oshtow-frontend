import Link from "next/link";
import { AuthInfo } from "./_components/authInfo";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const t = await getTranslations("pages");

    return (
        <div className="bg-[url(/images/auth-background.jpg)] bg-contain bg-top md:bg-none flex min-h-svh flex-col md:items-center justify-between lg:justify-center md:p-10">
            <div className="md:hidden p-4">
                <Link href={'/'} className="flex items-center justify-center gap-1.5 bg-white/20 size-9 rounded-lg">
                    <Icon icon="solar--arrow-right-outline" sizeClass="size-6" className="text-white" />
                </Link>
                <p className="text-white font-semibold text-2xl mt-8 mb-1">
                    {t("auth.welcome")}
                </p>
            </div>
            <div className="w-full md:max-w-6xl flex-1 md:flex-initial bg-white rounded-t-3xl md:rounded-4xl overflow-hidden">
                <div className="bg-white overflow-hidden flex-1 h-full">
                    <div className="grid p-0 md:grid-cols-2 lg:min-h-[500px]">
                        {children}
                        <AuthInfo />
                    </div>
                </div>
            </div>
        </div>
    );
}