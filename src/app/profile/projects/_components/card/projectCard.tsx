import { Badge } from "@/ui/badge"
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"

export const ProfileProjectCard = () => {
    return (
        <div className="w-full bg-white lg:rounded-3xl rounded-2xl p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                    <Icon icon="solar--earth-outline" sizeClass="size-8" className="text-caption" />
                    <h3 className="text-lg lg:text-xl font-medium text-title">
                        سفر هوایی از تهران به چین
                    </h3>
                    <Badge variant={"default"} className="lg:block hidden">
                        در حال انجام
                    </Badge>
                </div>
                <Icon icon="solar--menu-dots-outline" sizeClass="size-6" className="text-caption" />
            </div>
            <div className="flex items-center gap-5 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--map-point-wave-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        تهران به استانبول
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--calendar-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        8 اردیبهشت
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--weigher-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        1 کیلوگرم فضا
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--weigher-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        200,000 تومان  kg
                    </span>
                </div>
            </div>
            <hr className="border-t border-border mt-5 mb-4" />
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center justify-between w-full lg:w-fit">
                    <div className="text-sm text-text font-normal">
                        منتشر شده در تاریخ: 1404/04/23
                    </div>
                    <Badge variant={"default"} className="block lg:hidden">
                        در حال انجام
                    </Badge>
                </div>
                <Button variant={"ghost"} size={"sm"}>
                    مدیریت درخواست ها
                </Button>
            </div>
        </div>
    )
}