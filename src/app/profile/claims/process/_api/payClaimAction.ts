"use server";

import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface PayClaimResponse {
  status: number;
  message: string;
  url?: string;
}

export const payClaimAction = async (_state: any, formData: FormData): Promise<PayClaimResponse> => {
    const claimId = formData.get("claimId");
    const amount = formData.get("amount");
    const paymentMethod = formData.get("payment_method");

    try {
        const res = await postFetchAuth<PayClaimResponse>(`${apiUrls.claims.all}/${claimId}/paid`, {
            amount: amount,
            payment_method: paymentMethod
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در پردازش درخواست`);
    }
};