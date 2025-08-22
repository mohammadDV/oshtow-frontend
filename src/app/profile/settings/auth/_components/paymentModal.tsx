"use client";

import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { Modal } from "@/app/_components/modal";
import { StatusCode } from "@/constants/enums";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { putCommas } from "@/lib/utils";
import { Button } from "@/ui/button";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { gatewayRedirectAction } from "../_api/gatewayRedirectAction";
import { manualPaymentAction, ManualPaymentResponse } from "../_api/manualPaymentAction";
import { UserData } from "@/types/user.type";
import { Icon } from "@/ui/icon";

interface PaymentModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  userData: UserData
}

export const PaymentModal = ({ isOpen, onOpenChange, onSuccess, userData }: PaymentModalProps) => {
  const tCommon = useCommonTranslation();
  const tPages = usePagesTranslation();
  const [paymentMethod, setPaymentMethod] = useState<string>("gateway");
  const [isPending, startTransition] = useTransition();
  const [gatewayPending, startGatewayTransition] = useTransition();
  const [formState, formAction] = useActionState<ManualPaymentResponse | null, FormData>(
    manualPaymentAction,
    null
  );

  const IDENTITY_AMOUNT = userData.identity_amount;

  const getValidationSchema = (method: string) => {
    if (method === "manual") {
      return z.object({
        image: z.string().min(1, tCommon("validation.required.thisField")),
      });
    }
    return z.object({
      image: z.string().optional(),
    });
  };

  const [validationSchema, setValidationSchema] = useState(() => getValidationSchema(paymentMethod));

  type ManualPaymentFormData = z.infer<typeof validationSchema>;

  const form = useZodForm(validationSchema, {
    defaultValues: {
      image: "",
    },
  });

  useEffect(() => {
    const newSchema = getValidationSchema(paymentMethod);
    setValidationSchema(newSchema);
    form.reset({ image: "" });
  }, [paymentMethod]);

  useEffect(() => {
    if (!!formState && formState.status === StatusCode.Failed) {
      toast.error(
        !!formState?.errors
          ? tCommon("messages.errorFields")
          : formState?.message || tCommon("messages.error")
      );

      if (formState.errors) {
        Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
          if (fieldErrors && fieldErrors.length > 0) {
            form.setError(fieldName as keyof ManualPaymentFormData, {
              type: "server",
              message: fieldErrors[0],
            });
          }
        });
      }
    } else if (!!formState && formState.status === StatusCode.Success) {
      toast.success(formState?.message || tCommon("messages.success"));
      onOpenChange(false);
      onSuccess?.();
    }
  }, [formState, form, tCommon, onOpenChange, onSuccess]);

  const handleGatewayPayment = async () => {
    startGatewayTransition(async () => {
      try {
        const response = await gatewayRedirectAction();
        if (response.status === StatusCode.Success && response.url) {
          toast.info(tCommon("messages.redirectingToGateway"));
          window.location.href = response.url;
        } else {
          toast.error(tCommon("messages.error"));
        }
      } catch (error) {
        toast.error(tCommon("messages.error"));
      }
    });
  };

  const handleManualPayment = async (data: ManualPaymentFormData) => {
    const formData = new FormData();
    formData.append("amount", IDENTITY_AMOUNT.toString());
    data.image && formData.append("image", data.image);
    formData.append("type", "identity");

    startTransition(async () => {
      await formAction(formData);
    });
  };

  const onSubmit = async (data: ManualPaymentFormData) => {
    if (paymentMethod === "gateway") {
      await handleGatewayPayment();
    } else {
      await handleManualPayment(data);
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
    form.reset();
    setPaymentMethod("gateway");
  };

  const copyLink = (title: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${title} ${tCommon("messages.copied")}`)
  };

  return (
    <Modal
      size="sm"
      open={isOpen}
      onOpenChange={onOpenChange}
      title={tPages("profile.auth.payment")}
      showConfirm={false}
      showCancel={false}
    >
      <>
        <hr className="border-t border-border" />
        <div className="flex items-center justify-between my-4">
          <p className="text-text text-sm font-medium">
            {tPages("profile.auth.identityVerification")}
          </p>
          <p className="text-text text-sm font-medium">
            {putCommas(IDENTITY_AMOUNT)} {tCommon("unit.toman")}
          </p>
        </div>
        <hr className="border-t border-border" />

        <div className="mt-4">
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
          <div className='bg-border rounded-2xl overflow-hidden mt-5'>
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

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4">
            {paymentMethod === "manual" && (
              <div className="mb-4">
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

            <div className="flex justify-end gap-3 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel}>
                {tCommon("buttons.cancel")}
              </Button>
              <Button
                type="submit"
                variant="default"
                size="default"
                isLoading={isPending || gatewayPending}
              >
                {paymentMethod === "gateway"
                  ? tCommon("buttons.payment")
                  : tCommon("buttons.payment")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </>
    </Modal>
  );
};