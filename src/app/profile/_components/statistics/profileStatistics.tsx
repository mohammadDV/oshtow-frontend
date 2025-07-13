import { usePagesTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { Progress } from "@/ui/progress";

export const ProfileStatistics = () => {
    const t = usePagesTranslation();

    const myStatsData = [
        {
            id: 1,
            title: t("profile.mySenders"),
            icon: "solar--box-outline",
            counts: "۱۸ مرسوله",
            bgColor: "bg-fuchsia-50",
            color: "text-fuchsia-400"
        },
        {
            id: 2,
            title: t("profile.myPassengers"),
            icon: "solar--earth-outline",
            counts: "۱۸ سفر",
            bgColor: "bg-sky-50",
            color: "text-sky-400"
        },
        {
            id: 3,
            title: t("profile.myRequests"),
            icon: "solar--pen-2-outline",
            counts: "۱۸ درخواست",
            bgColor: "bg-pink-50",
            color: "text-pink-400"
        },
        {
            id: 4,
            title: t("profile.mySuggests"),
            icon: "solar--pen-2-outline",
            counts: "۱۸ پیشنهاد",
            bgColor: "bg-rose-50",
            color: "text-rose-400"
        },
        {
            id: 5,
            title: t("profile.myMessages"),
            icon: "solar--letter-outline",
            counts: "۱۸ پیام",
            bgColor: "bg-teal-50",
            color: "text-teal-400"
        },
        {
            id: 6,
            title: t("profile.mySupports"),
            icon: "solar--headphones-round-outline",
            counts: "۱۸ درخواست",
            bgColor: "bg-orange-50",
            color: "text-orange-400"
        },
    ]

    return (
        <>
            <div className="mb-4 lg:mb-8 flex overflow-auto lg:grid lg:grid-cols-3 gap-5 mt-4 md:mt-0">
                {myStatsData.map(stat => (
                    <div key={stat.id} className="bg-white p-2.5 lg:pl-3 lg:p-3 pl-6 rounded-2xl lg:rounded-[20px] flex items-center flex-1 min-w-max gap-4">
                        <div className={cn("size-16 lg:size-[70px] rounded-xl lg:rounded-2xl flex items-center justify-center", stat.bgColor)}>
                            <Icon icon={stat.icon} sizeClass="size-9 lg:size-10" className={stat.color} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-sm font-normal text-text">
                                {stat.title}
                            </p>
                            <p className="text-title font-medium">
                                {stat.counts}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-white lg:px-5 lg:py-4.5 p-4 rounded-2xl lg:rounded-3xl flex flex-col gap-4 lg:flex-row items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <Icon icon="solar--tag-price-outline" sizeClass="size-6" className="text-caption lg:block hidden" />
                    <p className="text-title text-lg font-medium">
                        {t("profile.activePlan")}
                    </p>
                    <div className="w-px h-4 bg-border"></div>
                    <p className="text-sm font-normal text-text">
                        پلن الماس
                    </p>
                    <div className="w-px h-4 bg-border"></div>
                    <p className="text-sm font-normal text-text">
                        ۱۸ روز باقی مانده
                    </p>
                </div>
                <div className="flex items-center justify-end gap-3 lg:gap-5">
                    <div className="p-3 lg:p-3.5 rounded-2xl border border-border">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <p className="text-text font-normal text-sm">
                                {t("profile.requestsCount")}
                            </p>
                            <p className="text-text font-normal text-sm">
                                ۵۰/۱۰
                            </p>
                        </div>
                        <Progress value={20} className="w-full lg:w-40" />
                    </div>
                    <div className="p-3 lg:p-3.5 rounded-2xl border border-border">
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <p className="text-text font-normal text-sm">
                                {t("profile.adsCount")}
                            </p>
                            <p className="text-text font-normal text-sm">
                                ۵۰/۱۰
                            </p>
                        </div>
                        <Progress value={20} className="w-full lg:w-40" />
                    </div>
                </div>
            </div>
        </>
    )
}