import { apiUrls } from "@/constants/apiUrls";
import { postFetch } from "@/core/publicService";

export interface RegisterService {
    first_name: string;
    last_name: string;
    nickname: string;
    email: string;
    mobile: string;
    password: string;
    password_confirmation: string;
    privacy_policy: boolean;
}

export const registerServiceHandler = async (data: RegisterService): Promise<any> => {
    return await postFetch(apiUrls.auth.register, data)
}