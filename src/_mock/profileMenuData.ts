import { MenuItem } from "@/app/profile/_components/menu/profileMenu";

export const userProfileMenu: MenuItem[] = [
    { label: "پیشخوان", icon: "solar--home-angle-2-outline", link: "/profile" },
    {
        label: "سفر ها",
        icon: "solar--earth-outline",
        children: [
            { label: "ثبت سفر جدید", icon: "solar--reply-2-outline", link: "/profile/projects/passenger/create" },
            { label: "مدیریت سفر ها", icon: "solar--reply-2-outline", link: "/profile/projects/passenger" },
        ],
    },
    {
        label: "مرسوله ها",
        icon: "solar--box-outline",
        children: [
            { label: "ثبت مرسوله جدید", icon: "solar--reply-2-outline", link: "/profile/projects/sender/create" },
            { label: "مدیریت مرسوله ها", icon: "solar--reply-2-outline", link: "/profile/projects/sender" },
        ],
    },
    { 
        label: "مدیریت درخواست ها",
        icon: "solar--pen-2-outline",
        children: [
            { label: "درخواست های دریافت شده", icon: "solar--reply-2-outline", link: "/profile/claims/received" },
            { label: "درخواست های ارسال شده", icon: "solar--reply-2-outline", link: "/profile/claims/sent" },
        ] 
    },
    { label: "کیف پول", icon: "solar--wallet-linear", link: "/profile/wallet" },
    { label: "پلن ها و تعرفه ها", icon: "solar--tag-price-outline", link: "/profile/plans" },
    { label: "اطلاعیه ها", icon: "solar--bell-outline", link: "/profile/notifications" },
    { label: "پیام های شخصی", icon: "solar--letter-outline", link: "/profile/messages" },
    { label: "پشتیبانی", icon: "solar--headphones-round-outline", link: "/profile/support" },
    {
        label: "تنظیمات",
        icon: "solar--settings-outline",
        children: [
            { label: "احراز هویت", icon: "solar--reply-2-outline", link: "/profile/settings/auth" },
            { label: "ویرایش حساب کاربری", icon: "solar--reply-2-outline", link: "/profile/settings/account" },
            { label: "تغییر رمز عبور", icon: "solar--reply-2-outline", link: "/profile/settings/change-password" },
        ],
    },
]