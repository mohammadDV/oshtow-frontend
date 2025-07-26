"use client"

import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { ClaimStatusResponse, FullClaim } from "@/types/claim.type";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { confirmDeliveryAction, ConfirmDeliveryResponse } from "../../_api/confirmDeliveryAction";
import { StatusCode } from "@/constants/enums";

interface ConfirmDeliveryProps {
    claimStatus: ClaimStatusResponse;
    claimData?: FullClaim;
}

export const ConfirmDelivery = ({ claimStatus, claimData }: ConfirmDeliveryProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ConfirmDeliveryResponse | null, FormData>(
        confirmDeliveryAction,
        null
    );

    const deliverySchema = z.object({
        confirmation_code: z.string().min(1, tCommon("validation.required.thisField"))
    });

    type DeliveryFormData = z.infer<typeof deliverySchema>;

    const form = useZodForm(deliverySchema, {
        defaultValues: {
            confirmation_code: '',
        }
    });

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.success"));
            router.replace(`/profile/claims/process?claimId=${formState?.data?.id}`)
        }
    }, [formState]);

    const onSubmit = async (data: DeliveryFormData) => {
        const formData = new FormData();
        formData.append("claimId", claimData?.id.toString() || '');
        formData.append("confirmation_code", data.confirmation_code);

        startTransition(async () => {
            await formAction(formData);
        });
    }

    const copyCode = async (value: string) => {
        await navigator.clipboard.writeText(value);
        toast.success(tCommon("messages.codeCopied"))
    };

    return (
        <>
            <div className="p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white">
                <Icon
                    icon="solar--delivery-bold-duotone"
                    sizeClass="size-16 lg:size-20"
                    className="text-sub mx-auto" />
                <h2 className="mt-3 lg:mt-4 text-center text-xl font-semibold text-title">
                    {tPages("profile.claims.confirmDelivery")}
                </h2>
                <p className="text-caption text-sm font-normal leading-6 text-center mt-3">
                    {claimStatus.type === "passenger"
                        ? tPages("profile.claims.confirmDeliveryPassenger")
                        : tPages("profile.claims.confirmDeliverySender")}
                </p>
                {claimStatus.type === "sender" && (
                    <div className="mt-6 bg-border rounded-full mx-auto w-fit p-1 flex items-center justify-center gap-3">
                        <p className="text-title font-normal pr-3">
                            {claimStatus.delivery_code}
                        </p>
                        <button
                            onClick={() => copyCode(claimStatus.delivery_code)}
                            className="px-3 bg-primary text-white font-normal py-1 rounded-full cursor-pointer hover:opacity-80 transition-all">
                            {tCommon("buttons.copyCode")}
                        </button>
                    </div>
                )}
                {claimStatus.type === "passenger" && (
                    <div className="mt-6">
                        <FormProvider {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-3 justify-between">
                                <RHFInput
                                    name="confirmation_code"
                                    placeholder={tCommon("inputs.deliveryCode")}
                                    type="text"
                                />
                                <Button
                                    variant={"default"}
                                    type="submit"
                                    isLoading={isPending}>
                                    {tCommon("buttons.submitCode")}
                                </Button>
                            </form>
                        </FormProvider>
                    </div>
                )}
            </div>
        </>
    )
}