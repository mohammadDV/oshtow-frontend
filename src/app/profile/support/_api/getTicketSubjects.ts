import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";
import { TicketSubject } from "@/types/support.type";

export const getTicketSubjects = async (): Promise<TicketSubject[]> => {
  return await getFetch<TicketSubject[]>(apiUrls.ticket.subjects);
};
