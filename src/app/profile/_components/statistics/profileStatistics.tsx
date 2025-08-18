import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { Progress } from "@/ui/progress";
import { DashboardInfoService } from "../../_api/getDashboadInfo";
import { SubscriptionActivityCountService } from "../../_api/getSubscriptionActivityCount";
import { SubscriptionType } from "@/constants/enums";
import Link from "next/link";
import { Button } from "@/ui/button";

interface ProfileStatisticsProps {
    dashboardInfo: DashboardInfoService;
    subscriptionActivityCount: SubscriptionActivityCountService
}

export const ProfileStatistics = ({ dashboardInfo, subscriptionActivityCount }: ProfileStatisticsProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const myStatsData = [
        {
            id: 1,
            title: tPages("profile.mySenders"),
            icon: "solar--box-outline",
            counts: `${dashboardInfo.senders} مرسوله`,
            bgColor: "bg-fuchsia-50",
            color: "text-fuchsia-400"
        },
        {
            id: 2,
            title: tPages("profile.myPassengers"),
            icon: "solar--earth-outline",
            counts: `${dashboardInfo.passengers} سفر`,
            bgColor: "bg-sky-50",
            color: "text-sky-400"
        },
        {
            id: 3,
            title: tPages("profile.myRequests"),
            icon: "solar--pen-2-outline",
            counts: `${dashboardInfo.receive_claims} درخواست`,
            bgColor: "bg-pink-50",
            color: "text-pink-400"
        },
        {
            id: 4,
            title: tPages("profile.mySuggests"),
            icon: "solar--pen-2-outline",
            counts: `${dashboardInfo.claims} پیشنهاد`,
            bgColor: "bg-rose-50",
            color: "text-rose-400"
        },
        {
            id: 5,
            title: tPages("profile.myMessages"),
            icon: "solar--letter-outline",
            counts: `${dashboardInfo.messages} پیام`,
            bgColor: "bg-teal-50",
            color: "text-teal-400"
        },
        {
            id: 6,
            title: tPages("profile.mySupports"),
            icon: "solar--headphones-round-outline",
            counts: `${dashboardInfo.tickets} تیکت`,
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
            {subscriptionActivityCount.original.subscription.has_active_subscription === SubscriptionType.Active
                ? (
                    <div className="bg-white lg:px-5 lg:py-4.5 p-4 rounded-2xl lg:rounded-3xl flex flex-col gap-4 lg:flex-row items-center justify-between">
                        <div className="flex flex-col lg:flex-row items-center gap-2.5">
                            <Icon icon="solar--tag-price-outline" sizeClass="size-6" className="text-caption lg:block hidden" />
                            <p className="text-title text-lg font-medium">
                                {tPages("profile.activePlan")}
                            </p>
                            {/* <div className="w-px h-4 bg-border"></div>
                            <p className="text-sm font-normal text-text">
                                پلن الماس
                            </p> */}
                            <div className="w-px h-4 bg-border hidden lg:block"></div>
                            <p className="text-sm font-normal text-text">
                                {subscriptionActivityCount.original.subscription.message}
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-3 lg:gap-5">
                            <div className="p-3 lg:p-3.5 rounded-2xl border border-border">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <p className="text-text font-normal text-sm">
                                        {tPages("profile.requestsCount")}
                                    </p>
                                    <p className="text-text font-normal text-sm">
                                        {subscriptionActivityCount.original.claim_count}/{subscriptionActivityCount.original.claims === 0 ? '∞' : subscriptionActivityCount.original.claims}
                                    </p>
                                </div>
                                <Progress
                                    value={subscriptionActivityCount.original.claims == 0 ? 0 : (subscriptionActivityCount.original.claim_count / subscriptionActivityCount.original.claims) * 100}
                                    className="w-full lg:w-40"
                                />
                            </div>
                            <div className="p-3 lg:p-3.5 rounded-2xl border border-border">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <p className="text-text font-normal text-sm">
                                        {tPages("profile.adsCount")}
                                    </p>
                                    <p className="text-text font-normal text-sm">
                                        {subscriptionActivityCount.original.project_count}/{subscriptionActivityCount.original.projects === 0 ? '∞' : subscriptionActivityCount.original.projects}
                                    </p>
                                </div>
                                <Progress
                                    value={subscriptionActivityCount.original.projects == 0 ? 0 : (subscriptionActivityCount.original.project_count / subscriptionActivityCount.original.projects) * 100}
                                    className="w-full lg:w-40"
                                />
                            </div>
                        </div>
                    </div>
                )
                : (
                    <div className="bg-white lg:px-5 lg:py-4.5 p-4 rounded-2xl lg:rounded-3xl flex flex-col gap-4 lg:flex-row lg:items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <Icon icon="solar--tag-price-outline" sizeClass="size-6" className="text-caption lg:block hidden" />
                            <p className="text-title text-lg font-medium">
                                {tPages("profile.activePlan")}
                            </p>
                            <div className="w-px h-4 bg-border"></div>
                            <p className="text-sm font-normal text-text">
                                {subscriptionActivityCount.original.subscription.message}
                            </p>
                        </div>
                        <Link href={"/profile/plans"}>
                            <Button variant={"outline"} size={"sm"} className="w-full">
                                {tCommon("buttons.buyPlan")}
                            </Button>
                        </Link>
                    </div>
                )}

        </>
    )
}