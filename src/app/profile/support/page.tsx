import { TicketStatusType } from "@/types/support.type";
import { getTranslations } from "next-intl/server";
import { getSupportTickets } from "./_api/getSupportTickets";
import { TicketList } from "./_components/ticketList";

interface SupportPageProps {
    searchParams: Promise<{
        page?: string;
        status?: TicketStatusType;
    }>;
}

export default async function SupportPage({ searchParams }: SupportPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const status = resolvedSearchParams?.status;

    const ticketsData = await getSupportTickets({
        status,
        page,
        count: 10
    });

    return (
        <div>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.support.title")}
            </h1>
            <TicketList ticketsData={ticketsData} selectedStatus={status} />
        </div>
    )
}