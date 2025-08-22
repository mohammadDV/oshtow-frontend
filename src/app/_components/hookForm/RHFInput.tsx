'use client'

import { cn, convertPersianToEnglish } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "@/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Icon } from "@/ui/icon";
import { useState } from "react";

interface RHFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
    trailingLabel?: string;
    tooltip?: string;
    convertPersianNumbers?: boolean;
}

export const RHFInput: React.FC<RHFInputProps> = ({
    name,
    label,
    className,
    trailingLabel,
    tooltip,
    convertPersianNumbers = false,
    ...props
}) => {
    const { control } = useFormContext();
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        let inputValue = e.target.value;

        if (convertPersianNumbers) {
            inputValue = convertPersianToEnglish(inputValue);
        }

        onChange(inputValue);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && (
                        <div className="flex items-center gap-1.5 mb-1">
                            <FormLabel className="text-text">{label}</FormLabel>
                            {tooltip && (
                                <Tooltip open={isTooltipOpen} onOpenChange={setIsTooltipOpen}>
                                    <TooltipTrigger asChild>
                                        <button
                                            type="button"
                                            className="cursor-help touch-manipulation"
                                            onClick={() => setIsTooltipOpen(!isTooltipOpen)}
                                            onBlur={() => setIsTooltipOpen(false)}
                                        >
                                            <Icon icon="solar--info-circle-outline" className="text-text" sizeClass="size-4" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent className="max-w-xs" side="top">
                                        <p className="text-sm">{tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    )}
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                {...props}
                                value={field.value ?? ''}
                                onChange={convertPersianNumbers ? (e) => handleInputChange(e, field.onChange) : field.onChange}
                                className={className}
                                aria-invalid={!!fieldState.error}
                            />
                            {trailingLabel && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-caption pointer-events-none">
                                    {trailingLabel}
                                </div>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};