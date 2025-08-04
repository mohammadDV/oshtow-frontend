"use client"

import { formatToShamsi } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { ChatMessage, ChatsMessagesResponse } from "@/types/chat.type";
import { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import { useEffect, useRef, useState, useCallback } from "react";
import { MessageInput } from "./messageInput";
import { getChat } from "../../_api/getChat";
import { toast } from "sonner";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import Link from "next/link";

interface ChatMessagesProps {
    otherUserId: number;
    initialData?: ChatsMessagesResponse;
    userData: UserData;
    chatId: string;
}

export const ChatMessages = ({ initialData, userData, otherUserId, chatId }: ChatMessagesProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [messages, setMessages] = useState<ChatMessage[]>(initialData?.data ? [...initialData.data].reverse() : []);
    const [currentPage, setCurrentPage] = useState(initialData?.current_page || 1);
    const [hasMoreMessages, setHasMoreMessages] = useState(
        initialData ? initialData.current_page < initialData.last_page : false
    );
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        if (shouldScrollToBottom) {
            const container = messagesContainerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }
    }, [shouldScrollToBottom]);

    const loadMoreMessages = useCallback(async () => {
        if (isLoadingMore || !hasMoreMessages) return;

        setIsLoadingMore(true);
        const nextPage = currentPage + 1;

        try {
            const response = await getChat({
                id: chatId,
                page: nextPage,
                count: 15
            });

            if (response.data && response.data.length > 0) {
                setMessages(prev => [...response.data.reverse(), ...prev]);
                setCurrentPage(nextPage);
                setHasMoreMessages(nextPage < response.last_page);
                setShouldScrollToBottom(false);
            } else {
                setHasMoreMessages(false);
            }
        } catch (error) {
            toast.error(tCommon("messages.error"));
        } finally {
            setIsLoadingMore(false);
        }
    }, [isLoadingMore, hasMoreMessages, currentPage, chatId]);

    const handleScroll = useCallback(() => {
        const container = messagesContainerRef.current;
        if (!container) return;

        if (container.scrollTop === 0 && hasMoreMessages && !isLoadingMore) {
            loadMoreMessages();
        }

        const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
        setShouldScrollToBottom(isNearBottom);
    }, [hasMoreMessages, isLoadingMore, loadMoreMessages]);

    const addNewMessage = useCallback((newMessage: ChatMessage) => {
        setMessages(prev => [...prev, newMessage]);
        setShouldScrollToBottom(true);
    }, []);

    const handleMessageSent = useCallback((newMessage?: ChatMessage) => {
        if (newMessage) {
            addNewMessage(newMessage);
        }
        setShouldScrollToBottom(true);
    }, [addNewMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    useEffect(() => {
        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, [handleScroll]);

    return (
        <div className="mt-3 bg-light rounded-2xl lg:rounded-3xl p-4 flex flex-col flex-1 overflow-auto">
            <div ref={messagesContainerRef} className="h-full overflow-y-auto flex flex-col gap-4 p-2">
                {hasMoreMessages && (
                    <div ref={loadingRef} className="flex justify-center py-2">
                        {isLoadingMore ? (
                            <div className="flex items-center gap-2 text-caption">
                                <Icon icon="solar--loading-outline" sizeClass="size-4" className="animate-spin" />
                                <span className="text-sm">{tPages("profile.chat.loadingPrevMessages")}</span>
                            </div>
                        ) : (
                            <button
                                onClick={loadMoreMessages}
                                className="text-primary text-sm hover:text-primary/80 transition-colors"
                            >
                                {tPages("profile.chat.loadPrevMessages")}
                            </button>
                        )}
                    </div>
                )}

                {messages && messages.length > 0 ? (
                    <>
                        {messages.map((message) => {
                            const isMyMessage = userData.user.id === message.user_id;

                            return (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        isMyMessage ? "self-start flex-row-reverse" : "self-end"
                                    )}
                                >
                                    <div className="flex flex-col gap-1">
                                        <div
                                            className={cn(
                                                "px-4 py-3 rounded-2xl max-w-full text-title break-words",
                                                isMyMessage
                                                    ? "bg-border rounded-tr-sm"
                                                    : "bg-white rounded-tl-sm"
                                            )}
                                        >
                                            {message.message && (
                                                <p className="text-sm leading-relaxed">
                                                    {message.message}
                                                </p>
                                            )}

                                            {message.file && (
                                                <div className="mt-3">
                                                    <Link
                                                        href={message.file}
                                                        target="_blank"
                                                        className="flex items-center gap-1.5">
                                                        <Icon
                                                            icon="solar--paperclip-linear"
                                                            sizeClass="size-4"
                                                            className="text-primary"
                                                        />
                                                        <span className="underline text-sm text-primary">
                                                            {tCommon("buttons.downloadFile")}
                                                        </span>
                                                    </Link>
                                                </div>
                                            )}
                                        </div>

                                        <div className={cn(
                                            "flex items-center gap-2 text-xs text-caption px-1",
                                            isMyMessage ? "justify-start" : "justify-end"
                                        )}>
                                            <span>
                                                {formatToShamsi(new Date(message.created_at))}
                                            </span>

                                            {isMyMessage && (
                                                <Icon
                                                    icon={message.status === 'read' ? "solar--check-read-outline" : "solar--check-outline"}
                                                    sizeClass="size-3"
                                                    className={message.status === 'read' ? "text-green-500" : "text-caption"}
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-caption">
                        <p>{tPages("profile.chat.noMessageSent")}</p>
                    </div>
                )}
            </div>

            <MessageInput
                otherUserId={otherUserId}
                onMessageSent={handleMessageSent}
                chatId={chatId}
                userData={userData}
            />
        </div>
    )
}