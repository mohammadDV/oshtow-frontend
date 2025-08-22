"use server";

import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface ManualPaymentResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export const manualPaymentAction = async (
  _state: any,
  formData: FormData
): Promise<ManualPaymentResponse> => {
  const amount = formData.get("amount");
  const image = formData.get("image");
  const type = formData.get("type");

  try {
    const res = await postFetchAuth<ManualPaymentResponse>(
      apiUrls.payment.manualPayment,
      {
        amount,
        image,
        type,
      }
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در ثبت پرداخت دستی`);
  }
};