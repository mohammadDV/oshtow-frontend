"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { Icon } from "@/ui/icon";
import { useActionState, useEffect, useState, useTransition } from "react";
import { transferAction, TransferResponse } from "../../_api/transferAction";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { Modal } from "@/app/_components/modal";
import { FormProvider } from "react-hook-form";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { Button } from "@/ui/button";

export const TransferButton = () => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<TransferResponse | null, FormData>(
        transferAction,
        null
    );

    const transferSchema = z.object({
        amount: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            }),
        customer_number: z.string().min(1, tCommon("validation.required.thisField"))
    });

    type TransferFormData = z.infer<typeof transferSchema>;

    const form = useZodForm(transferSchema, {
        defaultValues: {
            amount: '',
            customer_number: ''
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPages("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof TransferFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tPages("messages.success"));
            showModalHandler();
        }
    }, [formState, form]);

    const onSubmit = async (data: TransferFormData) => {
        const formData = new FormData();

        formData.append("amount", data.amount.toString());
        formData.append("customer_number", data.amount);
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
                <Icon icon="solar--card-transfer-bold-duotone" sizeClass="size-11 lg:size-14" className="text-sub" />
                <p className="text-title text-sm lg:text-base font-medium group-hover:text-primary transition-all">
                    {tPages("profile.wallet.transfer")}
                </p>
            </div>
            <Modal
                open={isOpenModal}
                title={tPages("profile.wallet.transfer")}
                onOpenChange={setIsOpenModal}
                onCancel={showModalHandler}
                showConfirm={false}
                showCancel={false}
                size="sm"
            >
                <FormProvider {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mt-2 flex flex-col gap-6">
                        <RHFInput
                            name="amount"
                            placeholder={tCommon("inputs.enterAmount")}
                            label={tCommon("inputs.amount")}
                            type="number"
                        />
                        <RHFInput
                            name="customer_number"
                            placeholder={tCommon("inputs.enterCustomerNumber")}
                            label={tCommon("inputs.customerNumber")}
                        />
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
                                {tCommon("buttons.submitRequest")}
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}