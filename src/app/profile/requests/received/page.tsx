import { ProjectType } from "@/types/project.type";
import { getTranslations } from "next-intl/server";
import { getReceivedRequests } from "./_api/getReceivedRequests";
import { Pagination } from "@/app/_components/pagination";
import { ReceivedRequestsList } from "./_components/list";

interface ReceivedRequestsPageProps {
    searchParams: Promise<{
        page?: string;
        type?: ProjectType;
    }>;
}

export default async function ReceivedRequestsPage({ searchParams }: ReceivedRequestsPageProps) {
    const t = await getTranslations("pages");

    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");
    const type = resolvedSearchParams?.type;

    const requestsData = await getReceivedRequests({
        type,
        page,
        count: 6
    });

    return (
        <div>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.requests.receivedTitle")}
            </h1>
            <ReceivedRequestsList
                data={requestsData.data}
                selectedType={type}
            />
            {requestsData?.total > 6 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={requestsData.current_page}
                        lastPage={requestsData.last_page}
                        links={requestsData.links}
                        total={requestsData.total}
                        routeUrl="/profile/projects"
                    />
                </div>
            )}
        </div>
    )
}