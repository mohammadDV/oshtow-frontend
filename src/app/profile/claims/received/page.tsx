import { ProjectType } from "@/types/project.type";
import { getTranslations } from "next-intl/server";
import { Pagination } from "@/app/_components/pagination";
import { ReceivedClaimsList } from "./_components/list";
import { getReceivedProjectsClaims } from "./_api/getReceivedClaims";

interface ReceivedClaimsPageProps {
    searchParams: Promise<{
        page?: string;
        type?: ProjectType;
    }>;
}

export default async function ReceivedClaimsPage({ searchParams }: ReceivedClaimsPageProps) {
    const t = await getTranslations("pages");

    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");
    const type = resolvedSearchParams?.type;

    const claimsData = await getReceivedProjectsClaims({
        type,
        page,
        count: 6
    });

    return (
        <div>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.claims.receivedTitle")}
            </h1>
            <ReceivedClaimsList
                data={claimsData.data}
                selectedType={type}
            />
            {claimsData?.total > 6 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={claimsData.current_page}
                        lastPage={claimsData.last_page}
                        links={claimsData.links}
                        total={claimsData.total}
                        routeUrl={`/profile/claims/received`}
                    />
                </div>
            )}
        </div>
    )
}