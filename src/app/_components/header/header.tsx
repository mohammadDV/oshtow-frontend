'use client'

import { useCommonTranslation } from "@/hooks/useTranslation"
import { cn, isEmpty } from "@/lib/utils"
import { UserData } from "@/types/user.type"
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NotificationIcon } from "./notificationsIcon/notificationIcon"

interface HeaderProps {
    userData?: UserData | null;
}

export const Header = ({ userData }: HeaderProps) => {
    const pathname = usePathname();
    const t = useCommonTranslation();

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
            title: t('navigation.blog'),
            link: '/blog'
        },
        {
            id: 6,
            title: t('navigation.about'),
            link: '/about'
        }
    ];

    return (
        <div className="bg-white w-full py-5 border-b border-border">
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
                {(!!userData && !isEmpty(userData))
                    ? <div className="flex items-center justify-end gap-6">
                        <NotificationIcon userData={userData} />
                        <Link href={'/profile'}>
                            <Button variant='outline'>
                                <Icon icon="solar--user-outline" sizeClass="size-5" />
                                {t('buttons.myAccount')}
                            </Button>
                        </Link>
                    </div>
                    : <div className="flex items-center justify-end gap-2">
                        <Link href={'/auth/login'}>
                            <Button variant='link'>
                                <Icon icon="solar--login-2-outline" sizeClass="size-5" />
                                {t('buttons.login')}
                            </Button>
                        </Link>
                        <Link href={'/auth/register'}>
                            <Button variant='default'>
                                <Icon icon="solar--user-outline" sizeClass="size-5" />
                                {t('buttons.register')}
                            </Button>
                        </Link>
                    </div>}
            </div>
        </div>
    )
}