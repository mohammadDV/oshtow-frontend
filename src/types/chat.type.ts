import { PaginationLink } from "./project.type";
import { UserInfo } from "./user.type";

export type MessageStatus = "read" | "pending"

export interface ChatInfo {
    id: number;
    user_id: number;
    target_id: number;
    status: string;
    messages_count: number;
    user: UserInfo;
    target: UserInfo;
    last_message: ChatMessage;
    created_at: string;
    updated_at: string;
}

export interface ChatMessage {
    id: number;
    chat_id: number;
    user_id: number;
    status: MessageStatus;
    message: string;
    remover_id: number | null;
    file: string | null;
    created_at: string;
    updated_at: string;
}

export interface ChatsResponse {
    current_page: number;
    data: ChatInfo[];
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

export interface ChatsMessagesResponse {
    current_page: number;
    data: ChatMessage[];
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