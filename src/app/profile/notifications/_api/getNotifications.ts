import { getFetchAuth } from "@/core/baseService";
import { apiUrls } from "@/constants/apiUrls";
import { WithdrawRequestsResponse, WithdrawStatus } from "@/types/wallet.type";
import { NotificationsResponse } from "@/types/notifications.type";

interface GetNotificationsParams {
  page?: number;
  count?: number;
}

export const getNotifications = async ({
  page = 1,
  count = 10,
}: GetNotificationsParams): Promise<NotificationsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    count: count.toString(),
  });

  return getFetchAuth(`${apiUrls.notifications.all}?${params.toString()}`);
};
