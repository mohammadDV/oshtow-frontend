import { Pagination } from "@/app/_components/pagination";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { isEmpty, putCommas } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { getTranslations } from "next-intl/server";
import { getWallet } from "../../_api/getWallet";
import { getClaimReviews } from "./_api/getClaimReviews";
import { getClaimsPerProject } from "./_api/getClaimsPerProject";
import { getClaimStatus } from "./_api/getClaimStatus";
import { getTheClaim } from "./_api/getTheClaim";
import { ConfirmDelivery } from "./_components/confirmDelivery";
import { ConfirmReceive } from "./_components/confirmReceive";
import { DeliveredClaim } from "./_components/deliveredClaim";
import { ClaimsList } from "./_components/list";
import { SecurePayment } from "./_components/securePayment";
import { ClaimStepper } from "./_components/stepper";

interface ClaimProcessProps {
    searchParams: Promise<{
        claimId?: string;
        projectId?: string;
        page?: string;
    }>;
}

export default async function ClaimProcessPage({ searchParams }: ClaimProcessProps) {
    const isMobile = await isMobileDevice();
    const tPages = await getTranslations("pages");
    const tCommon = await getTranslations("common");
    const resolvedSearchParams = await searchParams;

    const walletData = await getWallet();
    let claimsData;
    let claimData;
    let claimStatus;
    let reviewsData;

    if (resolvedSearchParams?.claimId) {
        claimStatus = await getClaimStatus({ id: resolvedSearchParams.claimId });
        claimData = await getTheClaim({ id: resolvedSearchParams.claimId });
        if (claimStatus.status === "delivered") {
            reviewsData = await getClaimReviews({ id: resolvedSearchParams.claimId })
        }
    } else if (resolvedSearchParams?.projectId) {
        claimsData = await getClaimsPerProject({
            id: resolvedSearchParams.projectId,
            page: parseInt(resolvedSearchParams?.page || "1"),
            count: 8
        })
    }

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "pending":
                return "secondary";
            case "released":
                return "primary";
            case "cancelled":
                return "destructive";
            default:
                return "primary";
        }
    }

    return (
        <div className="flex flex-col lg:flex-row items-start gap-5 lg:gap-6">
            <div className="w-full lg:w-2xs">
                <ClaimStepper
                    currentStep={!resolvedSearchParams?.claimId ? "pending" : claimStatus?.status || "pending"}
                    isMobile={isMobile}
                    chat_id={claimStatus?.chat_id} />
            </div>
            <div className="w-full lg:w-auto lg:flex-1">
                {claimStatus && !isEmpty(claimStatus?.payments) && claimStatus?.payments?.length > 0 && (
                    <div className="p-5 mb-5 rounded-2xl bg-white flex items-center justify-between">
                        <p className="text-text">
                            {tPages("profile.claims.createdSecurePayment")}
                            <span className='text-primary inline-block mx-1'>
                                {putCommas(parseFloat(claimStatus.payments?.[0]?.amount))} {' '}
                                {tCommon("unit.toman")}
                            </span>
                        </p>
                        <Badge variant={getStatusBadgeVariant(claimStatus.payments?.[0]?.status)}>
                            {tCommon(`claimPaymentStatus.${claimStatus.payments?.[0]?.status}`)}
                        </Badge>
                    </div>
                )}
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
                    <SecurePayment claimData={claimData} claimStatus={claimStatus} walletData={walletData} />
                )}
                {claimStatus?.status === "paid" && (
                    <ConfirmReceive claimData={claimData} claimStatus={claimStatus} />
                )}
                {claimStatus?.status === "in_progress" && (
                    <ConfirmDelivery claimData={claimData} claimStatus={claimStatus} />
                )}
                {claimStatus?.status === "delivered" && (
                    <DeliveredClaim claimData={claimData} claimStatus={claimStatus} reviewsData={reviewsData} />
                )}
            </div>
        </div>
    )
}