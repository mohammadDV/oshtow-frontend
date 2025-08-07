"use client"

import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { resetPasswordAction, ResetPasswordService } from "../_api/resetPasswordAction";
import { useRouter } from "next/navigation";

interface ResetPasswordFormProps {
    email: string;
    token: string;
}

export const ResetPasswordForm = ({ email, token }: ResetPasswordFormProps) => {
    const router = useRouter();
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ResetPasswordService | null, FormData>(
        resetPasswordAction,
        null
    );

    const resetPasswordSchema = z.object({
        password: z.string({ required_error: tCommon("validation.required.password") })
            .regex(regex.password, tCommon("validation.invalid.passwordRequirements")),
        password_confirmation: z.string({ required_error: tCommon("validation.required.passwordConfirmation") }),
    }).refine(data => data.password === data.password_confirmation, {
        message: tCommon("validation.invalid.passwordMatch"),
        path: ["password_confirmation"]
    });

    type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

    const form = useZodForm(resetPasswordSchema, {
        defaultValues: {
            password: '',
            password_confirmation: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPage("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ResetPasswordFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tPage("messages.success"));
            router.push("/auth/login")
        }
    }, [formState]);

    const onSubmit = async (data: ResetPasswordFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", email);
        formData.append("token", token);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="lg:px-9 lg:mt-8">
            <h1 className="text-title text-lg md:text-xl font-medium">
                {tPage("auth.chooseNewPassword")}
            </h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
                    <RHFPasswordInput
                        name="password"
                        placeholder={tCommon("inputs.newPassword")}
                    />
                    <RHFPasswordInput
                        name="password_confirmation"
                        placeholder={tCommon("inputs.confirmNewPassword")}
                    />
                    <Button
                        size={"default"}
                        variant={"default"}
                        isLoading={isPending}
                        className="w-full mt-3"
                        type="submit">
                        {tPage("auth.resetPassword")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};