import { PaginationLink } from "./project.type";

export type TransactionStatus = "pending" | "completed" | "cancelled" | "failed"
export type TransactionType = "wallet" | "plan" | "identity" | "secure"

export interface Transaction {
    id: number;
    bank_transaction_id: string;
    reference: string | null;
    status: TransactionStatus;
    amount: number;
    message: string;
    type: TransactionType;
    created_at: string
}

export interface TransactionsResponse {
    current_page: number;
    data: Transaction[];
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