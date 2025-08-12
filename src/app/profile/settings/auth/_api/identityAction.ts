"use server"

import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface IdentityResponse {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
    url?: string;
}

export const identityAction = async (_state: any, formData: FormData): Promise<IdentityResponse> => {
    const first_name = formData.get("first_name");
    const last_name = formData.get("last_name");
    const national_code = formData.get("national_code");
    const mobile = formData.get("mobile");
    const birthday = formData.get("birthday");
    const email = formData.get("email");
    const country_id = formData.get("country_id");
    const province_id = formData.get("province_id");
    const city_id = formData.get("city_id");
    const postal_code = formData.get("postal_code");
    const address = formData.get("address");
    const image_national_code_front = formData.get("image_national_code_front");
    const image_national_code_back = formData.get("image_national_code_back");
    const video = formData.get("video");

    try {
        const res = await postFetchAuth<IdentityResponse>(apiUrls.identity.records, {
            first_name,
            last_name,
            national_code,
            mobile,
            birthday,
            email,
            country_id,
            province_id,
            city_id,
            postal_code,
            address,
            image_national_code_front,
            image_national_code_back,
            video
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};