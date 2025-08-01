import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";

export interface DashboardInfoService {
  senders: number;
  passengers: number;
  claims: number;
  receive_claims: number;
  tickets: number;
  messages: number;
}

export const getDashboardInfo = async (): Promise<DashboardInfoService> => {
  return await getFetchAuth<DashboardInfoService>(apiUrls.user.dashboardInfo);
};
