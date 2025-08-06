import { createdDateConvertor } from "@/lib/dateUtils"
import { ChatInfo, ChatsMessagesResponse } from "@/types/chat.type";
import { UserData, UserInfo } from "@/types/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar"
import { ChatMessages } from "./chatMessages";
import Link from "next/link";
import { Icon } from "@/ui/icon";
import { createFileUrl } from "@/lib/utils";

interface CurrentChatProps {
    otherUser: UserInfo;
    chatMessages: ChatsMessagesResponse;
    chatInfo: ChatInfo;
    userData: UserData;
}

export const CurrentChat = ({ chatInfo, chatMessages, otherUser, userData }: CurrentChatProps) => {
    return (
        <>
            <div className="flex items-center gap-3">
                <Link href={"/profile/chat"} className="lg:hidden">
                    <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-6" className="text-caption" />
                </Link>
                <Avatar className="size-11">
                    <AvatarImage src={otherUser.profile_photo_path ? createFileUrl(otherUser.profile_photo_path) : undefined} alt={otherUser.nickname} />
                    <AvatarFallback>{otherUser.nickname}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-normal text-title">
                        {otherUser.nickname}
                    </h3>
                    <p className="text-xs text-caption font-normal">
                        {createdDateConvertor(chatInfo.created_at)}
                    </p>
                </div>
            </div>
            <ChatMessages
                key={chatInfo.id}
                chatId={chatInfo.id.toString()}
                otherUserId={otherUser.id}
                initialData={chatMessages}
                userData={userData}
            />
        </>
    )
}