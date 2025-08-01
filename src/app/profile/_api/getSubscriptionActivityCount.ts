import { apiUrls } from "@/constants/apiUrls";
import { SubscriptionType } from "@/constants/enums";
import { getFetchAuth } from "@/core/baseService";

export interface SubscriptionActivityCountService {
  headers: any;
  original: {
    project_count: number;
    projects: number;
    claim_count: number;
    claims: number;
    subscription: {
      has_active_subscription: SubscriptionType;
      remaining_days: number;
      ends_at: string | null;
      message: string;
    };
  };
  exception: null;
}

export const getSubscriptionActivityCount =
  async (): Promise<SubscriptionActivityCountService> => {
    return await getFetchAuth<SubscriptionActivityCountService>(
      apiUrls.subscription.activityCount
    );
  };
