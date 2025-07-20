"use server"

import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/baseService";

export interface RequestService {
    status: StatusCode;
    message?: string;
    errors?: Record<string, string[]>;
}

export const requestAction = async (
    _state: RequestService | null,
    formData: FormData
): Promise<RequestService> => {
    const amount = formData.get("amount");
    const weight = formData.get("weight");
    const description = formData.get("description");
    const address_type = formData.get("address_type");
    const address = formData.get("address");
    const image = formData.get("image");
    const project_id = formData.get("project_id");

    try {
        const response = await postFetchAuth<RequestService>(apiUrls.claims.all, {
            description,
            amount: Number(amount),
            weight: Number(weight),
            address: address || "",
            address_type,
            image: image || "",
            project_id: Number(project_id)
        });

        return response;
    } catch (error) {
        return {
            status: StatusCode.Failed,
            message: "مشکل در دریافت اطلاعات"
        };
    }
};