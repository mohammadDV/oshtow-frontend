"use client";

import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import {
  RHFCombobox,
  OptionTypes,
} from "@/app/_components/hookForm/RHFCombobox";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { Modal } from "@/app/_components/modal";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import z from "zod";
import {
  createTicketAction,
  CreateTicketResponse,
} from "../_api/createTicketAction";
import { TicketSubject } from "@/types/support.type";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { useFetchData } from "@/hooks/useFetchData";
import { apiUrls } from "@/constants/apiUrls";
import { useRouter } from "next/navigation";

export const AddTicketButton = () => {
  const t = useCommonTranslation();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useActionState<
    CreateTicketResponse | null,
    FormData
  >(createTicketAction, null);

  const { response: ticketSubjects, loading: subjectsLoading } = useFetchData<
    TicketSubject[]
  >(apiUrls.ticket.subjects);

  const ticketSchema = z.object({
    message: z
      .string({
        required_error: t("validation.required.thisField"),
      })
      .min(1, t("validation.required.thisField")),
    subject_id: z
      .string({
        required_error: t("validation.required.thisField"),
      })
      .min(1, t("validation.required.thisField")),
    file: z.string().optional(),
  });

  type TicketFormData = z.infer<typeof ticketSchema>;

  const form = useZodForm(ticketSchema, {
    defaultValues: {
      message: "",
      subject_id: "",
      file: "",
    },
  });

  useEffect(() => {
    if (!!formState && formState.status === StatusCode.Failed) {
      toast.error(formState?.message || t("messages.error"));

      if (formState.errors) {
        Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
          if (fieldErrors && fieldErrors.length > 0) {
            form.setError(fieldName as keyof TicketFormData, {
              type: "server",
              message: fieldErrors[0],
            });
          }
        });
      }
    } else if (!!formState && formState.status === StatusCode.Success) {
      toast.success(t("messages.success"));
      setIsOpenModal(false);
      form.reset();
      router.refresh();
    }
  }, [formState]);

  const onSubmit = async (data: TicketFormData) => {
    const formData = new FormData();

    formData.append("message", data.message);
    formData.append("subject_id", data.subject_id);
    if (data.file) {
      formData.append("file", data.file);
    }

    startTransition(async () => {
      await formAction(formData);
    });
  };

  const showModalHandler = () => {
    setIsOpenModal(!isOpenModal);
    if (!isOpenModal) {
      form.reset();
    }
  };

  const subjectOptions: OptionTypes[] =
    ticketSubjects?.map((subject) => ({
      label: subject.title,
      value: subject.id.toString(),
    })) || [];

  return (
    <>
      <Button
        variant={"default"}
        className="lg:block hidden"
        onClick={showModalHandler}
      >
        {t("buttons.addSupportTicket")}
      </Button>

      <Modal
        open={isOpenModal}
        title={t("buttons.addSupportTicket")}
        onOpenChange={setIsOpenModal}
        onCancel={showModalHandler}
        showConfirm={false}
        showCancel={false}
        size="lg"
      >
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 flex flex-col gap-5"
          >
            <RHFCombobox
              name="subject_id"
              label={t("inputs.ticketSubject")}
              placeholder={t("inputs.selectTicketSubject")}
              options={subjectOptions}
              loading={subjectsLoading}
            />

            <RHFTextarea
              name="message"
              label={t("inputs.ticketMessage")}
              placeholder={t("inputs.enterTicketMessage")}
              rows={4}
            />

            <RHFUpload
              name="file"
              label={t("inputs.ticketFile")}
              uploadType="file"
              placeholder={t("inputs.selectFile")}
            />

            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                variant={"outline"}
                size={"default"}
                onClick={showModalHandler}
                type="button"
              >
                {t("buttons.cancel")}
              </Button>
              <Button
                type="submit"
                variant={"default"}
                isLoading={isPending}
                size={"default"}
              >
                {t("buttons.sendTicket")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};
