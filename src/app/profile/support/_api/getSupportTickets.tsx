import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { TicketsResponse, TicketStatusType } from "@/types/support.type";

interface GetSupportTicketsParams {
    page?: number;
    count?: number;
    status?: TicketStatusType;
}

export async function getSupportTickets({
    status,
    page = 1,
    count = 10,
}: GetSupportTicketsParams): Promise<TicketsResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        count: count.toString(),
        ...(status && { status }),
    });
    return await getFetchAuth<TicketsResponse>(
        `${apiUrls.ticket.all}?${params.toString()}`
    );
}
