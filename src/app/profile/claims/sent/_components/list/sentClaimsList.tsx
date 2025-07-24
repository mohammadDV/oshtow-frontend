import { Claim, ClaimStatus } from "@/types/claim.type"

interface SentClaimsListProps {
    data: Claim[];
    selectedStatus?: ClaimStatus;
}

export const SentClaimsList = ({ data, selectedStatus }: SentClaimsListProps) => {
    return (
        <div>sentClaimsList</div>
    )
}