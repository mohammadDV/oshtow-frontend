"use client"

import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { FormProvider } from "react-hook-form";
import z from "zod";

export const ChangePasswordForm = () => {
    const t = useCommonTranslation();

    const changePasswordSchema = z.object({
        current_password: z.string({ required_error: t("validation.required.password") })
            .min(8, t("validation.invalid.passwordLength")),
        new_password: z.string({ required_error: t("validation.required.password") })
            .min(8, t("validation.invalid.passwordLength")),
        confirm_new_password: z.string({ required_error: t("validation.required.password") })
            .min(8, t("validation.invalid.passwordLength")),
    });

    type ChangePasswordData = z.infer<typeof changePasswordSchema>;

    const form = useZodForm(changePasswordSchema, {
        defaultValues: {
            current_password: '',
            new_password: '',
            confirm_new_password: '',
        }
    });

    const onSubmit = async (data: ChangePasswordData) => {
        console.log(data)
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
                            name="new_password"
                            placeholder={t("inputs.newPassword")}
                        />
                        <RHFPasswordInput
                            name="confirm_new_password"
                            placeholder={t("inputs.confirmNewPassword")}
                        />
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button
                            type="submit"
                            variant={"default"}
                            className="flex-1 md:flex-initial"
                            size={"default"}>
                            {t("buttons.saveChanges")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}