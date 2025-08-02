"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { createdDateConvertor } from "@/lib/dateUtils";
import { ChatInfo } from "@/types/chat.type";
import { UserData } from "@/types/user.type"
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Icon } from "@/ui/icon";
import { Input } from "@/ui/input";
import Link from "next/link";
import { useState, useMemo } from "react";

interface InboxListProps {
    userData?: UserData;
    chatsData?: ChatInfo[];
}

export const InboxList = ({ userData, chatsData }: InboxListProps) => {
    const t = useCommonTranslation();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredChats = useMemo(() => {
        if (!chatsData || !searchTerm.trim()) {
            return chatsData || [];
        }

        return chatsData.filter(chat => {
            const otherUser = chat.user.id === userData?.user.id ? chat.target : chat.user;
            return otherUser.nickname.toLowerCase().includes(searchTerm.toLowerCase());
        });
    }, [chatsData, searchTerm, userData?.user.id]);

    return (
        <div className="flex flex-col gap-6">
            <div className="relative">
                <Input 
                    type="text" 
                    placeholder={t("inputs.searchUser")} 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Icon
                    icon="solar--magnifer-outline"
                    sizeClass="size-5"
                    className="text-caption absolute top-3 left-3" />
            </div>
            <div className="flex flex-col gap-5 overflow-auto">
                {filteredChats.length > 0 ? (
                    filteredChats.map(chat => {
                        const otherUser = chat.user.id === userData?.user.id ? chat.target : chat.user;
                        return (
                            <Link
                                key={chat.id}
                                href={`/profile/chat?chatId=${chat.id}`}
                                className="flex items-center gap-3 group">
                                <Avatar className="size-12">
                                    <AvatarImage src={otherUser.profile_photo_path!} alt={otherUser.nickname} />
                                    <AvatarFallback>{otherUser.nickname}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col gap-1 w-full">
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
                                            {chat?.last_message?.message}
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
                    })
                ) : (
                    <div className="flex items-center justify-center py-8 text-caption">
                        <p className="text-sm">
                            {t("inputs.noResults")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
