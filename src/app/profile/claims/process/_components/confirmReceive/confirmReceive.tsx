"use client"

import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { ClaimStatusResponse, FullClaim } from "@/types/claim.type";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import { confirmReceiveAction, ConfirmReceiveResponse } from "../../_api/confirmReceiveAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";

interface ConfirmReceiveProps {
    claimStatus: ClaimStatusResponse;
    claimData?: FullClaim;
}

export const ConfirmReceive = ({ claimStatus, claimData }: ConfirmReceiveProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
    
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ConfirmReceiveResponse | null, FormData>(
        confirmReceiveAction,
        null
    );

    const receiveSchema = z.object({
        confirmation_image: z.string().min(1, tCommon("validation.required.thisField")),
        confirmation_description: z.string().min(1, tCommon("validation.required.thisField"))
    });

    type ReceiveFormData = z.infer<typeof receiveSchema>;

    const form = useZodForm(receiveSchema, {
        defaultValues: {
            confirmation_image: '',
            confirmation_description: '',
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

    const onSubmit = async (data: ReceiveFormData) => {
        const formData = new FormData();
        formData.append("claimId", claimData?.id.toString() || '');
        formData.append("confirmation_image", data.confirmation_image);
        formData.append("confirmation_description", data.confirmation_description);

        startTransition(async () => {
            await formAction(formData);
        });
    }

    return (
        <div>
            <div className="p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white">
                <Icon
                    icon="solar--box-minimalistic-bold-duotone"
                    sizeClass="size-16 lg:size-20"
                    className="text-sub mx-auto" />
                <h2 className="mt-3 lg:mt-4 text-center text-xl font-semibold text-title">
                    {claimStatus.type === "passenger"
                        ? tPages("profile.claims.confirmReceiveByYou")
                        : tPages("profile.claims.confirmReceiveByPassenger")}
                </h2>
                <p className="text-caption text-sm font-normal leading-6 text-center mt-3">
                    {tPages("profile.claims.confirmReceiveDescription")}
                </p>
                {claimStatus.type === "passenger" && <div className="mt-6">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-4">
                                <RHFUpload
                                    uploadType="image"
                                    name="confirmation_image"
                                    placeholder={tCommon("inputs.receivedItem")}
                                />
                                <RHFTextarea
                                    name="confirmation_description"
                                    placeholder={tCommon("inputs.description")}
                                />
                            </div>
                            <div className="flex items-center justify-end mt-6">
                                <Button
                                    variant={"default"}
                                    type="submit"
                                    className="flex-1 md:flex-initial"
                                    isLoading={isPending}>
                                    {tCommon("buttons.submitInformation")}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>}
            </div>
        </div>
    )
}