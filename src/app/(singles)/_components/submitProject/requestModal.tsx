"use client"

import { Modal } from "@/app/_components/modal"
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFCurrency } from "@/app/_components/hookForm/RHFCurrency";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { SingleProjectResponse } from "@/types/project.type";
import { Button } from "@/ui/button";
import { StatusCode } from "@/constants/enums";
import { useActionState, useEffect, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Dispatch, SetStateAction } from "react";
import { requestAction, RequestService } from "./requestAction";
import { useRouter } from "next/navigation";

interface RequestModalProps {
    title: string;
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    projectData: SingleProjectResponse;
}

export const RequestModal = ({ title, isOpenModal, setIsOpenModal, projectData }: RequestModalProps) => {
    const router = useRouter();
    const t = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<RequestService | null, FormData>(
        requestAction,
        null
    );

    const addressTypeOptions = [
        { label: t("address.me"), value: "me" },
        { label: t("address.other"), value: "other" }
    ];

    const requestSchema = z.object({
        amount: z.string({
            required_error: t("validation.required.thisField")
        })
            .min(1, t("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: t("validation.invalid.amount")
            }),
        weight: z.string({
            required_error: t("validation.required.thisField")
        })
            .min(1, t("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: t("validation.invalid.weight")
            }),
        description: z.string().min(1, t("validation.required.thisField")),
        address_type: z.string().min(1, t("validation.required.thisField")),
        address: z.string().optional(),
        image: projectData.project.type === "passenger"
            ? z.string().min(1, t("validation.required.thisField"))
            : z.string().optional(),
    }).refine((data) => {
        if (data.address_type === "me") {
            return data.address && data.address.length > 0;
        }
        return true;
    }, {
        message: t("validation.required.address"),
        path: ["address"]
    });

    type RequestFormData = z.infer<typeof requestSchema>;

    const form = useZodForm(requestSchema, {
        defaultValues: {
            amount: '',
            weight: '',
            description: '',
            address_type: '',
            address: '',
            image: ''
        }
    });

    const watchedAddressType = form.watch("address_type");

    useEffect(() => {
        if (watchedAddressType !== "me") {
            form.setValue("address", "");
            form.clearErrors("address");
        }
    }, [watchedAddressType, form]);

    useEffect(() => {
        if (formState) {
            if (formState.status === StatusCode.Success) {
                toast.success(formState?.message || t("messages.success"));
                handleCancel();
                router.refresh();
            } else {
                toast.error(formState?.message || t("messages.error"));
                if (formState.errors) {
                    Object.entries(formState.errors).forEach(([field, messages]) => {
                        form.setError(field as keyof RequestFormData, {
                            message: messages[0]
                        });
                    });
                }
            }
        }
    }, [formState]);

    const onSubmit = async (data: RequestFormData) => {
        const formData = new FormData();
        formData.append("amount", data.amount);
        formData.append("weight", data.weight);
        formData.append("description", data.description);
        formData.append("address_type", data.address_type);
        formData.append("address", data.address || "");
        formData.append("image", data.image || "");
        formData.append("project_id", projectData.project.id.toString());

        startTransition(async () => {
            await formAction(formData);
        });
    };

    const handleCancel = () => {
        setIsOpenModal(false);
        form.reset();
    };

    return (
        <Modal
            title={title}
            open={isOpenModal}
            onOpenChange={setIsOpenModal}
            onCancel={handleCancel}
            showConfirm={false}
            showCancel={false}
            size="sm">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <RHFCurrency
                        name="amount"
                        label={t("inputs.amount")}
                        tooltip={t("tooltips.suggestedAmount")}
                    />
                    <RHFInput
                        name="weight"
                        label={t("inputs.weight")}
                        type="number"
                    />
                    <RHFTextarea
                        name="description"
                        label={t("inputs.description")}
                    />
                    <RHFCombobox
                        name="address_type"
                        label={t("inputs.addressType")}
                        options={addressTypeOptions}
                    />
                    {watchedAddressType === "me" && (
                        <RHFTextarea
                            name="address"
                            label={t("inputs.address")}
                        />
                    )}
                    <RHFUpload
                        uploadType="image"
                        name="image"
                        label={projectData.project.type === "passenger"
                            ? t("inputs.shipmentImage")
                            : t("inputs.ticketImage")}
                        tooltip={projectData.project.type === "passenger" ? t("tooltips.shipmentImage") : undefined}
                    />
                    <div className="flex items-center justify-end gap-3 mt-2">
                        <Button
                            variant={"outline"}
                            onClick={handleCancel}
                            className="flex-1 lg:flex-initial"
                        >
                            {t("buttons.cancel")}
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="flex-1 lg:flex-initial"
                        >
                            {title}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </Modal>
    )
}