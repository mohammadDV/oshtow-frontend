import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface SuggestNewAmountResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export const suggestNewAmountAction = async (
  _state: any,
  formData: FormData
): Promise<SuggestNewAmountResponse> => {
  const amount = formData.get("amount");
  const claimId = formData.get("claimId");

  try {
    const res = await postFetchAuth<SuggestNewAmountResponse>(
      `${apiUrls.claims.all}/${claimId}/suggest-new-amount`,
      {
        amount,
      }
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در ارسال پیشنهاد مبلغ`);
  }
};
