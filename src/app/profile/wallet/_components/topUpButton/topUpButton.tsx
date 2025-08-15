"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { topUpAction, TopUpResponse } from "../../_api/topUpAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { RHFCurrency } from "@/app/_components/hookForm/RHFCurrency";
import { putCommas } from "@/lib/utils";

export const TopUpButton = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<TopUpResponse | null, FormData>(
        topUpAction,
        null
    );

    const topUpSchema = z.object({
        amount: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            })
    });

    type TopUpFormData = z.infer<typeof topUpSchema>;

    const form = useZodForm(topUpSchema, {
        defaultValues: {
            amount: '',
        }
    });

    const watchedAmount = form.watch("amount");
    const numericAmount = watchedAmount ? parseFloat(watchedAmount.replace(/,/g, '')) : 0;
    const commission = numericAmount * 0.1;
    const totalPayable = numericAmount + commission;

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

    const onSubmit = async (data: TopUpFormData) => {
        const formData = new FormData();

        formData.append("amount", data.amount.toString());
        startTransition(async () => {
            await formAction(formData);
        });
    };

    const showModalHandler = () => {
        setIsOpenModal(!isOpenModal)
        if (!isOpenModal) {
            form.reset();
        }
    }

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
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-col gap-4">
                        <RHFCurrency
                            name="amount"
                            placeholder={tCommon("inputs.enterAmount")}
                            label={tCommon("inputs.amount")}
                        />
                        {numericAmount > 0 && (
                            <div className="space-y-3 text-sm mt-1.5">
                                <div className="flex justify-between items-center">
                                    <span className="text-caption">
                                        {tPages("profile.wallet.commission")}:
                                    </span>
                                    <span className="text-text font-medium">
                                        {putCommas(commission)}{" "}{tCommon("unit.toman")}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-caption">
                                        {tPages("profile.wallet.payableAmount")}:
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
                                isLoading={isPending}
                                size={"default"}>
                                {tCommon("buttons.payment")}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}