"use server"

import { cookies } from "next/headers";
import { VerificationService } from "../layout";

export async function setUserDataCookie(userData: VerificationService) {
    const cookieStore = await cookies();
    cookieStore.set({
        name: 'userData',
        value: JSON.stringify(userData),
        httpOnly: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
    });
}