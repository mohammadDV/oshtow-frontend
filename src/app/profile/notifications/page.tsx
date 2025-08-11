import { getTranslations } from "next-intl/server"
import { getNotifications } from "./_api/getNotifications";
import Link from "next/link";
import { Icon } from "@/ui/icon";
import { createdDateConvertor } from "@/lib/dateUtils";
import { notificationLinkGenerator } from "@/lib/utils";
import { Pagination } from "@/app/_components/pagination";

interface NotificationsPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function NotificationsPage({ searchParams }: NotificationsPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");

    const notificationsData = await getNotifications({ page });

    return (
        <>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.notifications.title")}
            </h1>
            <div className="bg-white p-6 rounded-2xl lg:rounded-3xl mt-3.5 lg:mt-4">
                <div className="flex flex-col gap-3 divide-y divide-border">
                    {notificationsData?.data?.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row justify-between gap-2 lg:gap-6 lg:pb-0 pb-3">
                            <Link
                                href={notificationLinkGenerator(item.model_type, item.model_id)}
                                className="flex items-center gap-3 group lg:mb-3">
                                <Icon
                                    icon="solar--bell-bold-duotone"
                                    sizeClass="size-6"
                                    className="text-hint group-hover:text-sub transition-all shrink-0" />
                                <div className="flex flex-col gap-1">
                                    <h3 className=" text-title group-hover:text-primary transition-all">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-caption font-normal">
                                        {item.content}
                                    </p>
                                </div>
                            </Link>
                            <p className="text-caption text-sm font-normal self-end lg:self-auto">
                                {createdDateConvertor(item.created_at || "")}
                            </p>
                        </div>
                    ))}
                </div>

                {notificationsData?.data && notificationsData.total > 10 && (
                    <Pagination
                        currentPage={notificationsData.current_page}
                        lastPage={notificationsData.last_page}
                        links={notificationsData.links}
                        total={notificationsData.total}
                        routeUrl="/profile/notifications"
                    />
                )}
            </div>
        </>
    )
}