'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { DatePicker } from "@/ui/datepicker";

interface RHFDatePickerProps {
    name: string;
    label?: string;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    minDate?: Date;
    maxDate?: Date;
}

export const RHFDatePicker: React.FC<RHFDatePickerProps> = ({
    name,
    label,
    className,
    placeholder,
    disabled = false,
    minDate,
    maxDate,
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel className="text-text mb-1">{label}</FormLabel>}
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