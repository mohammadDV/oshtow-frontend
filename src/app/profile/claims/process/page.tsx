import { getClaimsPerProject } from "./_api/getClaimsPerProject";
import { getClaimStatus } from "./_api/getClaimStatus";

interface ClaimProcessProps {
    searchParams: Promise<{
        claimId?: string;
        projectId?: string;
        page?: string;
    }>;
}

export default async function ClaimProcessPage({ searchParams }: ClaimProcessProps) {
    const resolvedSearchParams = await searchParams;
    let claimsData;
    let claimStatus;

    if (resolvedSearchParams?.projectId && !resolvedSearchParams?.claimId) {
        claimsData = await getClaimsPerProject({
            id: resolvedSearchParams.projectId,
            page: parseInt(resolvedSearchParams?.page || "1"),
            count: 8
        })
    } else if (resolvedSearchParams?.claimId) {
        claimStatus = await getClaimStatus({ id: resolvedSearchParams.claimId })
    }

    return (
        <></>
    )
}