export type TransactionType = 'deposit' | 'withdrawal' | 'refund' | 'transfer' | 'purchase'
export type TransactionStatus = 'pending' | 'completed' | 'failed'
export type WithdrawStatus = 'pending' | 'completed' | 'reject';

export interface WalletTransaction {
    id: number;
    wallet_id: number;
    type: TransactionType;
    amount: string;
    currency: string;
    status: TransactionStatus;
    reference: string;
    description: string;
    created_at?: string;
    updated_at?: string;
}

export interface WalletTransactionsResponse {
    current_page: number;
    data: WalletTransaction[];
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

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface WalletTransactionFilters {
    type?: TransactionType;
    status?: TransactionStatus;
    page?: number;
    count?: number;
}

export interface WithdrawRequest {
    id: number;
    wallet_id: number;
    amount: string;
    currency: string;
    status: WithdrawStatus;
    reference: string;
    card: string;
    sheba: string;
    description: string;
    image: string | null;
    reason: string;
    created_at: string;
    updated_at: string;
}

export interface WithdrawRequestsResponse {
    current_page: number;
    data: WithdrawRequest[];
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

export interface WithdrawRequestFilters {
    status?: WithdrawStatus;
}