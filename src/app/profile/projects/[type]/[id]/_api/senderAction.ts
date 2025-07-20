"use server";

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { patchFetchAuth, postFetchAuth } from "@/core/baseService";
import { getTranslations } from "next-intl/server";

export interface SenderService {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const createSenderAction = async (
    _state: any,
    formData: FormData
): Promise<SenderService> => {
    const t = await getTranslations("common");

    const title = formData.get("title");
    const description = formData.get("description");
    const address = formData.get("address");
    const image = formData.get("image");
    const o_country_id = formData.get("o_country_id");
    const o_province_id = formData.get("o_province_id");
    const o_city_id = formData.get("o_city_id");
    const d_country_id = formData.get("d_country_id");
    const d_province_id = formData.get("d_province_id");
    const d_city_id = formData.get("d_city_id");
    const categories = formData.get("categories");
    const send_date = formData.get("send_date");
    const receive_date = formData.get("receive_date");
    const weight = formData.get("weight");
    const amount = formData.get("amount");
    const dimensions = formData.get("dimensions");

    try {
        const res = await postFetchAuth<SenderService>(
            apiUrls.projects.profile,
            {
                title,
                description,
                address,
                image,
                o_country_id,
                o_province_id,
                o_city_id,
                d_country_id,
                d_province_id,
                d_city_id,
                categories: [categories],
                send_date,
                receive_date,
                weight,
                amount,
                dimensions,
                type: "sender",
            }
        );
        return res;
    } catch (error) {
        return {
            status: StatusCode.Failed,
            message: t("messages.error")
        }
    }
};

export const editSenderAction = async (
    _state: any,
    formData: FormData
): Promise<SenderService> => {
    const t = await getTranslations("common");

    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const address = formData.get("address");
    const image = formData.get("image");
    const o_country_id = formData.get("o_country_id");
    const o_province_id = formData.get("o_province_id");
    const o_city_id = formData.get("o_city_id");
    const d_country_id = formData.get("d_country_id");
    const d_province_id = formData.get("d_province_id");
    const d_city_id = formData.get("d_city_id");
    const categories = formData.get("categories");
    const send_date = formData.get("send_date");
    const receive_date = formData.get("receive_date");
    const weight = formData.get("weight");
    const amount = formData.get("amount");
    const dimensions = formData.get("dimensions");

    try {
        const res = await patchFetchAuth<SenderService>(
            `${apiUrls.projects.profile}/${id}`,
            {
                title,
                description,
                address,
                image,
                o_country_id,
                o_province_id,
                o_city_id,
                d_country_id,
                d_province_id,
                d_city_id,
                categories: [categories],
                send_date,
                receive_date,
                weight,
                amount,
                dimensions,
                type: "sender",
            }
        );
        return res;
    } catch (error) {
        return {
            status: StatusCode.Failed,
            message: t("messages.error")
        }
    }
};
