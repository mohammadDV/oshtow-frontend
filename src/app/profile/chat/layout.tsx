import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";

export default async function ChatLayout({
    inbox,
    chat
}: {
    inbox: React.ReactNode;
    chat: React.ReactNode
}) {
    const t = await getTranslations("pages");
    const isMobile = await isMobileDevice();

    if (isMobile) {
        return (
            <>
                <h1 className="text-title text-xl lg:text-2xl font-medium">
                    {t("profile.chat.title")}
                </h1>
                <div className="p-6 rounded-2xl lg:rounded-3xl bg-white mt-5 flex justify-between gap-6 lg:h-[70vh]">
                    {inbox}
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
                        {inbox}
                    </div>
                    <div className="lg:w-2/3 flex flex-col">
                        {chat}
                    </div>
                </div>
            </>
        )
    }
}