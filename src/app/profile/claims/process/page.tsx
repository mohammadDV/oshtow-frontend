import { getClaimsPerProject } from "./_api/getClaimsPerProject";
import { getClaimStatus } from "./_api/getClaimStatus";
import { ClaimStepper } from "./_components/stepper";

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

    if (resolvedSearchParams?.claimId) {
        claimStatus = await getClaimStatus({ id: resolvedSearchParams.claimId })
    } else if (resolvedSearchParams?.projectId) {
        claimsData = await getClaimsPerProject({
            id: resolvedSearchParams.projectId,
            page: parseInt(resolvedSearchParams?.page || "1"),
            count: 8
        })
    }

    return (
        <div className="flex items-start gap-6">
            <div className="lg:w-1/3">
                <ClaimStepper currentStep="paid"/>
            </div>
        </div>
    )
}