"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";
import { getTranslations } from "next-intl/server";

export interface CreateReviewResponse {
  status: number;
  message: string;
  data?: {
    id: number;
    owner_id: number;
    claim_id: number;
    user_id: number;
    comment: string;
    rate: string;
    status: number;
    created_at?: string;
    updated_at?: string;
  };
}

export const createReviewAction = async (
  _state: any,
  formData: FormData
): Promise<CreateReviewResponse> => {
  const t = await getTranslations("common");

  const claimId = formData.get("claimId");
  const rate = formData.get("rate");
  const comment = formData.get("comment");

  try {
    const res = await postFetchAuth<CreateReviewResponse>(
      `${apiUrls.reviews.profile}/${claimId}`,
      {
        rate,
        comment,
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
