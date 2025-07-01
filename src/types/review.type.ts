import { PaginationLink } from "./project.type";
import { UserInfo } from "./user.type";

export interface Review {
    id: string;
    comment: string;
    rate: number;
    status: number;
    claim_id: number;
    owner_id: number;
    user_id: number;
    user: UserInfo;
    created_at?: string;
    updated_at?: string;
}

export interface ReviewsResponse {
    current_page: number;
    data: Review[];
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