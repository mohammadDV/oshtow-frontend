import { PaginationLink } from "./project.type";
import { UserInfo } from "./user.type";

export type PlanType = "monthly" | "yearly"

export interface Plan {
    id: string;
    title: string;
    priod: PlanType;
    status: number;
    amount: string;
    period_count: number;
    claim_count: string;
    project_count: string;
    user_id: number;
    created_at?: string;
    updated_at?: string;
}

export interface SubscriptionPlan {
    id: number;
    user: UserInfo;
    plan: Plan;
    ends_at: string;
    active: boolean;
    created_at: string;
    updated_at: string;
}

export interface SubscriptionPlansResponse {
    current_page: number;
    data: SubscriptionPlan[];
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