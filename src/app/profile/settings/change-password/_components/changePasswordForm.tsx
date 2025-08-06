"use client"

import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useGetUser } from "@/hooks/useGetUser";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { UserData } from "@/types/user.type";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { changePasswordAction, ChangePasswordService } from "../_api/changePasswordAction";

export const ChangePasswordForm = () => {
    const { userData } = useGetUser<UserData>();
    const t = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ChangePasswordService | null, FormData>(
        changePasswordAction,
        null
    );

    const changePasswordSchema = z.object({
        current_password: z.string({ required_error: t("validation.required.password") })
            .min(8, t("validation.invalid.passwordLength")),
        password: z.string({ required_error: t("validation.required.password") })
            .regex(regex.password, t("validation.invalid.passwordRequirements")),
        password_confirmation: z.string({ required_error: t("validation.required.passwordConfirmation") }),
    }).refine(data => data.password === data.password_confirmation, {
        message: t("validation.invalid.passwordMatch"),
        path: ["password_confirmation"]
    });

    type ChangePasswordData = z.infer<typeof changePasswordSchema>;

    const form = useZodForm(changePasswordSchema, {
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? t("messages.errorFields")
                : formState?.message || t("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof ChangePasswordData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || t("messages.updated"));
            form.reset();
        }
    }, [formState]);

    const onSubmit = async (data: ChangePasswordData) => {
        const formData = new FormData();
        formData.append("current_password", data.current_password);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("id", userData?.user.id.toString() || "");

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="mt-10 lg:max-w-2xl mx-auto">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="md:flex items-start justify-between gap-5 mb-5">
                        <div className="md:w-1/2 md:pl-2.5">
                            <RHFPasswordInput
                                name="current_password"
                                placeholder={t("inputs.currentPassword")}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5">
                        <RHFPasswordInput
                            name="password"
                            placeholder={t("inputs.newPassword")}
                        />
                        <RHFPasswordInput
                            name="password_confirmation"
                            placeholder={t("inputs.confirmNewPassword")}
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button
                            type="submit"
                            variant="default"
                            className="flex-1 md:flex-initial"
                            size="default"
                            isLoading={isPending}>
                            {t("buttons.saveChanges")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}