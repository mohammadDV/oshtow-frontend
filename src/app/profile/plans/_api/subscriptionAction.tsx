"use server"

import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface SubscriptionResponse {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
    url?: string;
}

export const subscriptionAction = async (_state: any, formData: FormData): Promise<SubscriptionResponse> => {
    const planId = formData.get("planId");
    const paymentMethod = formData.get("payment_method");

    try {
        const res = await postFetchAuth<SubscriptionResponse>(`${apiUrls.subscription.profile}/${planId}`, {
            payment_method: paymentMethod
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در پردازش درخواست`);
    }
};