import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { getTranslations } from "next-intl/server";
import { getChats } from "./_api/getChats";
import { InboxList } from "./_components/inboxList";
import { getChatInfo } from "./_api/getChatInfo";
import { getChat } from "./_api/getChat";
import { CurrentChat } from "./_components/currentChat";

interface ChatPageProps {
    searchParams: Promise<{
        chatId?: string;
    }>;
}

export default async function ChatPage({ searchParams }: ChatPageProps) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();
    const userData = await getUserData();
    const resolvedParams = await searchParams;

    const chatsData = await getChats({});
    let chatInfo;
    let chatMessages;
    let otherUser;

    if (resolvedParams.chatId) {
        chatInfo = await getChatInfo({ id: resolvedParams.chatId });
        chatMessages = await getChat({ id: resolvedParams.chatId });
        otherUser = chatInfo.user.id === userData.user.id ? chatInfo.target : chatInfo.user;
    }

    if (isMobile) {
        return (
            <>
                <h1 className="text-title text-xl lg:text-2xl font-medium">
                    {t("profile.chat.title")}
                </h1>
                <div className="p-6 rounded-2xl lg:rounded-3xl bg-white mt-5 flex justify-between gap-6 lg:h-[70vh]">
                    {(resolvedParams.chatId && chatInfo && otherUser && chatMessages)
                        ? (
                            <CurrentChat
                                chatInfo={chatInfo}
                                otherUser={otherUser}
                                chatMessages={chatMessages}
                                userData={userData} />
                        )
                        : (
                            <InboxList userData={userData} chatsData={chatsData?.data} />
                        )}
                </div>
            </>
        )
    } else {
        return (
            <>
                <h1 className="text-title text-xl lg:text-2xl font-medium">
                    {t("profile.chat.title")}
                </h1>
                <div className="p-6 rounded-2xl lg:rounded-3xl bg-white mt-5 flex justify-between gap-6 lg:h-[70vh]">
                    <div className="lg:w-1/3">
                        <InboxList userData={userData} chatsData={chatsData?.data} />
                    </div>
                    <div className="lg:w-2/3 flex flex-col">
                        {(resolvedParams.chatId && chatInfo && otherUser && chatMessages)
                            ? (
                                <CurrentChat
                                    chatInfo={chatInfo}
                                    otherUser={otherUser}
                                    chatMessages={chatMessages}
                                    userData={userData} />
                            )
                            : (
                                <div className="flex items-center justify-center h-full text-gray-500">
                                    <p>
                                        برای شروع گفت و گو یک کاربر را انتخاب کنید
                                    </p>
                                </div>
                            )}
                    </div>
                </div>
            </>
        )
    }
}