import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { postFetch } from "@/core/publicService";

interface verifyResetPasswordService {
    status: StatusCode;
    message: string;
    errors?: { [key: string]: string[] };
    user?: {
        email: string;
        name: string;
    }
}

interface verifyResetPasswordProps {
    token: string,
    email: string
}

export const verifyResetPassword = async ({
    token,
    email
}: verifyResetPasswordProps): Promise<verifyResetPasswordService> => {
    return await postFetch<verifyResetPasswordService>(apiUrls.auth.verifyResetToken, { token, email });
};