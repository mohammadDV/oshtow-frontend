'use client'

import { useCommonTranslation } from "@/hooks/useTranslation"
import { cn, isEmpty, notificationLinkGenerator } from "@/lib/utils"
import { UserData } from "@/types/user.type"
import { Icon } from "@/ui/icon"
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getUnreadNotifications } from "./getUnreadNotifications"
import { StatusCode } from "@/constants/enums"
import { createdDateConvertor } from "@/lib/dateUtils"
import { Notification } from "@/types/notifications.type"

interface NotificationIconProps {
    userData?: UserData | null;
}

export const NotificationIcon = ({ userData }: NotificationIconProps) => {
    const t = useCommonTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [notificationsData, setNotificationsData] = useState<Notification[]>();
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    useEffect(() => {
        const unreadNotificationsService = async () => {
            setIsLoading(true);
            try {
                const res = await getUnreadNotifications();
                if (res.status != StatusCode.Failed) {
                    setNotificationsData(res as any)
                }
            } catch (error) {
                setNotificationsData(undefined);
            } finally {
                setIsLoading(false);
            }
        };

        (!!userData && !isEmpty(userData)) && unreadNotificationsService();
    }, [userData]);

    // Don't render if user is not authenticated
    if (!userData || isEmpty(userData)) {
        return null;
    }

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <div className="relative cursor-pointer">
                    <Icon
                        icon="solar--bell-outline"
                        sizeClass="size-6"
                        className="text-text hover:text-primary transition-all" />
                    {notificationsData && notificationsData.length > 0 && (
                        <div className="absolute -top-1 -right-1 size-3 bg-destructive rounded-full"></div>
                    )}
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                        <h3 className="text-title font-medium">
                            {t('navigation.notifications')}
                        </h3>
                        <Link
                            href="/profile/notifications"
                            className="text-primary text-sm hover:underline"
                            onClick={() => setIsPopoverOpen(false)}
                        >
                            {t('buttons.seeAll')}
                        </Link>
                    </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                    {isLoading ? (
                        <div className="p-4 text-center">
                            <Icon icon="solar--loading-outline" sizeClass="size-6" className="text-hint animate-spin mx-auto" />
                        </div>
                    ) : notificationsData && notificationsData.length > 0 ? (
                        <div className="divide-y divide-border">
                            {notificationsData?.map(item => (
                                <Link
                                    key={item.id}
                                    href={notificationLinkGenerator(item.model_type, item.model_id)}
                                    className="flex items-start gap-3 p-4 hover:bg-light/50 transition-all group"
                                    onClick={() => setIsPopoverOpen(false)}
                                >
                                    <Icon
                                        icon="solar--bell-bold-duotone"
                                        sizeClass="size-5"
                                        className="text-hint group-hover:text-sub transition-all shrink-0 mt-0.5" />
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-title group-hover:text-primary transition-all text-sm font-medium line-clamp-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-caption text-xs font-normal line-clamp-2 mt-1">
                                            {item.content}
                                        </p>
                                        <p className="text-caption text-xs font-normal mt-2">
                                            {createdDateConvertor(item.created_at || "")}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center">
                            <Icon icon="solar--bell-outline" sizeClass="size-12" className="text-hint mx-auto mb-3" />
                            <p className="text-caption text-sm">
                                {t('messages.noNotifications')}
                            </p>
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    );
};