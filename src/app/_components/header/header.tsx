'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from 'next-intl'

export const Header = () => {
    const pathname = usePathname();
    const t = useTranslations('common');

    const menuData = [
        {
            id: 1,
            title: t('navigation.firstPage'),
            link: '/'
        },
        {
            id: 2,
            title: t('navigation.senders'),
            link: '/projects/sender'
        },
        {
            id: 3,
            title: t('navigation.passengers'),
            link: '/projects/passenger'
        },
        {
            id: 4,
            title: t('navigation.faq'),
            link: '/faq'
        },
        {
            id: 5,
            title: t('navigation.about'),
            link: '/about'
        },
        {
            id: 6,
            title: t('navigation.contact'),
            link: '/contact'
        },
    ];

    return (
        <div className="bg-white w-full py-6 border-b border-border">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href={'/'} className="text-3xl font-bold text-primary">
                    {t('brand.name')}
                </Link>
                <ul className="flex items-center justify-center gap-8">
                    {menuData.map(item => (
                        <li key={item.id} className={cn("hover:text-primary transition-all", item.link === pathname ? "text-primary" : "text-title")}>
                            <Link href={item.link}>
                                {item.title}
                            </Link>
                        </li>)
                    )}
                </ul>
                <Button variant='default'>
                    <Icon icon="solar--user-outline" sizeClass="size-5" />
                    {t('buttons.loginRegister')}
                </Button>
            </div>
        </div>
    )
}