'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { DatePicker } from "@/ui/datepicker";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Icon } from "@/ui/icon";
import { useState } from "react";

interface RHFDatePickerProps {
    name: string;
    label?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
    tooltip?: string;
}

export const RHFDatePicker: React.FC<RHFDatePickerProps> = ({
    name,
    label,
    className,
    placeholder,
    disabled = false,
    minDate,
    maxDate,
    tooltip,
}) => {
    const { control } = useFormContext();
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

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
                        <DatePicker
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            placeholder={placeholder}
                            className={cn(
                                fieldState.error && "border-destructive/50",
                                className
                            )}
                            disabled={disabled}
                            minDate={minDate}
                            maxDate={maxDate}
                        />
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};