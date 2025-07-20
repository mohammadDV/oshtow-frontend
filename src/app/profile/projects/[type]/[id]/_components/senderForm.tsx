"use client"

import { getActiveCategories } from "@/app/(main)/_components/advancedSearch/searchServices";
import { getCities, getProvinces } from "@/app/(main)/projects/_api/getLocations";
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
import { ProjectEditResponse } from "@/types/project.type";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { createSenderAction, editSenderAction, SenderService } from "../_api/senderAction";

interface SenderForm {
    projectData?: ProjectEditResponse;
    id: string;
}

export const SenderForm = ({ projectData, id }: SenderForm) => {
    const router = useRouter();
    const tCommon = useCommonTranslation();
    const tPages = usePagesTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<SenderService | null, FormData>(
        id === "create" ? createSenderAction : editSenderAction,
        null
    );

    const [oProvinces, setOProvinces] = useState<any[]>([]);
    const [oCities, setOCities] = useState<any[]>([]);
    const [dProvinces, setDProvinces] = useState<any[]>([]);
    const [dCities, setDCities] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loadingOProvinces, setLoadingOProvinces] = useState(false);
    const [loadingOCities, setLoadingOCities] = useState(false);
    const [loadingDProvinces, setLoadingDProvinces] = useState(false);
    const [loadingDCities, setLoadingDCities] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const { response: countriesResponse } = useFetchData<Country[]>(apiUrls.locations.countries);

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

    const senderSchema = z.object({
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
        categories: z.string().min(1, tCommon("validation.required.thisField")),
        send_date: z.string().min(1, tCommon("validation.required.thisField")),
        receive_date: z.string().min(1, tCommon("validation.required.thisField")),
        dimensions: z.string().min(1, tCommon("validation.required.thisField")),
        weight: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.weight")
            }),
        amount: z.string({
            required_error: tCommon("validation.required.thisField")
        })
            .min(1, tCommon("validation.required.thisField"))
            .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
                message: tCommon("validation.invalid.amount")
            }),
    });

    type SenderFormData = z.infer<typeof senderSchema>;

    const form = useZodForm(senderSchema, {
        defaultValues: {
            title: projectData?.title || '',
            description: projectData?.description || '',
            address: projectData?.address || '',
            image: projectData?.image || '',
            o_country_id: projectData?.o_country_id?.toString() || '',
            o_province_id: projectData?.o_province_id?.toString() || '',
            o_city_id: projectData?.o_city_id?.toString() || '',
            d_country_id: projectData?.d_country_id?.toString() || '',
            d_province_id: projectData?.d_province_id?.toString() || '',
            d_city_id: projectData?.d_city_id?.toString() || '',
            categories: projectData?.categories?.[0]?.id?.toString() || '',
            send_date: projectData?.send_date || '',
            receive_date: projectData?.receive_date || '',
            weight: projectData?.weight?.toString() || '',
            amount: projectData?.amount.toString() || '',
            dimensions: projectData?.dimensions || ''
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

    const categoryOptions = categories?.map(category => ({
        label: category.title,
        value: category.id.toString(),
    })) || [];

    useEffect(() => {
        const fetchCategories = async () => {
            setLoadingCategories(true);
            try {
                const response = await getActiveCategories();
                setCategories(response || []);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setCategories([]);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchOriginProvinces = async () => {
            if (watchedOCountryId) {
                setLoadingOProvinces(true);
                setOProvinces([]);
                setOCities([]);
                form.setValue("o_province_id", "");
                form.setValue("o_city_id", "");

                try {
                    const response = await getProvinces(parseInt(watchedOCountryId));
                    setOProvinces(response || []);

                    if (projectData?.o_province_id && response?.some((p: any) => p.id === projectData.o_province_id)) {
                        form.setValue("o_province_id", projectData.o_province_id.toString());
                    }
                } catch (error) {
                    console.error("Error fetching origin provinces:", error);
                    setOProvinces([]);
                } finally {
                    setLoadingOProvinces(false);
                }
            } else {
                setOProvinces([]);
                setOCities([]);
                form.setValue("o_province_id", "");
                form.setValue("o_city_id", "");
            }
        };

        fetchOriginProvinces();
    }, [watchedOCountryId, form, projectData?.o_province_id]);

    useEffect(() => {
        const fetchOriginCities = async () => {
            if (watchedOProvinceId) {
                setLoadingOCities(true);
                setOCities([]);
                form.setValue("o_city_id", "");

                try {
                    const response = await getCities(parseInt(watchedOProvinceId));
                    setOCities(response || []);

                    if (projectData?.o_city_id && response?.some((c: any) => c.id === projectData.o_city_id)) {
                        form.setValue("o_city_id", projectData.o_city_id.toString());
                    }
                } catch (error) {
                    console.error("Error fetching origin cities:", error);
                    setOCities([]);
                } finally {
                    setLoadingOCities(false);
                }
            } else {
                setOCities([]);
                form.setValue("o_city_id", "");
            }
        };

        fetchOriginCities();
    }, [watchedOProvinceId, form, projectData?.o_city_id]);

    useEffect(() => {
        const fetchDestinationProvinces = async () => {
            if (watchedDCountryId) {
                setLoadingDProvinces(true);
                setDProvinces([]);
                setDCities([]);
                form.setValue("d_province_id", "");
                form.setValue("d_city_id", "");

                try {
                    const response = await getProvinces(parseInt(watchedDCountryId));
                    setDProvinces(response || []);

                    if (projectData?.d_province_id && response?.some((p: any) => p.id === projectData.d_province_id)) {
                        form.setValue("d_province_id", projectData.d_province_id.toString());
                    }
                } catch (error) {
                    console.error("Error fetching destination provinces:", error);
                    setDProvinces([]);
                } finally {
                    setLoadingDProvinces(false);
                }
            } else {
                setDProvinces([]);
                setDCities([]);
                form.setValue("d_province_id", "");
                form.setValue("d_city_id", "");
            }
        };

        fetchDestinationProvinces();
    }, [watchedDCountryId, form, projectData?.d_province_id]);

    useEffect(() => {
        const fetchDestinationCities = async () => {
            if (watchedDProvinceId) {
                setLoadingDCities(true);
                setDCities([]);
                form.setValue("d_city_id", "");

                try {
                    const response = await getCities(parseInt(watchedDProvinceId));
                    setDCities(response || []);

                    if (projectData?.d_city_id && response?.some((c: any) => c.id === projectData.d_city_id)) {
                        form.setValue("d_city_id", projectData.d_city_id.toString());
                    }
                } catch (error) {
                    console.error("Error fetching destination cities:", error);
                    setDCities([]);
                } finally {
                    setLoadingDCities(false);
                }
            } else {
                setDCities([]);
                form.setValue("d_city_id", "");
            }
        };

        fetchDestinationCities();
    }, [watchedDProvinceId, form, projectData?.d_city_id]);

    useEffect(() => {
        if (formState) {
            if (formState.status === StatusCode.Success) {
                toast.success(formState?.message || tCommon("messages.success"));
                router.push("/profile/projects/sender");
            } else {
                toast.error(formState?.message || tCommon("messages.error"));
                if (formState.errors) {
                    Object.entries(formState.errors).forEach(([field, messages]) => {
                        form.setError(field as keyof SenderFormData, {
                            message: messages[0]
                        });
                    });
                }
            }
        }
    }, [formState, form, router, tCommon]);

    const onSubmit = async (data: SenderFormData) => {
        startTransition(async () => {
            const formData = new FormData();
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value.toString());
                }
            });
            formData.append("id", id);
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
                                {id === "create"
                                    ? tPages("profile.projects.addNewSenderAd")
                                    : tPages("profile.projects.editSenderAd")}
                            </h1>
                            <div className="flex flex-col gap-6">
                                <RHFInput
                                    name="title"
                                    label={tCommon("inputs.adTitle")}
                                    type="text"
                                />
                                <RHFTextarea
                                    name="description"
                                    label={tCommon("inputs.adDescription")}
                                />
                                <RHFTextarea
                                    name="address"
                                    label={tCommon("inputs.address")}
                                />
                                <RHFUpload
                                    uploadType="image"
                                    name="image"
                                    label={tCommon("inputs.ticketImage")}
                                />
                            </div>
                        </div>
                        <div className="grid lg:grid-cols-2 gap-5 mt-5">
                            <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                                <h1 className="text-title font-medium mb-5">
                                    {tPages("profile.projects.originInfo")}
                                </h1>
                                <div className="flex flex-col gap-6">
                                    <RHFCombobox
                                        name="o_country_id"
                                        label={tCommon("inputs.originCountry")}
                                        options={countryOptions}
                                    />
                                    <RHFCombobox
                                        name="o_province_id"
                                        label={tCommon("inputs.originProvince")}
                                        options={oProvinceOptions}
                                        loading={loadingOProvinces}
                                    />
                                    <RHFCombobox
                                        name="o_city_id"
                                        label={tCommon("inputs.originCity")}
                                        options={oCityOptions}
                                        loading={loadingOCities}
                                    />
                                </div>
                            </div>
                            <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                                <h1 className="text-title font-medium mb-5">
                                    {tPages("profile.projects.destinationInfo")}
                                </h1>
                                <div className="flex flex-col gap-6">
                                    <RHFCombobox
                                        name="d_country_id"
                                        label={tCommon("inputs.destinationCountry")}
                                        options={countryOptions}
                                    />
                                    <RHFCombobox
                                        name="d_province_id"
                                        label={tCommon("inputs.destinationProvince")}
                                        options={dProvinceOptions}
                                        loading={loadingDProvinces}
                                    />
                                    <RHFCombobox
                                        name="d_city_id"
                                        label={tCommon("inputs.destinationCity")}
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
                                {tPages("profile.projects.senderInfo")}
                            </h1>
                            <div className="flex flex-col gap-6">
                                <RHFCombobox
                                    name="categories"
                                    label={tCommon("inputs.selectCategory")}
                                    options={categoryOptions}
                                    loading={loadingCategories}
                                />
                                <RHFDatePicker
                                    name="send_date"
                                    label={tCommon("inputs.sendDate")}
                                />
                                <RHFDatePicker
                                    name="receive_date"
                                    label={tCommon("inputs.receiveDate")}
                                />
                                <RHFInput
                                    name="weight"
                                    label={tCommon("inputs.weight")}
                                    type="number"
                                />
                                <RHFInput
                                    name="amount"
                                    label={tCommon("inputs.suggestAmount")}
                                    type="number"
                                />
                                <RHFInput
                                    name="dimensions"
                                    label={tCommon("inputs.dimensions")}
                                    type="text"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full mt-6"
                                isLoading={isPending}
                            >
                                {id === "create" ? tCommon("buttons.submitAd") : tCommon("buttons.editAd")}
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};