"use server";

import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { VerificationService } from "@/types/user.type";
import { cookies } from "next/headers";

export const checkVerificationAction = async (): Promise<any> => {
  try {
    const res = await getFetchAuth<VerificationService>(
      apiUrls.auth.checkVerification
    );

    if (res.verify_email) {
      const cookieStore = await cookies();
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
    return error;
  }
};
