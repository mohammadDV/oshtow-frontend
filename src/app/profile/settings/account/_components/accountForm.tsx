"use client"

import { RHFAvatar } from "@/app/_components/hookForm/RHFAvatar";
import { RHFCombobox } from "@/app/_components/hookForm/RHFCombobox";
import { RHFInput } from "@/app/_components/hookForm/RHFInput";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { RHFUpload } from "@/app/_components/hookForm/RHFUpload";
import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { regex } from "@/constants/regex";
import { useFetchData } from "@/hooks/useFetchData";
import { useCommonTranslation } from "@/hooks/useTranslation"
import { useZodForm } from "@/hooks/useZodForm";
import { Country } from "@/types/location.type";
import { Button } from "@/ui/button";
import { useActionState, useEffect, useState, useTransition } from "react";
import { FormProvider } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { getProvinces, getCities } from "../_api/getLocations";
import { accountAction, AccountService } from "../_api/accountAction";
import { useGetUser } from "@/hooks/useGetUser";
import { UserAccountResponse, UserData } from "@/types/user.type";
import { useRouter } from "next/navigation";

interface AccountFormProps {
    accountData: UserAccountResponse;
}

export const AccountForm = ({ accountData }: AccountFormProps) => {
    const router = useRouter();
    const { userData } = useGetUser<UserData>();
    const t = useCommonTranslation();
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<AccountService | null, FormData>(
        accountAction,
        null
    );

    const [provinces, setProvinces] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loadingProvinces, setLoadingProvinces] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const { response: countriesResponse } = useFetchData<Country[]>(apiUrls.locations.countries);

    const countryOptions = countriesResponse?.map(country => ({
        label: country.title,
        value: country.id.toString(),
    })) || [];

    const accountSchema = z.object({
        first_name: z.string().min(1, t("validation.required.firstName")),
        last_name: z.string().min(1, t("validation.required.lastName")),
        nickname: z.string().min(1, t("validation.required.nickname")),
        mobile: z.string({ required_error: t("validation.required.mobile") })
            .regex(regex.phone, t("validation.invalid.mobile")),
        country_id: z.string().min(1, t("validation.required.thisField")),
        province_id: z.string().min(1, t("validation.required.thisField")),
        city_id: z.string().min(1, t("validation.required.thisField")),
        address: z.string().min(1, t("validation.required.thisField")),
        biography: z.string().optional(),
        profile_photo_path: z.string().optional(),
        bg_photo_path: z.string().optional(),
    });

    type AccountFormData = z.infer<typeof accountSchema>;

    const form = useZodForm(accountSchema, {
        defaultValues: {
            first_name: accountData?.first_name || '',
            last_name: accountData?.last_name || '',
            nickname: accountData?.nickname || '',
            mobile: accountData?.mobile || '',
            country_id: accountData?.country_id.toString() || '',
            province_id: accountData?.province_id.toString() || '',
            city_id: accountData?.city_id.toString() || '',
            address: accountData?.address || '',
            biography: accountData?.biography || '',
            profile_photo_path: accountData?.profile_photo_path || '',
            bg_photo_path: accountData?.bg_photo_path || ''
        }
    });

    const watchedCountryId = form.watch("country_id");
    const watchedProvinceId = form.watch("province_id");

    const provinceOptions = provinces?.map(province => ({
        label: province.title,
        value: province.id.toString(),
    })) || [];

    const cityOptions = cities?.map(city => ({
        label: city.title,
        value: city.id.toString(),
    })) || [];

    useEffect(() => {
        if (watchedCountryId) {
            setLoadingProvinces(true);
            setProvinces([]);
            setCities([]);
            form.setValue("province_id", "");
            form.setValue("city_id", "");

            getProvinces(parseInt(watchedCountryId))
                .then((response) => {
                    setProvinces(response || []);
                    // Restore default province value after options are loaded
                    if (accountData?.province_id && response?.some((p: any) => p.id === accountData.province_id)) {
                        form.setValue("province_id", accountData.province_id.toString());
                    }
                })
                .catch((error) => {
                    console.error("Error fetching provinces:", error);
                    setProvinces([]);
                })
                .finally(() => {
                    setLoadingProvinces(false);
                });
        } else {
            setProvinces([]);
            setCities([]);
            form.setValue("province_id", "");
            form.setValue("city_id", "");
        }
    }, [watchedCountryId, form, accountData?.province_id]);

    useEffect(() => {
        if (watchedProvinceId) {
            setLoadingCities(true);
            setCities([]);
            form.setValue("city_id", "");

            getCities(parseInt(watchedProvinceId))
                .then((response) => {
                    setCities(response || []);
                    // Restore default city value after options are loaded
                    if (accountData?.city_id && response?.some((c: any) => c.id === accountData.city_id)) {
                        form.setValue("city_id", accountData.city_id.toString());
                    }
                })
                .catch((error) => {
                    console.error("Error fetching cities:", error);
                    setCities([]);
                })
                .finally(() => {
                    setLoadingCities(false);
                });
        } else {
            setCities([]);
            form.setValue("city_id", "");
        }
    }, [watchedProvinceId, form, accountData?.city_id]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(!!formState?.errors
                ? t("messages.errorFields")
                : formState?.message || t("messages.error"));

            if (formState.errors) {
                Object.entries(formState.errors).forEach(([fieldName, fieldErrors]) => {
                    if (fieldErrors && fieldErrors.length > 0) {
                        form.setError(fieldName as keyof AccountFormData, {
                            type: "server",
                            message: fieldErrors[0]
                        });
                    }
                });
            }
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || t("messages.updated"));
            router.push("/auth/check-verification?backUrl=/profile/settings/account");
        }
    }, [formState, form]);

    const onSubmit = async (data: AccountFormData) => {

        const formData = new FormData();
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("nickname", data.nickname);
        formData.append("mobile", data.mobile);
        formData.append("country_id", data.country_id);
        formData.append("province_id", data.province_id);
        formData.append("city_id", data.city_id);
        formData.append("address", data.address);
        formData.append("biography", data.biography || "");
        formData.append("profile_photo_path", data.profile_photo_path || "");
        formData.append("bg_photo_path", data.bg_photo_path || "");
        formData.append("id", userData?.user.id.toString() || "");

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <div className="mt-8 lg:max-w-2xl mx-auto">
            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4 md:gap-5">
                        <div className="md:mb-1.5">
                            <RHFAvatar name="profile_photo_path" />
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 justify-between">
                            <RHFInput
                                name="first_name"
                                placeholder={t("inputs.firstName")}
                                type="text"
                            />
                            <RHFInput
                                name="last_name"
                                placeholder={t("inputs.lastName")}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 justify-between">
                            <RHFInput
                                name="nickname"
                                placeholder={t("inputs.nickname")}
                                type="text"
                            />
                            <RHFInput
                                name="mobile"
                                placeholder={t("inputs.mobile")}
                                type="text"
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 justify-between">
                            <RHFCombobox
                                name="country_id"
                                placeholder={t("inputs.country")}
                                options={countryOptions}
                            />
                            <RHFCombobox
                                name="province_id"
                                placeholder={t("inputs.province")}
                                options={provinceOptions}
                                loading={loadingProvinces}
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 justify-between">
                            <RHFCombobox
                                name="city_id"
                                placeholder={t("inputs.city")}
                                options={cityOptions}
                                loading={loadingCities}
                            />
                            <RHFUpload
                                uploadType="image"
                                name="bg_photo_path"
                                placeholder={t("inputs.profileBanner")}
                            />
                        </div>
                        <div>
                            <RHFTextarea
                                name="address"
                                placeholder={t("inputs.address")}
                            />
                        </div>
                        <div>
                            <RHFTextarea
                                name="biography"
                                placeholder={t("inputs.biography")}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-end mt-6">
                        <Button
                            type="submit"
                            variant="default"
                            size="default"
                            className="flex-1 md:flex-initial"
                            isLoading={isPending}
                        >
                            {t("buttons.saveChanges")}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}