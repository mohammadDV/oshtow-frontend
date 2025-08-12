"use server"

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";
import { getTranslations } from "next-intl/server";

export interface CreateTicketResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
  data?: any;
}

export const createTicketAction = async (
  _state: any,
  formData: FormData
): Promise<CreateTicketResponse> => {
  const t = await getTranslations("common");

  const message = formData.get("message");
  const subject_id = formData.get("subject_id");
  const file = formData.get("file");

  try {
    const res = await postFetchAuth<CreateTicketResponse>(apiUrls.ticket.all, {
      message,
      subject_id,
      file,
    });
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};
