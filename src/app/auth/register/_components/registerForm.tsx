"use client"

import { RHFCheckbox } from "@/app/_components/hookForm/RHFCheckbox";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { registerAction, RegisterService } from "../_api/registerAction";

export const RegisterForm = () => {
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<RegisterService | null, FormData>(
        registerAction,
        null
    );

    const registerSchema = z.object({
        first_name: z.string().min(1, tCommon("validation.required.firstName")),
        last_name: z.string().min(1, tCommon("validation.required.lastName")),
        nickname: z.string().min(1, tCommon("validation.required.nickname")),
        email: z.string({ required_error: tCommon("validation.required.email") })
            .email(tCommon("validation.invalid.email")),
        mobile: z.string({ required_error: tCommon("validation.required.mobile") })
            .regex(regex.phone, tCommon("validation.invalid.mobile")),
        password: z.string({ required_error: tCommon("validation.required.password") })
            .min(8, tCommon("validation.invalid.passwordLength")),
        password_confirmation: z.string({ required_error: tCommon("validation.required.passwordConfirmation") }),
        privacy_policy: z.boolean().refine(val => val === true, {
            message: tCommon("validation.required.privacyPolicy")
        }),
    }).refine(data => data.password === data.password_confirmation, {
        message: tCommon("validation.invalid.passwordMatch"),
        path: ["password_confirmation"]
    });

    type RegisterFormData = z.infer<typeof registerSchema>;

    const form = useZodForm(registerSchema, {
        defaultValues: {
            first_name: '',
            last_name: '',
            nickname: '',
            email: '',
            mobile: '',
            password: '',
            password_confirmation: '',
            privacy_policy: false,
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors ? tPage("auth.registerError") : tPage("auth.registerFailed"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof RegisterFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            window.location.href = "/auth/check-verification";
        }
    }, [formState, form]);

    const onSubmit = async (data: RegisterFormData) => {
        form.clearErrors();

        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("password", data.password);
        formData.append("password_confirmation", data.password_confirmation);
        formData.append("privacy_policy", data.privacy_policy.toString());

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="lg:px-9 lg:mt-6">
            <h1 className="text-title text-lg md:text-xl font-medium">
                {tPage("auth.registerTitle")}
            </h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-4 md:gap-3">
                        <RHFInput
                            name="first_name"
                            placeholder={tCommon("inputs.firstName")}
                            type="text"
                        />
                        <RHFInput
                            name="last_name"
                            placeholder={tCommon("inputs.lastName")}
                            type="text"
                        />
                    </div>
                    <RHFInput
                        name="nickname"
                        placeholder={tCommon("inputs.nickname")}
                        type="text"
                    />
                    <RHFInput
                        name="email"
                        placeholder={tCommon("inputs.email")}
                        type="email"
                    />
                    <RHFInput
                        name="mobile"
                        placeholder={tCommon("inputs.mobile")}
                        type="text"
                    />
                    <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-3">
                        <RHFPasswordInput
                            name="password"
                            placeholder={tCommon("inputs.password")}
                        />
                        <RHFPasswordInput
                            name="password_confirmation"
                            placeholder={tCommon("inputs.passwordConfirmation")}
                        />
                    </div>
                    <div className="flex items-start gap-1.5">
                        <RHFCheckbox id="privacy_policy" name="privacy_policy" label={tPage("auth.iHaveRead")} />
                        <Link href="/privacy-policy" className="text-primary text-sm">
                            {tPage("auth.seePrivacy")}
                        </Link>
                    </div>
                    <Button
                        size={"default"}
                        variant={"default"}
                        className="w-full mt-2.5"
                        isLoading={isPending}
                        type="submit">
                        {tPage("auth.register")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}