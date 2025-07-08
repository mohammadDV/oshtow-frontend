'use server';

import { cookies } from 'next/headers';

export async function getUserDataAction() {
    const cookieStore = await cookies();
    const userDataCookie = cookieStore.get('userData')?.value;

    if (!userDataCookie) return null;

    try {
        const userData = JSON.parse(userDataCookie);
        return userData;
    } catch (err) {
        return null;
    }
}