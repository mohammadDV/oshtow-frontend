"use server"

import { apiUrls } from "@/constants/apiUrls";
import { postFetch } from "@/core/publicService";

export interface ForgotPasswordService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const forgotPasswordAction = async (_state: any, formData: FormData): Promise<ForgotPasswordService> => {
    const email = formData.get("email");

    try {
        const res = await postFetch<ForgotPasswordService>(apiUrls.auth.forgotPassword, {
            email,
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در ارسال لینک بازنشانی`);
    }
}