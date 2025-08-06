"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { StatusCode } from "@/constants/enums";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { forgotPasswordAction, ForgotPasswordService } from "../_api/forgotPasswordAction";

export const ForgotPasswordForm = () => {
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [isSuccess, setIsSuccess] = useState(false);
    const [formState, formAction] = useActionState<ForgotPasswordService | null, FormData>(
        forgotPasswordAction,
        null
    );

    const forgotPasswordSchema = z.object({
        email: z.string({ required_error: tCommon("validation.required.email") })
            .email(tCommon("validation.invalid.email")),
    });

    type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

    const form = useZodForm(forgotPasswordSchema, {
        defaultValues: {
            email: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPage("auth.loginFailed"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ForgotPasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            setIsSuccess(true);
        }
    }, [formState, form]);

    const onSubmit = async (data: ForgotPasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    if (isSuccess) {
        return (
            <div className="lg:px-9 lg:mt-8 text-center mb-8">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                        <Icon icon="solar--check-circle-bold" sizeClass="size-8" className="text-green-600" />
                    </div>
                    <h1 className="text-title text-lg md:text-xl font-medium">
                        {tPage("auth.resetLinkSent")}
                    </h1>
                    <p className="text-caption text-sm max-w-md">
                        {tPage("auth.resetLinkSentDescription")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:px-9 lg:mt-8">
            <h1 className="text-title text-lg md:text-xl font-medium">
                {tPage("auth.forgotPasswordTitle")}
            </h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
                    <RHFInput
                        name="email"
                        placeholder={tCommon("inputs.email")}
                        type="email"
                    />
                    <Button
                        size={"default"}
                        variant={"default"}
                        isLoading={isPending}
                        className="w-full mt-3"
                        type="submit">
                        {tPage("auth.sendResetLink")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}