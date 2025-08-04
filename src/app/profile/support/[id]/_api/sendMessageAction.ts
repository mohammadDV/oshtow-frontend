"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";
import { TicketMessage } from "@/types/support.type";
import { getTranslations } from "next-intl/server";

export interface SendMessageResponse {
  status: number;
  message: string;
  data?: TicketMessage;
}

export const sendMessageAction = async (
  _state: any,
  formData: FormData
): Promise<SendMessageResponse> => {
  const t = await getTranslations("common");

  const ticketId = formData.get("ticketId");
  const message = formData.get("message");
  const file = formData.get("file");

  try {
    const requestBody: any = {
      message: message,
    };

    if (file) {
      requestBody.file = file;
    }

    const res = await postFetchAuth<SendMessageResponse>(
      `${apiUrls.ticket.all}/${ticketId}/message`,
      requestBody
    );
    return res;
  } catch (error) {
    return {
      status: StatusCode.Failed,
      message: t("messages.error"),
    };
  }
};