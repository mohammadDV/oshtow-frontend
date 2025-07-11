"use client"

import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFDatePicker } from "@/app/_components/hookForm/RHFDatePicker";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { regex } from "@/constants/regex";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { useState } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";

export const AuthForm = () => {
    const tCommon = useCommonTranslation();
    const tPage = usePagesTranslation();
    const [step, setStep] = useState<"first" | "second">("first");

    const stepsData = [
        {
            value: "first",
            title: tPage("profile.auth.firstStep"),
            content: tPage("profile.auth.firstStepContent"),
        },
        {
            value: "second",
            title: tPage("profile.auth.secondStep"),
            content: tPage("profile.auth.secondStepContent"),
        },
    ]

    const authSchema = z.object({
        fullname: z.string().min(1, tCommon("validation.required.thisField")),
        national_code: z.string().min(1, tCommon("validation.required.thisField"))
            .regex(regex.nationalCode, tCommon("validation.invalid.nationalCode")),
        mobile: z.string({ required_error: tCommon("validation.required.mobile") })
            .regex(regex.phone, tCommon("validation.invalid.mobile")),
        birthday: z.string().min(1, tCommon("validation.required.thisField")),
        email: z.string({ required_error: tCommon("validation.required.email") })
            .email(tCommon("validation.invalid.email")),
        country: z.string().min(1, tCommon("validation.required.thisField")),
        postal_code: z.string({ required_error: tCommon("validation.required.thisField") })
            .regex(regex.postalCode, tCommon("validation.invalid.postalCode")),
        address: z.string().min(1, tCommon("validation.required.thisField")),
        image_national_code_front: z.string().min(1, tCommon("validation.required.thisField")),
        image_national_code_back: z.string().min(1, tCommon("validation.required.thisField")),
        video: z.string().min(1, tCommon("validation.required.thisField")),
    });

    type ChangePasswordData = z.infer<typeof authSchema>;

    const form = useZodForm(authSchema, {
        defaultValues: {
            fullname: '',
            national_code: '',
            mobile: '',
            email: '',
            birthday: '',
            country: '',
            postal_code: '',
            address: '',
            image_national_code_front: '',
            image_national_code_back: '',
            video: ''
        }
    });

    const onSubmit = async (data: ChangePasswordData) => {
        console.log(data)
    };

    return (
        <div className="mt-8 lg:max-w-2xl mx-auto">
            <div className="flex items-center justify-between gap-5 mb-7">
                {stepsData.map((stepData, index) => (
                    <div
                        key={stepData.value}
                        className={cn("p-3 bg-light rounded-lg flex-1 flex items-center gap-1.5",
                            stepData.value === step && "border border-sub"
                        )}>
                        <div className={cn("size-6 rounded-full flex items-center justify-center",
                            stepData.value === step ? "bg-primary text-white" : "bg-white text-caption"
                        )}>
                            {index + 1}
                        </div>
                        <div>
                            <span className={cn("font-medium inline-block ml-1", stepData.value === step ? "text-primary" : "text-caption")}>
                                {stepData.title}
                            </span>
                            <span className="font-normal text-sm text-caption inline-block">
                                {stepData.content}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">
                        <div className="flex items-start justify-between gap-5">
                            <RHFInput
                                name="fullname"
                                placeholder={tCommon("inputs.fullname")}
                            />
                            <RHFInput
                                name="national_code"
                                placeholder={tCommon("inputs.nationalCode")}
                            />
                        </div>
                        <div className="flex items-start justify-between gap-5">
                            <RHFInput
                                name="mobile"
                                placeholder={tCommon("inputs.mobile")}
                            />
                            <RHFInput
                                name="email"
                                placeholder={tCommon("inputs.email")}
                            />
                        </div>
                        <div className="flex items-start justify-between gap-5">
                            <RHFDatePicker
                                name="birthday"
                                placeholder={tCommon("inputs.birthday")}
                            />
                            <RHFCombobox
                                options={[]}
                                name="country"
                                placeholder={tCommon("inputs.country")}
                            />
                        </div>
                        <div className="flex items-start justify-between gap-5 lg:w-1/2 pl-2.5">
                            <RHFInput
                                name="postal_code"
                                placeholder={tCommon("inputs.postalCode")}
                            />
                        </div>
                        <div>
                            <RHFTextarea
                                name="address"
                                placeholder={tCommon("inputs.address")}
                            />
                        </div>
                        <div className="flex items-start justify-between gap-5">
                            <RHFUpload
                                uploadType="image"
                                name="image_national_code_front"
                                placeholder={tCommon("inputs.imageNationalCodeFront")}
                            />
                            <RHFUpload
                                uploadType="image"
                                name="image_national_code_back"
                                placeholder={tCommon("inputs.imageNationalCodeBack")}
                            />
                        </div>
                        <div>
                            <RHFUpload
                                uploadType="video"
                                name="video"
                                placeholder={tCommon("inputs.video")}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-6">
                        <Button
                            type="submit"
                            variant={"default"}
                            size={"default"}>
                            ارسال اطلاعات
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}