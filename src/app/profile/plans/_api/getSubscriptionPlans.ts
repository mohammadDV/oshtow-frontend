import { getFetchAuth } from "@/core/baseService";
import { apiUrls } from "@/constants/apiUrls";
import { SubscriptionPlansResponse } from "@/types/plan.type";

interface GetSubscriptionPlansParams {
    page?: number;
    count?: number;
}

export async function getSubscriptionPlans({
    page = 1,
    count = 5
}: GetSubscriptionPlansParams): Promise<SubscriptionPlansResponse> {
    const searchParams = new URLSearchParams({
        page: page.toString(),
        count: count.toString(),
    });

    return getFetchAuth<SubscriptionPlansResponse>(`${apiUrls.subscription.subscriptions}?${searchParams.toString()}`);
}