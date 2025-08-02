"use client"

import { formatToShamsi } from "@/lib/dateUtils";
import { cn } from "@/lib/utils";
import { ChatMessage } from "@/types/chat.type";
import { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import { useEffect, useRef } from "react";
import { MessageInput } from "./messageInput";

interface ChatMessagesProps {
    otherUserId: number;
    data?: ChatMessage[];
    userData: UserData;
    onRefresh?: () => void;
}

export const ChatMessages = ({ data, userData, otherUserId, onRefresh }: ChatMessagesProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        const container = messagesContainerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [data]);

    return (
        <div className="mt-3 bg-light rounded-2xl lg:rounded-3xl p-4 flex flex-col flex-1 overflow-auto">
            <div ref={messagesContainerRef} className="h-full overflow-y-auto flex flex-col gap-4 p-2">
                {data && data.length > 0 ? (
                    <>
                        {data.reverse().map((message) => {
                            const isMyMessage = userData.user.id === message.user_id;

                            return (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-3 max-w-[80%]",
                                        isMyMessage ? "self-start flex-row-reverse" : "self-end"
                                    )}
                                >

                                    {/* Message Content */}
                                    <div className="flex flex-col gap-1">
                                        <div
                                            className={cn(
                                                "px-4 py-3 rounded-2xl max-w-full text-title break-words",
                                                isMyMessage
                                                    ? "bg-border rounded-tr-sm"
                                                    : "bg-white rounded-tl-sm"
                                            )}
                                        >
                                            <p className="text-sm leading-relaxed">
                                                {message.message}
                                            </p>

                                            {message.file && (
                                                <div className="mt-2 flex items-center gap-2">
                                                    <Icon
                                                        icon="solar--paperclip-linear"
                                                        sizeClass="size-4"
                                                        className={isMyMessage ? "text-white/80" : "text-caption"}
                                                    />
                                                    <span className={cn(
                                                        "text-xs underline cursor-pointer",
                                                        isMyMessage ? "text-white/80" : "text-caption"
                                                    )}>
                                                        فایل ضمیمه
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Message timestamp and status */}
                                        <div className={cn(
                                            "flex items-center gap-2 text-xs text-caption px-1",
                                            isMyMessage ? "justify-end" : "justify-start"
                                        )}>
                                            <span>
                                                {formatToShamsi(new Date(message.created_at))}
                                            </span>

                                            {/* Message status for my messages */}
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
                        <p>هنوز پیامی ارسال نشده است</p>
                    </div>
                )}
            </div>

            {/* Message Input */}
            <MessageInput
                otherUserId={otherUserId}
                onMessageSent={onRefresh}
            />
        </div>
    )
}