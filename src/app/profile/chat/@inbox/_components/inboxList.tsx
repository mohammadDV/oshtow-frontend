"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createdDateConvertor } from "@/lib/dateUtils";
import { ChatInfo } from "@/types/chat.type";
import { UserData } from "@/types/user.type"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Icon } from "@/ui/icon";
import { Input } from "@/ui/input";
import Link from "next/link";

interface InboxListProps {
    userData?: UserData;
    chatsData?: ChatInfo[];
}

export const InboxList = ({ userData, chatsData }: InboxListProps) => {
    const t = useCommonTranslation();

    return (
        <div className="flex flex-col gap-6">
            <div className="relative">
                <Input type="text" placeholder={t("inputs.searchUser")} />
                <Icon
                    icon="solar--magnifer-outline"
                    sizeClass="size-5"
                    className="text-caption absolute top-3 left-3" />
            </div>
            <div className="flex flex-col gap-5 overflow-auto">
                {chatsData?.map(chat => {
                    const otherUser = chat.user.id === userData?.user.id ? chat.target : chat.user;
                    return (
                        <Link
                            key={chat.id}
                            href={`/profile/chat/${chat.id}`}
                            className="flex items-center gap-3 group">
                            <Avatar className="size-12">
                                <AvatarImage src={otherUser.profile_photo_path!} alt={otherUser.nickname} />
                                <AvatarFallback>{otherUser.nickname}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-sm text-title font-medium group-hover:text-primary transition-all">
                                        {otherUser.nickname}
                                    </h4>
                                    <span className="text-xs text-caption font-normal">
                                        {createdDateConvertor(chat.created_at)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-3">
                                    <p className="text-sm font-normal text-caption line-clamp-1 flex-1">
                                        من یک مرسوله برای ارسال به شهر رشت داشتم. اسناد و مدارک هم هست فقط. شما مشکلی برای سفر ندارید؟
                                    </p>
                                    {chat?.messages_count > 0 && (
                                        <div className="size-5 bg-primary text-xs rounded-full text-white flex items-center justify-center">
                                            {chat.messages_count}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
