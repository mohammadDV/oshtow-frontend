import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface ConfirmNewAmountResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export const confirmNewAmountAction = async (
  _state: any,
  formData: FormData
): Promise<ConfirmNewAmountResponse> => {
  const confirm = formData.get("confirm");
  const claimId = formData.get("claimId");

  try {
    const res = await postFetchAuth<ConfirmNewAmountResponse>(
      `${apiUrls.claims.all}/${claimId}/confirm-new-amount`,
      {
        confirm: confirm === "true",
      }
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در تایید مبلغ پیشنهادی`);
  }
};
