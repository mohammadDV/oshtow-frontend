"use server"

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetch } from "@/core/publicService";
import { UserInfo } from "@/types/user.type";
import { cookies } from "next/headers";

export interface LoginService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
    token?: string;
    user?: UserInfo;
}

export const loginAction = async (_state: any, formData: FormData): Promise<any> => {
    const email = formData.get("email");
    const password = formData.get("password");
    try {
        const res = await postFetch<LoginService>(apiUrls.auth.login, {
            email,
            password,
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