"use client"

import { pathTypeOptions } from "@/_mock/pathOptions";
import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFDatePicker } from "@/app/_components/hookForm/RHFDatePicker";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { useZodForm } from "@/hooks/useZodForm";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { passengerAction, PassengerService } from "../_api/passengerAction";
import { getCities, getProvinces } from "@/app/(main)/projects/_api/getLocations";

export const PassengerForm = () => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<PassengerService | null, FormData>(
        passengerAction,
        null
    );

    const [oProvinces, setOProvinces] = useState<any[]>([]);
    const [oCities, setOCities] = useState<any[]>([]);
    const [dProvinces, setDProvinces] = useState<any[]>([]);
    const [dCities, setDCities] = useState<any[]>([]);
    const [loadingOProvinces, setLoadingOProvinces] = useState(false);
    const [loadingOCities, setLoadingOCities] = useState(false);
    const [loadingDProvinces, setLoadingDProvinces] = useState(false);
    const [loadingDCities, setLoadingDCities] = useState(false);

    const { response: countriesResponse } = useFetchData<Country[]>(apiUrls.locations.countries);

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

    const passengerSchema = z.object({
        title: z.string().min(1, tCommon("validation.required.thisField")),
        description: z.string().min(1, tCommon("validation.required.thisField")),
        address: z.string().min(1, tCommon("validation.required.thisField")),
        image: z.string().optional(),
        o_country_id: z.string().min(1, tCommon("validation.required.thisField")),
        o_province_id: z.string().min(1, tCommon("validation.required.thisField")),
        o_city_id: z.string().min(1, tCommon("validation.required.thisField")),
        d_country_id: z.string().min(1, tCommon("validation.required.thisField")),
        d_province_id: z.string().min(1, tCommon("validation.required.thisField")),
        d_city_id: z.string().min(1, tCommon("validation.required.thisField")),
        path_type: z.string().min(1, tCommon("validation.required.thisField")),
        send_date: z.string().min(1, tCommon("validation.required.thisField")),
        weight: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            }),
        amount: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            }),
    });

    type PassengerFormData = z.infer<typeof passengerSchema>;

    const form = useZodForm(passengerSchema, {
        defaultValues: {
            title: '',
            description: '',
            address: '',
            image: '',
            o_country_id: '',
            o_province_id: '',
            o_city_id: '',
            d_country_id: '',
            d_province_id: '',
            d_city_id: '',
            path_type: '',
            send_date: '',
            weight: '',
            amount: ''
        }
    });

    const watchedOCountryId = form.watch("o_country_id");
    const watchedOProvinceId = form.watch("o_province_id");
    const watchedDCountryId = form.watch("d_country_id");
    const watchedDProvinceId = form.watch("d_province_id");

    const oProvinceOptions = oProvinces?.map(province => ({
        label: province.title,
        value: province.id.toString(),
    })) || [];

    const oCityOptions = oCities?.map(city => ({
        label: city.title,
        value: city.id.toString(),
    })) || [];

    const dProvinceOptions = dProvinces?.map(province => ({
        label: province.title,
        value: province.id.toString(),
    })) || [];

    const dCityOptions = dCities?.map(city => ({
        label: city.title,
        value: city.id.toString(),
    })) || [];

    useEffect(() => {
        if (watchedOCountryId) {
            setLoadingOProvinces(true);
            setOProvinces([]);
            setOCities([]);
            form.setValue("o_province_id", "");
            form.setValue("o_city_id", "");

            getProvinces(parseInt(watchedOCountryId))
                .then((response) => {
                    setOProvinces(response || []);
                })
                .catch((error) => {
                    console.error("Error fetching origin provinces:", error);
                    setOProvinces([]);
                })
                .finally(() => {
                    setLoadingOProvinces(false);
                });
        } else {
            setOProvinces([]);
            setOCities([]);
            form.setValue("o_province_id", "");
            form.setValue("o_city_id", "");
        }
    }, [watchedOCountryId, form]);

    useEffect(() => {
        if (watchedOProvinceId) {
            setLoadingOCities(true);
            setOCities([]);
            form.setValue("o_city_id", "");

            getCities(parseInt(watchedOProvinceId))
                .then((response) => {
                    setOCities(response || []);
                })
                .catch((error) => {
                    console.error("Error fetching origin cities:", error);
                    setOCities([]);
                })
                .finally(() => {
                    setLoadingOCities(false);
                });
        } else {
            setOCities([]);
            form.setValue("o_city_id", "");
        }
    }, [watchedOProvinceId, form]);

    useEffect(() => {
        if (watchedDCountryId) {
            setLoadingDProvinces(true);
            setDProvinces([]);
            setDCities([]);
            form.setValue("d_province_id", "");
            form.setValue("d_city_id", "");

            getProvinces(parseInt(watchedDCountryId))
                .then((response) => {
                    setDProvinces(response || []);
                })
                .catch((error) => {
                    console.error("Error fetching destination provinces:", error);
                    setDProvinces([]);
                })
                .finally(() => {
                    setLoadingDProvinces(false);
                });
        } else {
            setDProvinces([]);
            setDCities([]);
            form.setValue("d_province_id", "");
            form.setValue("d_city_id", "");
        }
    }, [watchedDCountryId, form]);

    useEffect(() => {
        if (watchedDProvinceId) {
            setLoadingDCities(true);
            setDCities([]);
            form.setValue("d_city_id", "");

            getCities(parseInt(watchedDProvinceId))
                .then((response) => {
                    setDCities(response || []);
                })
                .catch((error) => {
                    console.error("Error fetching destination cities:", error);
                    setDCities([]);
                })
                .finally(() => {
                    setLoadingDCities(false);
                });
        } else {
            setDCities([]);
            form.setValue("d_city_id", "");
        }
    }, [watchedDProvinceId, form]);

    useEffect(() => {
        if (formState) {
            console.log(formState)
            if (formState.status === StatusCode.Success) {
                toast.success(formState.message || "آگهی با موفقیت ثبت شد");
                // router.push("/profile/projects/passenger");
            } else {
                toast.error(formState.message || "خطا در ثبت آگهی");
                if (formState.errors) {
                    Object.entries(formState.errors).forEach(([field, messages]) => {
                        form.setError(field as keyof PassengerFormData, {
                            message: messages[0]
                        });
                    });
                }
            }
        }
    }, [formState, form, router]);

    const onSubmit = async (data: PassengerFormData) => {
        startTransition(async () => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });
            formAction(formData);
        });
    };

    return (
        <div>
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="lg:w-2/3">
                        <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                            <h1 className="text-title text-lg font-medium mb-5">
                                افزودن آگهی سفر جدید
                            </h1>
                            <div className="flex flex-col gap-5">
                                <RHFInput
                                    name="title"
                                    placeholder={tCommon("inputs.adTitle")}
                                    type="text"
                                />
                                <RHFTextarea
                                    name="description"
                                    placeholder={tCommon("inputs.adDescription")}
                                />
                                <RHFTextarea
                                    name="address"
                                    placeholder={tCommon("inputs.address")}
                                />
                                <RHFUpload
                                    uploadType="image"
                                    name="image"
                                    placeholder={tCommon("inputs.ticketImage")}
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5 mt-5">
                            <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                                <h1 className="text-title font-medium mb-5">
                                    مشخصات مبدا
                                </h1>
                                <div className="flex flex-col gap-5">
                                    <RHFCombobox
                                        name="o_country_id"
                                        placeholder={tCommon("inputs.originCountry")}
                                        options={countryOptions}
                                    />
                                    <RHFCombobox
                                        name="o_province_id"
                                        placeholder={tCommon("inputs.originProvince")}
                                        options={oProvinceOptions}
                                        loading={loadingOProvinces}
                                    />
                                    <RHFCombobox
                                        name="o_city_id"
                                        placeholder={tCommon("inputs.originCity")}
                                        options={oCityOptions}
                                        loading={loadingOCities}
                                    />
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                                <h1 className="text-title font-medium mb-5">
                                    مشخصات مقصد
                                </h1>
                                <div className="flex flex-col gap-5">
                                    <RHFCombobox
                                        name="d_country_id"
                                        placeholder={tCommon("inputs.destinationCountry")}
                                        options={countryOptions}
                                    />
                                    <RHFCombobox
                                        name="d_province_id"
                                        placeholder={tCommon("inputs.destinationProvince")}
                                        options={dProvinceOptions}
                                        loading={loadingDProvinces}
                                    />
                                    <RHFCombobox
                                        name="d_city_id"
                                        placeholder={tCommon("inputs.destinationCity")}
                                        options={dCityOptions}
                                        loading={loadingDCities}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3">
                        <div className="bg-white p-5 rounded-2xl lg:rounded-3xl sticky">
                            <h1 className="text-title font-medium mb-5">
                                مشخصات سفر
                            </h1>
                            <div className="flex flex-col gap-5">
                                <RHFCombobox
                                    name="path_type"
                                    placeholder={tCommon("inputs.pathType")}
                                    options={pathTypeOptions}
                                />
                                <RHFDatePicker
                                    name="send_date"
                                    placeholder={tCommon("inputs.selectDate")}
                                />
                                <RHFInput
                                    name="weight"
                                    placeholder={tCommon("inputs.emptySize")}
                                    type="number"
                                />
                                <RHFInput
                                    name="amount"
                                    placeholder={tCommon("inputs.suggestAmount")}
                                    type="number"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-6"
                                isLoading={isPending}
                            >
                                {tCommon("buttons.submitAd")}
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};