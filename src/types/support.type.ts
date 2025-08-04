import { PaginationLink } from "./project.type";

export type TicketStatusType = "active"

export interface TicketSubject {
    id: number;
    title: string;
    user_id: number;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface TicketMessage {
    id: number;
    ticket_id: number;
    user_id: number;
    status: string;
    message: string;
    file: string | null;
    created_at: string; 
    updated_at: string;
}

export interface Ticket {
    id: number;
    user_id: number;
    subject_id: number;
    status: TicketStatusType;
    created_at: string;
    updated_at: string;
    subject: TicketSubject;
    message: TicketMessage;
}

export interface TicketsResponse {
    current_page: number;
    data: Ticket[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}