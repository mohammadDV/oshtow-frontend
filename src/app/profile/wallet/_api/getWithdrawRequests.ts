import { getFetchAuth } from "@/core/baseService";
import { apiUrls } from "@/constants/apiUrls";
import { WithdrawRequestsResponse, WithdrawStatus } from "@/types/wallet.type";

interface GetWithdrawRequestsParams {
    page?: number;
    status?: WithdrawStatus;
    count?: number;
}

export const getWithdrawRequests = async ({
    page = 1,
    status,
    count = 10
}: GetWithdrawRequestsParams): Promise<WithdrawRequestsResponse> => {
    const params = new URLSearchParams({
        page: page.toString(),
        count: count.toString()
    });

    if (status) {
        params.append('status', status);
    }

    return getFetchAuth(`${apiUrls.wallet.withdraws}?${params.toString()}`);
};