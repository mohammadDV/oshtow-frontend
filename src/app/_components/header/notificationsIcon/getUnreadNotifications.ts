import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/baseService";
import { Notification } from "@/types/notifications.type";

export interface GetUnreadNotificationsService {
  status: StatusCode;
  message?: string;
  data?: Notification[];
}

export const getUnreadNotifications =
  async (): Promise<GetUnreadNotificationsService> => {
    try {
      return await getFetchAuth<GetUnreadNotificationsService>(
        apiUrls.notifications.unread
      );
    } catch (error) {
      return {
        status: StatusCode.Failed,
        message: "خطای ناشناخته",
      };
    }
  };
