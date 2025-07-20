'use client'

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Icon } from "@/ui/icon";
import { uploadImageAction, uploadVideoAction, uploadFileAction, UploadResponse } from "./formAction";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { StatusCode } from "@/constants/enums";

type UploadType = 'image' | 'video' | 'file';

interface RHFUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
    name: string;
    label?: string;
    className?: string;
    defaultValue?: string;
    placeholder?: string;
    uploadType: UploadType;
}

export const RHFUpload: React.FC<RHFUploadProps> = ({
    name,
    label,
    className,
    defaultValue,
    placeholder,
    uploadType,
    ...rest
}) => {
    const t = useCommonTranslation();
    const { control } = useFormContext();
    const [fileName, setFileName] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadError, setUploadError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement | null>(null);

    const getAcceptTypes = () => {
        switch (uploadType) {
            case 'image':
                return 'image/*';
            case 'video':
                return 'video/*';
            case 'file':
                return '*';
            default:
                return '*';
        }
    };

    const getUploadAction = () => {
        switch (uploadType) {
            case 'image':
                return uploadImageAction;
            case 'video':
                return uploadVideoAction;
            case 'file':
                return uploadFileAction;
            default:
                return uploadFileAction;
        }
    };

    const getFormDataKey = () => {
        switch (uploadType) {
            case 'image':
                return 'image';
            case 'video':
                return 'video';
            case 'file':
                return 'file';
            default:
                return 'file';
        }
    };

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setIsUploading(true);
        setUploadError("");

        try {
            const formData = new FormData();
            formData.append(getFormDataKey(), file);

            const uploadAction = getUploadAction();
            const response: UploadResponse = await uploadAction(formData);

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
        setFileName("");
        setUploadError("");
        onChange("");
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const getPlaceholderText = () => {
        if (placeholder) return placeholder;
        switch (uploadType) {
            case 'image':
                return t("inputs.selectImage");
            case 'video':
                return t("inputs.selectVideo");
            case 'file':
                return t("inputs.selectFile");
            default:
                return t("inputs.selectFile");
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel className="text-text mb-1">{label}</FormLabel>}
                    <FormControl>
                        <div className="relative">
                            <div className={cn(
                                "flex text-title border border-border h-11 w-full min-w-0 rounded-lg items-center justify-between px-3 py-2.5 text-sm",
                                fieldState.error || uploadError ? "border-destructive/50" : "",
                                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive/50"
                            )}>
                                <label
                                    htmlFor={`${name}-input`}
                                    className={cn(
                                        "flex-1 flex text-text mb-1 items-center gap-2 truncate cursor-pointer transition",
                                        isUploading ? "cursor-not-allowed" : "",
                                        className
                                    )}
                                >
                                    {isUploading ? (
                                        <Icon icon="line-md--loading-twotone-loop" sizeClass="size-5" />
                                    ) : (
                                        <Icon icon="solar--paperclip-linear" sizeClass="size-5" />
                                    )}
                                    <span className="truncate max-w-56">
                                        {isUploading
                                            ? t("messages.uploading")
                                            : (fileName || field.value || placeholder || getPlaceholderText())}
                                    </span>
                                </label>

                                {(fileName || field.value) && !isUploading && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, field.onChange)}
                                        className="text-destructive transition cursor-pointer"
                                    >
                                        <Icon icon="solar--trash-bin-trash-outline" sizeClass="size-5" />
                                    </button>
                                )}
                            </div>

                            <input
                                ref={inputRef}
                                id={`${name}-input`}
                                type="file"
                                accept={getAcceptTypes()}
                                className="hidden"
                                onChange={(e) => handleChange(e, field.onChange)}
                                disabled={isUploading}
                                {...rest}
                            />
                        </div>
                    </FormControl>
                    {uploadError && (
                        <p className="text-sm text-destructive">{uploadError}</p>
                    )}
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
