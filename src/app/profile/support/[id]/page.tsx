import { getTranslations } from "next-intl/server";
import { getTicket } from "./_api/getTicket";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { TicketMessages } from "./_components/ticketMessages";

interface TicketPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function TicketPage({ params }: TicketPageProps) {
    const t = await getTranslations("pages");
    const resolvedParams = await params;
    const userData = await getUserData();

    const ticketInfo = await getTicket({ id: resolvedParams.id })

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-title text-xl lg:text-2xl font-medium mb-5">
                {t("profile.support.ticketTo")} {' '} {ticketInfo.subject.title}
            </h1>
            
            <TicketMessages 
                ticketData={ticketInfo}
                userData={userData}
            />
        </div>
    )
}