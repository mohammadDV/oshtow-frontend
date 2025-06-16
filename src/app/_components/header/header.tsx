'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuData = [
    {
        id: 1,
        title: 'صفحه اصلی',
        link: '/'
    },
    {
        id: 2,
        title: 'مرسوله ها',
        link: '/consignments'
    },
    {
        id: 3,
        title: 'سفر ها',
        link: '/trips'
    },
    {
        id: 4,
        title: 'سوالات متداول',
        link: '/faq'
    },
    {
        id: 5,
        title: 'درباره ما',
        link: '/about'
    },
    {
        id: 6,
        title: 'تماس با ما',
        link: '/contact'
    },
]

export const Header = () => {
    const pathname = usePathname();

    return (
        <div className="bg-white w-full py-6 border-b border-border">
            <div className="container mx-auto flex items-center justify-between px-4">
                <Link href={'/'} className="text-3xl font-bold text-primary">
                    اوشتو (لوگو)
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
                    ورود / ثبت نام
                </Button>
            </div>
        </div>
    )
}