"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";
import { FullClaim } from "@/types/claim.type";
import { getTranslations } from "next-intl/server";

export interface ConfirmReceiveResponse {
  status: number;
  message: string;
  data?: FullClaim;
}

export const confirmReceiveAction = async (
  _state: any,
  formData: FormData
): Promise<ConfirmReceiveResponse> => {
  const t = await getTranslations("common");

  const claimId = formData.get("claimId");
  const confirmationImage = formData.get("confirmation_image");
  const confirmationDescription = formData.get("confirmation_description");

  try {
    const res = await postFetchAuth<ConfirmReceiveResponse>(
      `${apiUrls.claims.all}/${claimId}/inprogress`,
      {
        confirmation_image: confirmationImage,
        confirmation_description: confirmationDescription,
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
