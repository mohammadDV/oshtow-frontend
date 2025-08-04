"use client"

import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { sendMessageAction, SendMessageResponse } from "../_api/sendMessageAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MessageFormProps {
    ticketId: string;
}

export const MessageForm = ({ ticketId }: MessageFormProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<SendMessageResponse | null, FormData>(
        sendMessageAction,
        null
    );

    const messageSchema = z.object({
        message: z.string().min(1, tCommon("validation.required.thisField")),
        file: z.string().optional()
    });

    type MessageFormData = z.infer<typeof messageSchema>;

    const form = useZodForm(messageSchema, {
        defaultValues: {
            message: '',
            file: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.success"));
            form.reset();
            router.refresh();
        }
    }, [formState]);

    const onSubmit = async (data: MessageFormData) => {
        const formData = new FormData();
        formData.append("ticketId", ticketId);
        formData.append("message", data.message);
        if (data.file) {
            formData.append("file", data.file);
        }

        startTransition(async () => {
            await formAction(formData);
        });
    }

    return (
        <div className="bg-white p-5 rounded-2xl rounded-tr-none border border-border lg:w-lg">
            <p className="text-lg text-title font-medium mb-4">
                {tPages("profile.support.yourAnswer")}
            </p>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <RHFTextarea
                            name="message"
                            placeholder={tCommon("inputs.writeMessage")}
                        />
                        <RHFUpload
                            uploadType="file"
                            name="file"
                            placeholder={tCommon("inputs.ticketFile")}
                        />
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <Button
                            variant={"default"}
                            type="submit"
                            className="flex-1 md:flex-initial"
                            isLoading={isPending}>
                            {tCommon("buttons.sendMessage")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}