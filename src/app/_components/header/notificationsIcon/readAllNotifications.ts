import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/baseService";

export interface ReadAllNotificationsService {
    status: StatusCode;
    message?: string;
}

export const readAllNotifications =
    async (): Promise<ReadAllNotificationsService> => {
        try {
            return await getFetchAuth<ReadAllNotificationsService>(
                apiUrls.notifications.readAll
            );
        } catch (error) {
            return {
                status: StatusCode.Failed,
                message: "خطای ناشناخته",
            };
        }
    };
