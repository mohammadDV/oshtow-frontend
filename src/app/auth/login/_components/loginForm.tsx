"use client"

import { z } from "zod";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { regex } from "@/constants/regex";
import { useState } from "react";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFPasswordInput } from "@/app/_components/hookForm/RHFPasswordInput";
import { RHFCheckbox } from "@/app/_components/hookForm/RHFCheckbox";
import { Button } from "@/ui/button";
import Link from "next/link";

export const LoginForm = () => {
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const loginSchema = z.object({
        email: z.string({ required_error: "وارد کردن ایمیل الزامی است" })
            .email("ایمیل نامعتبر است"),
        password: z.string({ required_error: "وارد کردن رمز عبور الزامی است" }),
    });

    type LoginFormData = z.infer<typeof loginSchema>;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useZodForm(loginSchema, {
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        console.log(data);
        setIsLoading(false);
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
                        className="w-full mt-3"
                        type="submit">
                        {tPage("auth.login")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}