"use client"

import { formatToShamsi } from "@/lib/dateUtils";
import { cn, createFileUrl } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { TicketInfo } from "@/types/support.type";
import Link from "next/link";
import { MessageForm } from "./messageForm";

interface TicketMessagesProps {
    ticketData: TicketInfo;
    userData: UserData;
}

export const TicketMessages = ({ ticketData, userData }: TicketMessagesProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const lastMessage = ticketData.messages.at(-1);

    return (
        <div className="flex flex-col flex-1 overflow-auto">
            <div className="h-full overflow-y-auto flex flex-col gap-4">
                {ticketData.messages && ticketData.messages.length > 0 ? (
                    <>
                        {ticketData.messages.map((message) => {
                            const isMyMessage = userData.user.id === message.user_id;

                            return (
                                <div
                                    key={message.id}
                                    className={cn(
                                        "flex gap-2.5 max-w-[80%] lg:max-w-[70%]",
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
                                                <p className="leading-relaxed">
                                                    {message.message}
                                                </p>
                                            )}

                                            {message.file && (
                                                <div className="mt-3">
                                                    <Link
                                                        href={createFileUrl(message.file)}
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
                                            "flex items-center gap-2 text-xs text-caption px-1 mt-0.5",
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
                                    {!isMyMessage && (
                                        <Icon icon="solar--user-circle-bold" sizeClass="size-10" className="text-primary" />
                                    )}
                                </div>
                            );
                        })}
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full text-caption">
                        <p>{tPages("profile.support.noMessageSent")}</p>
                    </div>
                )}
                {lastMessage?.user_id !== userData.user.id && (
                    <MessageForm ticketId={ticketData.id.toString()} />
                )}
            </div>
        </div>
    )
}