import { getUserData } from "@/lib/getUserDataFromHeaders";
import { ClaimStatus } from "@/types/claim.type";
import { getTranslations } from "next-intl/server";
import { getSentClaims } from "./_api/getSentClaims";
import { SentClaimsList } from "./_components/list";
import { Pagination } from "@/app/_components/pagination";

interface SentClaimsPageProps {
    searchParams: Promise<{
        page?: string;
        status?: ClaimStatus;
    }>;
}

export default async function SentClaimsPage({ searchParams }: SentClaimsPageProps) {
    const userData = await getUserData();
    const t = await getTranslations("pages");

    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");
    const status = resolvedSearchParams?.status;

    const claimsData = await getSentClaims({
        id: userData.user.id,
        status,
        page,
        count: 6
    });

    return (
        <div>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.claims.sentTitle")}
            </h1>
            <SentClaimsList
                data={claimsData.data}
                selectedStatus={status}
            />
            {claimsData?.total > 6 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={claimsData.current_page}
                        lastPage={claimsData.last_page}
                        links={claimsData.links}
                        total={claimsData.total}
                        routeUrl="/profile/projects"
                    />
                </div>
            )}
        </div>
    )
}