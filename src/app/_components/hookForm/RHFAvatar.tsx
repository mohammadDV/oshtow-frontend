'use client'

import { cn, createFileUrl } from "@/lib/utils";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Icon } from "@/ui/icon";
import { uploadImageAction, UploadResponse } from "./formAction";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { StatusCode } from "@/constants/enums";

interface RHFAvatarProps {
    name: string;
    label?: string;
    className?: string;
    defaultValue?: string;
}

export const RHFAvatar: React.FC<RHFAvatarProps> = ({
    name,
    label,
    className,
    defaultValue
}) => {
    const t = useCommonTranslation();
    const { control } = useFormContext();
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxFileSize = 5 * 1024 * 1024;
        if (file.size > maxFileSize) {
            setUploadError(t("validation.invalid.fileSizeError"));
            onChange("");
            if (inputRef.current) {
                inputRef.current.value = "";
            }
            return;
        }

        setIsUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append('image', file);

            const response: UploadResponse = await uploadImageAction(formData);

            if (response.status === StatusCode.Success && response.url) {
                onChange(response.url);
            } else {
                setUploadError(response.message || t("validation.invalid.fileError"));
                onChange("");
            }
        } catch (error) {
            setUploadError(t("validation.invalid.fileError"));
            onChange("");
        } finally {
            setIsUploading(false);
        }
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, onChange: (...event: any[]) => void) => {
        e.stopPropagation();
        setUploadError("");
        onChange("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className={cn("flex items-center gap-5", className)}>
                            <div className="relative">
                                <img
                                    src={(field.value && createFileUrl(field.value)) || (defaultValue && createFileUrl(defaultValue)) || null}
                                    width={78}
                                    height={78}
                                    className="size-20 rounded-full object-cover bg-light"
                                />
                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-hint rounded-full">
                                        <Icon icon="line-md--loading-twotone-loop" sizeClass="size-6" className="text-white" />
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor={`${name}-input`}
                                    className={cn(
                                        "flex items-center gap-1.5 cursor-pointer transition",
                                        isUploading ? "cursor-not-allowed" : ""
                                    )}
                                >
                                    <Icon icon="solar--pen-2-outline" sizeClass="size-6" className="text-primary" />
                                    <span className="text-primary font-normal">
                                        {isUploading ? t("messages.uploading") : "ویرایش آواتار"}
                                    </span>
                                </label>

                                {field.value && !isUploading && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, field.onChange)}
                                        className="flex items-center gap-1.5 text-destructive transition cursor-pointer self-start"
                                    >
                                        <Icon icon="solar--trash-bin-trash-outline" sizeClass="size-6" />
                                        <span className="">حذف آواتار</span>
                                    </button>
                                )}

                                {uploadError && (
                                    <span className="text-sm text-destructive">{uploadError}</span>
                                )}
                            </div>

                            <input
                                ref={inputRef}
                                id={`${name}-input`}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleChange(e, field.onChange)}
                                disabled={isUploading}
                            />
                        </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};