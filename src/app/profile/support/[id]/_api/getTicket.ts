import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { TicketInfo } from "@/types/support.type";

interface getTicketParams {
  id: string;
}

export async function getTicket({ id }: getTicketParams): Promise<TicketInfo> {
  return await getFetchAuth<TicketInfo>(`${apiUrls.ticket.all}/${id}`);
}
