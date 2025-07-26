"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";
import { FullClaim } from "@/types/claim.type";
import { getTranslations } from "next-intl/server";

export interface ConfirmDeliveryResponse {
  status: number;
  message: string;
  data?: FullClaim;
}

export const confirmDeliveryAction = async (
  _state: any,
  formData: FormData
): Promise<ConfirmDeliveryResponse> => {
  const t = await getTranslations("common");

  const claimId = formData.get("claimId");
  const confirmationCode = formData.get("confirmation_code");

  try {
    const res = await postFetchAuth<ConfirmDeliveryResponse>(
      `${apiUrls.claims.all}/${claimId}/delivered`,
      {
        confirmation_code: confirmationCode,
      }
    );
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};
