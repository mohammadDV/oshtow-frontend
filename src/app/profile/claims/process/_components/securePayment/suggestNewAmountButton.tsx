"use client"

import { RHFCurrency } from "@/app/_components/hookForm/RHFCurrency";
import { Modal } from "@/app/_components/modal";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation"
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { suggestNewAmountAction, SuggestNewAmountResponse } from "../../_api/suggestNewAmountAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface SuggestNewAmountButtonProps {
    claimId: number;
}

export const SuggestNewAmountButton = ({ claimId }: SuggestNewAmountButtonProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<SuggestNewAmountResponse | null, FormData>(
        suggestNewAmountAction,
        null
    );

    const suggestAmountSchema = z.object({
        amount: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            })
    });

    type SuggestAmountFormData = z.infer<typeof suggestAmountSchema>;

    const form = useZodForm(suggestAmountSchema, {
        defaultValues: {
            amount: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPages("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof SuggestAmountFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(tCommon("messages.success"));
            setIsOpenModal(false);
            form.reset();
            router.replace(`/profile/claims/process?claimId=${claimId}`)
        }
    }, [formState]);

    const onSubmit = async (data: SuggestAmountFormData) => {
        const formData = new FormData();

        formData.append("amount", data.amount.toString());
        formData.append("claimId", claimId.toString());
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
            <Button
                variant={"outline"}
                size={"sm"}
                className='w-full lg:w-auto'
                onClick={showModalHandler}
            >
                {tCommon("buttons.suggestAmount")}
            </Button>

            <Modal
                open={isOpenModal}
                title={tCommon("buttons.suggestAmount")}
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
                            label={tCommon("inputs.suggestedAmount")}
                        />
                        <div className="flex items-center justify-end gap-3 mt-6">
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