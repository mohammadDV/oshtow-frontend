"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { loginAction, LoginService } from "../_api/loginAction";

export const LoginForm = () => {
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<LoginService | null, FormData>(
        loginAction,
        null
    );

    const loginSchema = z.object({
        email: z.string({ required_error: tCommon("validation.required.email") })
            .email(tCommon("validation.invalid.email")),
        password: z.string({ required_error: tCommon("validation.required.password") })
            .min(8, tCommon("validation.invalid.passwordLength")),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const form = useZodForm(loginSchema, {
        defaultValues: {
            email: '',
            password: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPage("auth.loginFailed"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof LoginFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/profile";
        }
    }, [formState, form]);

    const onSubmit = async (data: LoginFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="lg:px-9 lg:mt-8">
            <h1 className="text-title text-lg md:text-xl font-medium">
                {tPage("auth.loginTitle")}
            </h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
                    <RHFInput
                        name="email"
                        placeholder={tCommon("inputs.email")}
                        type="email"
                    />
                    <RHFPasswordInput
                        name="password"
                        placeholder={tCommon("inputs.password")}
                    />
                    <div className="flex items-center gap-0.5 mt-1">
                        <p className="text-sm font-normal text-caption">{tPage("auth.forgotPassword")}</p>
                        <Link href={'/auth/register'}
                            className="text-sm font-normal text-primary">
                            {tPage("auth.resetPassword")}
                        </Link>
                    </div>
                    <Button
                        size={"default"}
                        variant={"default"}
                        isLoading={isPending}
                        className="w-full mt-3"
                        type="submit">
                        {tPage("auth.login")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}