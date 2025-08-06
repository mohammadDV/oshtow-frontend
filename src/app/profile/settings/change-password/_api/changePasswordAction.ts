"use server"

import { apiUrls } from "@/constants/apiUrls";
import { patchFetchAuth } from "@/core/baseService";

export interface ChangePasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const changePasswordAction = async (_state: any, formData: FormData): Promise<ChangePasswordService> => {
    const current_password = formData.get("current_password");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");
    const id = formData.get("id");

    try {
        const res = await patchFetchAuth<ChangePasswordService>(`${apiUrls.user.profile}/${id}/change-password`, {
            current_password,
            password,
            password_confirmation,
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در تغییر رمز عبور`);
    }
};