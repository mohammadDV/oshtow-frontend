"use server";

import { cookies } from "next/headers";

export const logoutAction = async (): Promise<any> => {
  try {
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: "",
      httpOnly: false,
      path: "/",
      maxAge: 0,
    });
    cookieStore.set({
      name: "userData",
      value: "",
      httpOnly: false,
      path: "/",
      maxAge: 0,
    });
  } catch (error) {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};
