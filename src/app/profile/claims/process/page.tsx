import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getClaimsPerProject } from "./_api/getClaimsPerProject";
import { getClaimStatus } from "./_api/getClaimStatus";
import { ClaimStepper } from "./_components/stepper";
import { Pagination } from "@/app/_components/pagination";
import { ClaimsList } from "./_components/list";
import { getTheClaim } from "./_api/getTheClaim";
import { SecurePayment } from "./_components/securePayment";
import { ConfirmReceive } from "./_components/confirmReceive";
import { ConfirmDelivery } from "./_components/confirmDelivery";

interface ClaimProcessProps {
    searchParams: Promise<{
        claimId?: string;
        projectId?: string;
        page?: string;
    }>;
}

export default async function ClaimProcessPage({ searchParams }: ClaimProcessProps) {
    const isMobile = await isMobileDevice();

    const resolvedSearchParams = await searchParams;
    let claimsData;
    let claimData;
    let claimStatus;

    if (resolvedSearchParams?.claimId) {
        claimStatus = await getClaimStatus({ id: resolvedSearchParams.claimId });
        claimData = await getTheClaim({ id: resolvedSearchParams.claimId });
    } else if (resolvedSearchParams?.projectId) {
        claimsData = await getClaimsPerProject({
            id: resolvedSearchParams.projectId,
            page: parseInt(resolvedSearchParams?.page || "1"),
            count: 8
        })
    }

    return (
        <div className="flex flex-col lg:flex-row items-start gap-6">
            <div className="w-full lg:w-2xs">
                <ClaimStepper
                    currentStep={!resolvedSearchParams?.claimId ? "pending" : claimStatus?.status || "pending"}
                    isMobile={isMobile} />
            </div>
            <div className="flex-1">
                {(!resolvedSearchParams?.claimId && claimsData) && (
                    <div>
                        <ClaimsList claimsData={claimsData.data} />
                        {claimsData?.total > 8 && (
                            <div className="mt-8">
                                <Pagination
                                    currentPage={claimsData.current_page}
                                    lastPage={claimsData.last_page}
                                    links={claimsData.links}
                                    total={claimsData.total}
                                    routeUrl={`/profile/claims/process?projectId=${resolvedSearchParams.projectId}`}
                                />
                            </div>
                        )}
                    </div>
                )}
                {claimStatus?.status === "approved" && (
                    <SecurePayment claimData={claimData} claimStatus={claimStatus} />
                )}
                {claimStatus?.status === "paid" && (
                    <ConfirmReceive claimData={claimData} claimStatus={claimStatus} />
                )}
                {claimStatus?.status === "in_progress" && (
                    <ConfirmDelivery claimData={claimData} claimStatus={claimStatus} />
                )}
            </div>
        </div>
    )
}