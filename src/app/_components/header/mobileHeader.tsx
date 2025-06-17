import { Icon } from "@/ui/icon"
import { useTranslations } from "next-intl";
import Link from "next/link"

export const MobileHeader = () => {
    const t = useTranslations('common');

    return (
        <>
            <div className="h-14 bg-primary w-full rounded-b-2xl z-10">
            </div>
            <div className="mx-4 p-4 rounded-xl bg-white -mt-8 z-30 relative">
                <div className="flex items-center justify-between">
                    <Link href={'/'} className="text-xl font-bold text-primary">
                        {t('brand.name')}
                    </Link>
                    <div className="flex items-center justify-end gap-4">
                        <Icon icon="solar--headphones-round-bold-duotone" className="text-text" />
                        <Icon icon="solar--user-circle-bold" className="text-text" />
                    </div>
                </div>
            </div>
        </>
    )
}