import { getUserData } from "@/lib/getUserDataFromHeaders";
import { getChats } from "./_api/getChats";
import { InboxList } from "./_components/inboxList";

export default async function InboxPage() {
    const userData = await getUserData();
    const chatsData = await getChats({});

    return (
        <InboxList userData={userData} chatsData={chatsData?.data} />
    )
}