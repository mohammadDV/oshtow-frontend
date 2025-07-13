import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";

export interface ResendVerifyService {
    status: StatusCode;
    message?: string;
}

export const resendVerifyAction = async (): Promise<ResendVerifyService> => {
    try {
        return await postFetchAuth<ResendVerifyService>(apiUrls.auth.verifyNotification, {});
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};
