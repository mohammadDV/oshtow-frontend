"use client"

import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFDatePicker } from "@/app/_components/hookForm/RHFDatePicker";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { apiUrls } from "@/constants/apiUrls";
import { regex } from "@/constants/regex";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { cn } from "@/lib/utils";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import { useState, useEffect, useActionState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { identityAction, IdentityService } from "../_api/identityAction";
import useLocalStorage from "@/hooks/useLocalStorage";
import { StatusCode } from "@/constants/enums";

export const AuthForm = () => {
    const tCommon = useCommonTranslation();
    const tPage = usePagesTranslation();
    const [step, setStep] = useState<"first" | "second">("first");
    const [isPending, startTransition] = useTransition();
    const [completedSteps, setCompletedSteps] = useLocalStorage("auth-form-completed-steps", []);
    const [savedFormData, setSavedFormData] = useLocalStorage("auth-form-data", {});
    const [formState, formAction] = useActionState<IdentityService | null, FormData>(
        identityAction,
        null
    );

    const { response: countriesResponse } = useFetchData<Country[]>(apiUrls.locations.countries);

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

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

    const firstStepSchema = z.object({
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
    });

    const secondStepSchema = z.object({
        image_national_code_front: z.string().optional(),
        image_national_code_back: z.string().optional(),
        video: z.string().optional(),
    });

    const completeAuthSchema = firstStepSchema.merge(z.object({
        image_national_code_front: z.string().min(1, tCommon("validation.required.thisField")),
        image_national_code_back: z.string().min(1, tCommon("validation.required.thisField")),
        video: z.string().min(1, tCommon("validation.required.thisField")),
    }));

    type AuthFormData = z.infer<typeof completeAuthSchema>;

    const formSchema = firstStepSchema.merge(secondStepSchema);
    const form = useZodForm(formSchema, {
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
            video: '',
        },
    });

    useEffect(() => {
        if (savedFormData && Object.keys(savedFormData).length > 0) {
            form.reset({
                fullname: savedFormData.fullname || '',
                national_code: savedFormData.national_code || '',
                mobile: savedFormData.mobile || '',
                email: savedFormData.email || '',
                birthday: savedFormData.birthday || '',
                country: savedFormData.country || '',
                postal_code: savedFormData.postal_code || '',
                address: savedFormData.address || '',
                image_national_code_front: savedFormData.image_national_code_front || '',
                image_national_code_back: savedFormData.image_national_code_back || '',
                video: savedFormData.video || '',
            }, {
                keepErrors: true,
                keepDirty: true,
                keepIsSubmitted: false,
                keepTouched: false,
                keepIsValid: false,
                keepSubmitCount: false
            });
        }
    }, [savedFormData, form]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? tCommon("messages.errorFields")
                : formState?.message || tCommon("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof AuthFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.success"));
            setCompletedSteps((prev: any) => [...prev, "second"]);
            setSavedFormData({});
        }
    }, [formState, form]);

    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name && form.formState.errors[name]) {
                form.clearErrors(name);
            }

            if (form.formState.isDirty) {
                setSavedFormData(value);
            }
        });
        return () => subscription.unsubscribe();
    }, [form, setSavedFormData]);

    const validateFirstStep = async () => {
        const firstStepFields = [
            'fullname', 'national_code', 'mobile', 'email',
            'birthday', 'country', 'postal_code', 'address'
        ] as (keyof AuthFormData)[];

        const isValid = await form.trigger(firstStepFields);
        return isValid;
    };

    const validateSecondStep = async () => {
        const secondStepFields = [
            'image_national_code_front', 'image_national_code_back', 'video'
        ] as (keyof AuthFormData)[];

        const formData = form.getValues();
        const result = completeAuthSchema.safeParse(formData);

        if (!result.success) {
            const errors = result.error.flatten().fieldErrors;
            secondStepFields.forEach(field => {
                if (errors[field]) {
                    form.setError(field, {
                        type: 'manual',
                        message: errors[field]?.[0] || 'This field is required'
                    });
                }
            });
            return false;
        }

        return true;
    };

    const handleNextStep = async () => {
        const isValid = await validateFirstStep();
        if (isValid) {
            setStep("second");
            if (!completedSteps.includes("first")) {
                setCompletedSteps([...completedSteps, "first"]);
            }
        }
    };

    const handlePrevStep = () => {
        setStep("first");
    };

    const onSubmit = async (data: any) => {
        if (step === "first") {
            await handleNextStep();
            return;
        }

        const isSecondStepValid = await validateSecondStep();
        if (!isSecondStepValid) {
            return;
        }

        form.clearErrors();

        const formData = new FormData();
        formData.append("fullname", data.fullname);
        formData.append("national_code", data.national_code);
        formData.append("mobile", data.mobile);
        formData.append("birthday", data.birthday);
        formData.append("email", data.email);
        formData.append("country", data.country);
        formData.append("postal_code", data.postal_code);
        formData.append("address", data.address);
        formData.append("image_national_code_front", data.image_national_code_front);
        formData.append("image_national_code_back", data.image_national_code_back);
        formData.append("video", data.video);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    const renderFirstStep = () => (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5">
                <RHFInput
                    name="fullname"
                    placeholder={tCommon("inputs.fullname")}
                />
                <RHFInput
                    name="national_code"
                    placeholder={tCommon("inputs.nationalCode")}
                />
            </div>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5">
                <RHFInput
                    name="mobile"
                    placeholder={tCommon("inputs.mobile")}
                />
                <RHFInput
                    name="email"
                    placeholder={tCommon("inputs.email")}
                />
            </div>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5">
                <RHFDatePicker
                    name="birthday"
                    placeholder={tCommon("inputs.birthday")}
                />
                <RHFCombobox
                    options={countryOptions}
                    name="country"
                    placeholder={tCommon("inputs.country")}
                />
            </div>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5 lg:w-1/2 md:pl-2.5">
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
        </div>
    );

    const renderSecondStep = () => (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-5">
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
                <p className="text-sm text-caption mt-2.5">
                    {tPage("profile.auth.videoDescription")}
                </p>
            </div>
        </div>
    );

    return (
        <div className="mt-4 lg:mt-8 lg:max-w-2xl mx-auto">
            <div className="hidden lg:flex items-center justify-between gap-5 mb-7">
                {stepsData.map((stepData, index) => (
                    <div
                        key={stepData.value}
                        className={cn("p-3 bg-light rounded-lg flex-1 flex items-center gap-1.5",
                            stepData.value === step && "border border-sub"
                        )}>
                        <div className={cn("size-6 rounded-full flex items-center justify-center",
                            completedSteps.includes(stepData.value) ? "bg-teal-400 text-white" :
                                stepData.value === step ? "bg-primary text-white" : "bg-white text-caption"
                        )}>
                            {completedSteps.includes(stepData.value) ? "✓" : index + 1}
                        </div>
                        <div>
                            <span className={cn("font-medium inline-block ml-1",
                                completedSteps.includes(stepData.value) ? "text-teal-400" :
                                    stepData.value === step ? "text-primary" : "text-caption")}>
                                {stepData.title}
                            </span>
                            <span className="font-normal text-sm text-caption inline-block">
                                {stepData.content}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            <div
                className={cn("flex lg:hidden p-3 bg-light rounded-xl flex-1 items-center gap-2 mb-6",
                    step === "first" && "border border-sub"
                )}>
                <div className={cn("size-10 rounded-full flex text-white items-center justify-center",
                    completedSteps.includes(step) ? "bg-teal-400" : "bg-primary"
                )}>
                    {completedSteps.includes(step) ? "✓" : step === "first" ? 1 : 2}
                </div>
                <div>
                    <div>
                        <span className={cn("inline-block ml-1",
                            completedSteps.includes(step) ? "text-teal-400" :
                                step === "first" ? "text-primary font-semibold" : "text-caption")}>
                            {stepsData[0].title}
                        </span>
                        <span className="font-normal text-xs text-caption inline-block">
                            {stepsData[0].content}
                        </span>
                    </div>
                    <div>
                        <span className={cn("inline-block ml-1 mt-1",
                            completedSteps.includes(step) ? "text-teal-400" :
                                step === "second" ? "text-primary font-semibold" : "text-caption")}>
                            {stepsData[1].title}
                        </span>
                        <span className="font-normal text-xs text-caption inline-block">
                            {stepsData[1].content}
                        </span>
                    </div>
                </div>
            </div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    {step === "first" ? renderFirstStep() : renderSecondStep()}

                    <div className="flex justify-between mt-6 gap-3">
                        {step === "second" && (
                            <Button
                                type="button"
                                variant="outline"
                                className="md:flex-initial flex-1"
                                onClick={handlePrevStep}
                            >
                                {tCommon("buttons.prevStep")}
                            </Button>
                        )}
                        <div className="md:flex hidden flex-1" />
                        <Button
                            type="submit"
                            variant="default"
                            size="default"
                            className="md:flex-initial flex-1"
                            isLoading={isPending}
                        >
                            {step === "first" ? tCommon("buttons.nextStep") : tCommon("buttons.sendInformation")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}