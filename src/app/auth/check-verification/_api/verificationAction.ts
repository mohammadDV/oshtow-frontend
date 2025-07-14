"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/baseService";
import { UserData } from "@/types/user.type";
import { cookies } from "next/headers";

interface CheckVerificationResponse extends UserData {
  status?: StatusCode;
  message?: string;
}

export const checkVerificationAction = async (): Promise<any> => {
  try {
    const res = await getFetchAuth<CheckVerificationResponse>(
      apiUrls.auth.checkVerification
    );
    const cookieStore = await cookies();
    if (res.status === StatusCode.Failed) {
      cookieStore.set({
        name: "token",
        value: '',
        httpOnly: false,
        path: "/",
        maxAge: 0,
      });
      cookieStore.set({
        name: "userData",
        value: '',
        httpOnly: false,
        path: "/",
        maxAge: 0,
      });
    } else {
      cookieStore.set({
        name: "userData",
        value: JSON.stringify(res),
        httpOnly: false,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return res;
  } catch (error) {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};
