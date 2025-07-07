"use server"

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetch } from "@/core/publicService";
import { UserInfo } from "@/types/user.type";
import { cookies } from "next/headers";

export interface RegisterService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
    token?: string;
    user?: UserInfo;
}

export const registerAction = async (_state: any, formData: FormData): Promise<any> => {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const nickname = formData.get("nickname");
    const email = formData.get("email");
    const mobile = formData.get("mobile");
    const password = formData.get("password");
    const password_confirmation = formData.get("password_confirmation");
    const privacy_policy = formData.get("privacy_policy");
    try {
        const res = await postFetch<RegisterService>(apiUrls.auth.register, {
            first_name,
            last_name,
            nickname,
            email,
            mobile,
            password,
            password_confirmation,
            privacy_policy: privacy_policy === "true",
        });
        if (res.status === StatusCode.Success) {
            const cookieStore = await cookies();
            cookieStore.set({
                name: 'token',
                value: res.token as string,
                httpOnly: true,
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });
        }
        return res;
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
}