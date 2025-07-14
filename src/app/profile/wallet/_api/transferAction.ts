import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface TransferResponse {
    status: number;
    message?: string;
    errors?: { [key: string]: string[] };
}

export const transferAction = async (_state: any, formData: FormData): Promise<TransferResponse> => {
    const amount = formData.get("amount");
    const customer_number = formData.get("customer_number");

    try {
        const res = await postFetchAuth<TransferResponse>(apiUrls.wallet.transfer, {
            amount,
            customer_number,
        });
        return res;
    } catch (error) {
        throw new Error(`مشکل در دریافت اطلاعات`);
    }
};