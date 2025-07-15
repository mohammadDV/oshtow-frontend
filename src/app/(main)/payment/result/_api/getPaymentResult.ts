import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";
import { PaymentResultResponse } from "../[transactionId]/page";

interface GetPaymentResultProps {
    id: string;
}

export async function getPaymentResult({
    id,
}: GetPaymentResultProps): Promise<PaymentResultResponse> {
    return getFetch<PaymentResultResponse>(`${apiUrls.payment.result}/${id}`);
}
