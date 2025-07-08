"use server";

import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { UserInfo } from "@/types/user.type";
import { cookies } from "next/headers";

export interface VerificationService {
  verify_email: boolean;
  verify_access: boolean;
  user: UserInfo;
}

export const checkVerificationAction = async (): Promise<any> => {
  try {
    const res = await getFetchAuth<VerificationService>(
      apiUrls.auth.checkVerification
    );
    const cookieStore = await cookies();
    cookieStore.set({
      name: "userData",
      value: JSON.stringify(res),
      httpOnly: false,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch (error) {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};
