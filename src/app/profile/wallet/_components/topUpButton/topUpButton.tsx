"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { topUpAction, TopUpResponse } from "../../_api/topUpAction";
import { manualPaymentAction, ManualPaymentResponse } from "../../../settings/auth/_api/manualPaymentAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { RHFCurrency } from "@/app/_components/hookForm/RHFCurrency";
import { putCommas } from "@/lib/utils";
import { UserData } from "@/types/user.type";

interface TopUpButtonProps {
    userData: UserData;
}

export const TopUpButton = ({ userData }: TopUpButtonProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("gateway");
    const [isPending, startTransition] = useTransition();
    const [gatewayPending, startGatewayTransition] = useTransition();
    const [formState, formAction] = useActionState<TopUpResponse | null, FormData>(
        topUpAction,
        null
    );
    const [manualFormState, manualFormAction] = useActionState<ManualPaymentResponse | null, FormData>(
        manualPaymentAction,
        null
    );

    const getValidationSchema = (method: string) => {
        const baseSchema = {
            amount: z.string({
                required_error: tCommon("validation.required.thisField")
            })
                .min(1, tCommon("validation.required.thisField"))
                .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                    message: tCommon("validation.invalid.amount")
                })
        };

        if (method === "manual") {
            return z.object({
                ...baseSchema,
                image: z.string().min(1, tCommon("validation.required.thisField")),
            });
        }
        return z.object({
            ...baseSchema,
            image: z.string().optional(),
        });
    };

    const [validationSchema, setValidationSchema] = useState(() => getValidationSchema(paymentMethod));

    type TopUpFormData = z.infer<typeof validationSchema>;

    const form = useZodForm(validationSchema, {
        defaultValues: {
            amount: '',
            image: '',
        }
    });

    const watchedAmount = form.watch("amount");
    const numericAmount = watchedAmount ? parseFloat(watchedAmount.replace(/,/g, '')) : 0;
    const commission = paymentMethod === "gateway" ? numericAmount * 0.1 : 0;
    const totalPayable = numericAmount + commission;

    useEffect(() => {
        const newSchema = getValidationSchema(paymentMethod);
        setValidationSchema(newSchema);
        form.reset({ amount: form.getValues("amount"), image: "" });
    }, [paymentMethod]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPages("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof TopUpFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.info(tCommon("messages.redirectingToGateway"));
            window.location.href = formState.url!;
        }
    }, [formState, form]);

    useEffect(() => {
        if (!!manualFormState && manualFormState.status === StatusCode.Failed) {
            toast.error(
                !!manualFormState?.errors
                    ? tCommon("messages.errorFields")
                    : manualFormState?.message || tCommon("messages.error")
            );

            if (manualFormState.errors) {
                Object.entries(manualFormState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof TopUpFormData, {
                            type: "server",
                            message: fieldErrors[0],
                        });
                    }
                });
            }
        } else if (!!manualFormState && manualFormState.status === StatusCode.Success) {
            toast.success(manualFormState?.message || tCommon("messages.success"));
            setIsOpenModal(false);
            form.reset();
            setPaymentMethod("gateway");
        }
    }, [manualFormState, form, tCommon]);

    const handleGatewayPayment = async (data: TopUpFormData) => {
        const formData = new FormData();
        formData.append("amount", data.amount.toString());
        startGatewayTransition(async () => {
            await formAction(formData);
        });
    };

    const handleManualPayment = async (data: TopUpFormData) => {
        const formData = new FormData();
        formData.append("amount", data.amount.toString());
        data.image && formData.append("image", data.image);
        formData.append("type", "wallet");

        startTransition(async () => {
            await manualFormAction(formData);
        });
    };

    const onSubmit = async (data: TopUpFormData) => {
        if (paymentMethod === "gateway") {
            await handleGatewayPayment(data);
        } else {
            await handleManualPayment(data);
        }
    };

    const showModalHandler = () => {
        setIsOpenModal(!isOpenModal)
        if (!isOpenModal) {
            form.reset();
            setPaymentMethod("gateway");
        }
    }

    const copyLink = (title: string, value: string) => {
        navigator.clipboard.writeText(value);
        toast.success(`${title} ${tCommon("messages.copied")}`)
    };

    return (
        <>
            <div
                onClick={showModalHandler}
                className="bg-white rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center group gap-1.5 lg:gap-2.5 cursor-pointer">
                <Icon icon="solar--card-send-bold-duotone" sizeClass="size-11 lg:size-14" className="text-sub" />
                <p className="text-title text-sm lg:text-base font-medium group-hover:text-primary transition-all">
                    {tPages("profile.wallet.topup")}
                </p>
            </div>
            <Modal
                open={isOpenModal}
                title={tPages("profile.wallet.topup")}
                onOpenChange={setIsOpenModal}
                onCancel={showModalHandler}
                showConfirm={false}
                showCancel={false}
                size="sm"
            >
                <>
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                            <RHFCurrency
                                name="amount"
                                placeholder={tCommon("inputs.enterAmount")}
                                label={tCommon("inputs.amount")}
                            />

                            <div className="mt-1">
                                <p className="text-sm text-title font-medium mb-3">
                                    {tPages("profile.plans.paymentMethod")}
                                </p>
                                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="gateway" id="gateway" />
                                        <label
                                            htmlFor="gateway"
                                            className="text-sm text-text font-normal cursor-pointer"
                                        >
                                            {tPages("profile.auth.gatewayMethod")}
                                        </label>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <RadioGroupItem value="manual" id="manual" />
                                        <label
                                            htmlFor="manual"
                                            className="text-sm text-text font-normal cursor-pointer"
                                        >
                                            {tPages("profile.auth.manualPayment")}
                                        </label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {paymentMethod === "manual" && (
                                <div className='bg-border rounded-2xl overflow-hidden mt-2'>
                                    <div className='p-4'>
                                        <div className='w-full bg-primary rounded-lg py-1.5 text-center text-white'>
                                            {userData.bank_details.bank_name}
                                        </div>
                                        <div className='mt-4.5'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <Icon
                                                    icon="solar--copy-outline"
                                                    sizeClass="size-4"
                                                    className="text-primary cursor-pointer"
                                                    onClick={() => copyLink(tCommon("inputs.cardNumber"), userData.bank_details.card_number || "")}
                                                />
                                                <p className='text-title -mb-1 font-bold text-xl'>
                                                    {userData.bank_details.card_number}
                                                </p>
                                                <p className='text-xs text-caption'>
                                                    {tCommon("inputs.cardNumber")}
                                                </p>
                                            </div>
                                        </div>
                                        <div className='mt-2.5'>
                                            <div className='flex items-center justify-center gap-2'>
                                                <Icon
                                                    icon="solar--copy-outline"
                                                    sizeClass="size-4"
                                                    className="text-primary cursor-pointer"
                                                    onClick={() => copyLink(tCommon("inputs.shebaNumber"), userData.bank_details.sheba || "")}
                                                />
                                                <p className='text-title -mb-1 font-medium'>
                                                    {userData.bank_details.sheba}
                                                </p>
                                                <p className='text-xs text-caption'>
                                                    {tCommon("inputs.shebaNumber")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bg-light py-3'>
                                        <p className='text-text text-center font-semibold text-sm'>
                                            {userData.bank_details.owner_name}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {paymentMethod === "manual" && (
                                <div>
                                    <RHFUpload
                                        uploadType="image"
                                        name="image"
                                        placeholder={tCommon("inputs.uploadPaymentReceipt")}
                                    />
                                    <p className="text-sm text-caption mt-2.5">
                                        {tCommon("inputs.confirmAccount")}
                                    </p>
                                </div>
                            )}

                            {(numericAmount > 0 && paymentMethod === "gateway") && <hr className="border-t border-border mt-2" />}

                            {(numericAmount > 0 && paymentMethod === "gateway") && (
                                <div className="space-y-3 text-sm mt-1.5">
                                    {paymentMethod === "gateway" && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-caption">
                                                {tPages("profile.wallet.commission")}:
                                            </span>
                                            <span className="text-text font-medium">
                                                {putCommas(commission)}{" "}{tCommon("unit.toman")}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center">
                                        <span className="text-caption">
                                            {paymentMethod === "gateway"
                                                ? tPages("profile.wallet.payableAmount")
                                                : tCommon("inputs.amount")
                                            }:
                                        </span>
                                        <span className="text-primary font-medium">
                                            {putCommas(totalPayable)}{" "}{tCommon("unit.toman")}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 mt-4">
                                <Button
                                    variant={"outline"}
                                    size={"default"}
                                    onClick={showModalHandler}>
                                    {tCommon("buttons.cancel")}
                                </Button>
                                <Button
                                    type="submit"
                                    variant={"default"}
                                    isLoading={isPending || gatewayPending}
                                    size={"default"}>
                                    {tCommon("buttons.payment")}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </>
            </Modal>
        </>
    )
}