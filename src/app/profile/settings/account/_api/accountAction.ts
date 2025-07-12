"use server"

import { apiUrls } from "@/constants/apiUrls";
import { patchFetchAuth } from "@/core/baseService";

export interface AccountService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const accountAction = async (_state: any, formData: FormData): Promise<AccountService> => {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const nickname = formData.get("nickname");
    const mobile = formData.get("mobile");
    const country_id = formData.get("country_id");
    const province_id = formData.get("province_id");
    const city_id = formData.get("city_id");
    const address = formData.get("address");
    const biography = formData.get("biography");
    const profile_photo_path = formData.get("profile_photo_path");
    const bg_photo_path = formData.get("bg_photo_path");

    try {
        const res = await patchFetchAuth<AccountService>(apiUrls.user.profile, {
            first_name,
            last_name,
            nickname,
            mobile,
            country_id,
            province_id,
            city_id,
            address,
            biography,
            profile_photo_path,
            bg_photo_path
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در بروزرسانی اطلاعات`);
    }
};