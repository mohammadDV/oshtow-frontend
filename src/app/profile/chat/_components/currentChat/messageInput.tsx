"use client";

import { useState, useRef, useEffect, useTransition, useActionState } from "react";
import { Icon } from "@/ui/icon";
import { Button } from "@/ui/button";
import { useZodForm } from "@/hooks/useZodForm";
import { z } from "zod";
import { toast } from "sonner";
import { StatusCode } from "@/constants/enums";
import { sendMessageAction } from "../../_api/sendMessageAction";
import { ChatMessage } from "@/types/chat.type";
import { UserData } from "@/types/user.type";
import { cn } from "@/lib/utils";
import { useCommonTranslation } from "@/hooks/useTranslation";

interface MessageInputProps {
    otherUserId: number;
    onMessageSent?: (newMessage?: ChatMessage) => void;
    userData: UserData;
    chatId: string;
}

export const MessageInput = ({ otherUserId, onMessageSent, chatId, userData }: MessageInputProps) => {
    const t = useCommonTranslation();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const [isPending, startTransition] = useTransition();

    const messageSchema = z.object({
        message: z.string().optional(),
        file: z.instanceof(File).optional(),
    }).refine(
        (data) => data.message || data.file,
        {
            message: "Either message or file is required",
            path: ["message"],
        }
    );

    const [formState, formAction] = useActionState(
        sendMessageAction.bind(null, otherUserId),
        null
    );

    const form = useZodForm(messageSchema, {
        defaultValues: {
            message: "",
            file: undefined
        }
    });

    const messageValue = form.watch("message");
    const isDisabled = !messageValue?.trim() && !selectedFile;

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || t("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            form.reset();
            setSelectedFile(null);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            if (formRef.current) {
                formRef.current.reset();
            }

            const optimisticMessage: ChatMessage = {
                id: Date.now(),
                chat_id: parseFloat(chatId),
                user_id: userData.user.id,
                status: "pending",
                message: messageValue?.trim() || "",
                remover_id: null,
                file: selectedFile ? URL.createObjectURL(selectedFile) : null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            onMessageSent?.(optimisticMessage);
        }
    }, [formState]);

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            form.setValue("file", file);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        form.setValue("file", undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onSubmit = (data: any) => {
        if (isDisabled || isPending) return;

        const formData = new FormData();

        if (messageValue?.trim()) {
            formData.append("message", messageValue.trim());
        }

        if (selectedFile) {
            formData.append("file", selectedFile);
        }

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {selectedFile && (
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Icon
                            icon="solar--document-outline"
                            sizeClass="size-4"
                            className="text-primary"
                        />
                        <span className="text-sm text-title truncate max-w-[200px]">
                            {selectedFile.name}
                        </span>
                        <span className="text-xs text-caption">
                            ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="h-auto p-1 text-red-500 hover:text-red-700"
                    >
                        <Icon icon="solar--close-circle-outline" sizeClass="size-4" />
                    </Button>
                </div>
            )}

            <div className="bg-white rounded-full border border-border flex items-center justify-between px-5 py-3.5">
                <input
                    {...form.register("message")}
                    placeholder={t("inputs.writeMessage")}
                    type="text"
                    className="outline-none flex-1 text-title"
                />

                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                />

                <div className="flex items-center justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="text-caption cursor-pointer hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Icon
                            icon="solar--paperclip-linear"
                            sizeClass="size-5"
                        />
                    </button>

                    <button
                        type="submit"
                        disabled={isDisabled}
                        className={cn("transition-colors",
                            isDisabled
                                ? "text-caption cursor-not-allowed"
                                : "text-primary cursor-pointer hover:text-primary/80"
                        )}
                    >
                        <Icon
                            icon={"solar--plain-outline"}
                            className={cn("-rotate-90",
                                isPending ? "animate-pulse opacity-70" : ""
                            )}
                            sizeClass="size-5"
                        />
                    </button>
                </div>
            </div>
        </form>
    );
}