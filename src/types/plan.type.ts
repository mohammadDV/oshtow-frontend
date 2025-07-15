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