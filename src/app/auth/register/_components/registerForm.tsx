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

export const RegisterForm = () => {
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const registerSchema = z.object({
        first_name: z.string({ required_error: "وارد کردن نام الزامی است" })
            .min(2, "نام باید حداقل 3 کاراکتر باشد"),
        last_name: z.string({ required_error: "وارد کردن نام خانوادگی الزامی است" })
            .min(2, "نام خانوادگی باید حداقل 3 کاراکتر باشد"),
        nickname: z.string({ required_error: "وارد کردن نام کاربری الزامی است" })
            .min(2, "نام کاربری باید حداقل 3 کاراکتر باشد"),
        email: z.string({ required_error: "وارد کردن ایمیل الزامی است" })
            .email("ایمیل نامعتبر است"),
        mobile: z.string({ required_error: "وارد کردن شماره موبایل الزامی است" })
            .regex(regex.phone, "شماره موبایل معتبر نیست"),
        password: z.string({ required_error: "وارد کردن رمز عبور الزامی است" }),
        password_confirmation: z.string({ required_error: "وارد کردن تکرار رمز عبور الزامی است" }),
        privacy_policy: z.boolean(),
    });

    type RegisterFormData = z.infer<typeof registerSchema>;

    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        console.log(data);
        setIsLoading(false);
    };

    return (
        <div className="lg:px-9 lg:mt-6">
            <h1 className="text-title text-lg md:text-xl font-medium">
                {tPage("auth.registerTitle")}
            </h1>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 flex flex-col gap-4">
                    <div className="flex :flex-row items-start justify-between gap-4 md:gap-3">
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
                    <div className="flex items-center gap-1.5">
                        <RHFCheckbox id="privacy_policy" name="privacy_policy" />
                        <label
                            htmlFor={"privacy_policy"}
                            className="text-sm font-normal text-text"
                        >
                            قوانین و شرایط استفاده از اوشتو را خوانده و آن را می‌پذیرم.
                        </label>
                    </div>
                    <Button
                        size={"default"}
                        variant={"default"}
                        className="w-full mt-3"
                        type="submit">
                        {tPage("auth.register")}
                    </Button>
                </form>
            </FormProvider>
        </div>
    )
}