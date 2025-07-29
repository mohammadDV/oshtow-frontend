"use server";

import { apiUrls } from "@/constants/apiUrls";
import { postFormDataAuth } from "@/core/baseService";

export interface SendMessageResponse {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const sendMessageAction = async (
    otherUserId: number,
    _state: any,
    formData: FormData
): Promise<SendMessageResponse> => {
    try {
        const res = await postFormDataAuth<SendMessageResponse>(
            `${apiUrls.chat.all}/${otherUserId}`,
            formData
        );
        return res;
    } catch (error) {
        throw new Error(`مشکل در ارسال پیام`);
    }
};