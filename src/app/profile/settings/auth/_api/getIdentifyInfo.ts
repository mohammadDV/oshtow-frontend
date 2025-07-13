import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";

export interface IdentifyInfoResponse {
    id: number;
    fullname: string;
    national_code: string;
    mobile: string;
    birthday: string;
    email: string;
    country: string;
    postal_code: string;
    address: string;
    image_national_code_front: string;
    image_national_code_back: string;
    video: string;
    status: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
}

interface GetIdentifyInfoProps {
    id: number;
}

export async function getIdentifyInfo({
    id,
}: GetIdentifyInfoProps): Promise<IdentifyInfoResponse> {
    return getFetchAuth<IdentifyInfoResponse>(`${apiUrls.identity.recordsInfo}/${id}`);
}
