"use server"

import { apiUrls } from "@/constants/apiUrls";
import { postFetch } from "@/core/publicService";

export interface ResetPasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const resetPasswordAction = async (_state: any, formData: FormData): Promise<ResetPasswordService> => {
    const email = formData.get("email");
    const token = formData.get("token");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");

    try {
        const res = await postFetch<ResetPasswordService>("/reset-password", {
            email,
            token,
            password,
            password_confirmation,
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در بازنشانی رمز عبور`);
    }
};