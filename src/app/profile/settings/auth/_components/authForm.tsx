"use client";

import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFDatePicker } from "@/app/_components/hookForm/RHFDatePicker";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useFetchData } from "@/hooks/useFetchData";
import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { cn } from "@/lib/utils";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { IdentifyInfoResponse } from "../_api/getIdentifyInfo";
import { identityAction, IdentityResponse } from "../_api/identityAction";
import { getCities, getProvinces } from "@/app/(main)/projects/_api/getLocations";

interface AuthFormProps {
  identifyInfo?: IdentifyInfoResponse;
}

export const AuthForm = ({ identifyInfo }: AuthFormProps) => {
  const tCommon = useCommonTranslation();
  const tPage = usePagesTranslation();
  const [step, setStep] = useState<"first" | "second">("first");
  const [isPending, startTransition] = useTransition();
  const [formState, formAction] = useActionState<
    IdentityResponse | null,
    FormData
  >(identityAction, null);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  const { response: countriesResponse } = useFetchData<Country[]>(
    apiUrls.locations.countries
  );

  const countryOptions =
    countriesResponse?.map((country) => ({
      label: country.title,
      value: country.id.toString(),
    })) || [];

  const provinceOptions = provinces?.map(province => ({
    label: province.title,
    value: province.id.toString(),
  })) || [];

  const cityOptions = cities?.map(city => ({
    label: city.title,
    value: city.id.toString(),
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
  ];

  const firstStepSchema = z.object({
    first_name: z.string().min(1, tCommon("validation.required.firstName")),
    last_name: z.string().min(1, tCommon("validation.required.lastName")),
    national_code: z
      .string()
      .min(1, tCommon("validation.required.thisField"))
      .regex(regex.nationalCode, tCommon("validation.invalid.nationalCode")),
    mobile: z
      .string({ required_error: tCommon("validation.required.mobile") })
      .regex(regex.phone, tCommon("validation.invalid.mobile")),
    birthday: z.string().min(1, tCommon("validation.required.thisField")),
    email: z
      .string({ required_error: tCommon("validation.required.email") })
      .email(tCommon("validation.invalid.email")),
    country_id: z.string().min(1, tCommon("validation.required.thisField")),
    province_id: z.string().min(1, tCommon("validation.required.thisField")),
    city_id: z.string().min(1, tCommon("validation.required.thisField")),
    postal_code: z
      .string({ required_error: tCommon("validation.required.thisField") })
      .regex(regex.postalCode, tCommon("validation.invalid.postalCode")),
    address: z.string().min(1, tCommon("validation.required.thisField")),
  });

  const secondStepSchema = z.object({
    image_national_code_front: z.string().optional(),
    image_national_code_back: z.string().optional(),
    video: z.string().optional(),
  });

  const completeAuthSchema = firstStepSchema.merge(
    z.object({
      image_national_code_front: z
        .string()
        .min(1, tCommon("validation.required.thisField")),
      image_national_code_back: z
        .string()
        .min(1, tCommon("validation.required.thisField")),
      video: z.string().min(1, tCommon("validation.required.thisField")),
    })
  );

  type AuthFormData = z.infer<typeof completeAuthSchema>;

  const formSchema = firstStepSchema.merge(secondStepSchema);
  const form = useZodForm(formSchema, {
    defaultValues: {
      first_name: identifyInfo?.first_name || "",
      last_name: identifyInfo?.last_name || "",
      national_code: identifyInfo?.national_code || "",
      mobile: identifyInfo?.mobile || "",
      email: identifyInfo?.email || "",
      birthday: identifyInfo?.birthday || "",
      country_id: identifyInfo?.country_id?.toString() || "",
      province_id: identifyInfo?.province_id?.toString() || "",
      city_id: identifyInfo?.city_id?.toString() || "",
      postal_code: identifyInfo?.postal_code || "",
      address: identifyInfo?.address || "",
      image_national_code_front: identifyInfo?.image_national_code_front || "",
      image_national_code_back: identifyInfo?.image_national_code_back || "",
      video: identifyInfo?.video || "",
    },
  });

  const watchedCountryId = form.watch("country_id");
  const watchedProvinceId = form.watch("province_id");

  useEffect(() => {
    const fetchProvinces = async () => {
      if (watchedCountryId) {
        setLoadingProvinces(true);
        setProvinces([]);
        setCities([]);
        form.setValue("province_id", "");
        form.setValue("city_id", "");

        try {
          const response = await getProvinces(parseInt(watchedCountryId));
          setProvinces(response || []);
          if (identifyInfo?.province_id && response?.some((p: any) => p.id === identifyInfo.province_id)) {
            form.setValue("province_id", identifyInfo.province_id.toString());
          }
        } catch (error) {
          console.error("Error fetching provinces:", error);
          setProvinces([]);
        } finally {
          setLoadingProvinces(false);
        }
      } else {
        setProvinces([]);
        setCities([]);
        form.setValue("province_id", "");
        form.setValue("city_id", "");
      }
    };

    fetchProvinces();
  }, [watchedCountryId, form, identifyInfo?.province_id]);

  useEffect(() => {
    const fetchCities = async () => {
      if (watchedProvinceId) {
        setLoadingCities(true);
        setCities([]);
        form.setValue("city_id", "");

        try {
          const response = await getCities(parseInt(watchedProvinceId));
          setCities(response || []);
          if (identifyInfo?.city_id && response?.some((c: any) => c.id === identifyInfo.city_id)) {
            form.setValue("city_id", identifyInfo.city_id.toString());
          }
        } catch (error) {
          console.error("Error fetching cities:", error);
          setCities([]);
        } finally {
          setLoadingCities(false);
        }
      } else {
        setCities([]);
        form.setValue("city_id", "");
      }
    };

    fetchCities();
  }, [watchedProvinceId, form, identifyInfo?.city_id]);

  useEffect(() => {
    console.log(formState);
    if (!!formState && formState.status === StatusCode.Failed) {
      toast.error(
        !!formState?.errors
          ? tCommon("messages.errorFields")
          : formState?.message || tCommon("messages.error")
      );

      if (formState.errors) {
        Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
          if (fieldErrors && fieldErrors.length > 0) {
            form.setError(fieldName as keyof AuthFormData, {
              type: "server",
              message: fieldErrors[0],
            });
          }
        });
      }
    } else if (!!formState && formState.status === StatusCode.Success) {
      toast.info(tCommon("messages.redirectingToGateway"));
      window.location.href = formState.url!;
    }
  }, [formState, form]);

  const validateFirstStep = async () => {
    const firstStepFields = [
      "first_name",
      "last_name",
      "national_code",
      "mobile",
      "email",
      "birthday",
      "country_id",
      "province_id",
      "city_id",
      "postal_code",
      "address",
    ] as (keyof AuthFormData)[];

    const isValid = await form.trigger(firstStepFields);
    return isValid;
  };

  const validateSecondStep = async () => {
    const secondStepFields = [
      "image_national_code_front",
      "image_national_code_back",
      "video",
    ] as (keyof AuthFormData)[];

    const formData = form.getValues();
    const result = completeAuthSchema.safeParse(formData);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      secondStepFields.forEach((field) => {
        if (errors[field]) {
          form.setError(field, {
            type: "manual",
            message: errors[field]?.[0] || "This field is required",
          });
        }
      });
      return false;
    }

    return true;
  };

  const handleNextStep = async () => {
    const isValid = await validateFirstStep();
    if (isValid) setStep("second");
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
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("national_code", data.national_code);
    formData.append("mobile", data.mobile);
    formData.append("birthday", data.birthday);
    formData.append("email", data.email);
    formData.append("country_id", data.country_id);
    formData.append("province_id", data.province_id);
    formData.append("city_id", data.city_id);
    formData.append("postal_code", data.postal_code);
    formData.append("address", data.address);
    formData.append(
      "image_national_code_front",
      data.image_national_code_front
    );
    formData.append("image_national_code_back", data.image_national_code_back);
    formData.append("video", data.video);

    startTransition(async () => {
      await formAction(formData);
    });
  };

  const renderFirstStep = () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-5">
        <RHFInput name="first_name" placeholder={tCommon("inputs.firstName")} />
        <RHFInput name="last_name" placeholder={tCommon("inputs.lastName")} />
      </div>
      <div className="flex items-start justify-between gap-5">
        <RHFInput
          name="national_code"
          placeholder={tCommon("inputs.nationalCode")}
        />
        <RHFInput name="mobile" placeholder={tCommon("inputs.mobile")} />
      </div>
      <div className="flex items-start justify-between gap-5">
        <RHFInput name="email" placeholder={tCommon("inputs.email")} />
        <RHFDatePicker
          name="birthday"
          placeholder={tCommon("inputs.birthday")}
        />
      </div>
      <div className="flex items-start justify-between gap-5">
        <RHFCombobox
          options={countryOptions}
          name="country_id"
          placeholder={tCommon("inputs.country")}
        />
        <RHFCombobox
          options={provinceOptions}
          name="province_id"
          placeholder={tCommon("inputs.province")}
          loading={loadingProvinces}
        />
      </div>
      <div className="flex items-start justify-between gap-5">
        <RHFCombobox
          options={cityOptions}
          name="city_id"
          placeholder={tCommon("inputs.city")}
          loading={loadingCities}
        />
        <RHFInput
          name="postal_code"
          placeholder={tCommon("inputs.postalCode")}
        />
      </div>
      <div>
        <RHFTextarea name="address" placeholder={tCommon("inputs.address")} />
      </div>
    </div>
  );

  const renderSecondStep = () => (
    <div className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-5">
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
    <div className="mt-8 lg:max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-5 mb-7">
        {stepsData.map((stepData, index) => (
          <div
            key={stepData.value}
            className={cn(
              "p-3 bg-light rounded-lg flex-1 flex items-center gap-1.5",
              stepData.value === step && "border border-sub"
            )}
          >
            <div
              className={cn(
                "size-6 rounded-full flex items-center justify-center",
                stepData.value === step
                  ? "bg-primary text-white"
                  : "bg-white text-caption"
              )}
            >
              {index + 1}
            </div>
            <div>
              <span
                className={cn(
                  "font-medium inline-block ml-1",
                  stepData.value === step ? "text-primary" : "text-caption"
                )}
              >
                {stepData.title}
              </span>
              <span className="font-normal text-sm text-caption inline-block">
                {stepData.content}
              </span>
            </div>
          </div>
        ))}
      </div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === "first" ? renderFirstStep() : renderSecondStep()}

          <div className="flex justify-between mt-6">
            {step === "second" && (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                {tCommon("buttons.prevStep")}
              </Button>
            )}
            <div className="flex-1" />
            <Button
              type="submit"
              variant="default"
              size="default"
              isLoading={isPending}
            >
              {step === "first"
                ? tCommon("buttons.nextStep")
                : tCommon("buttons.sendInformation&Payment")}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
