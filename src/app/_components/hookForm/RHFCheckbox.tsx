'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Checkbox } from "@/ui/checkbox";
import { cn } from "@/lib/utils";

interface RHFCheckboxProps {
    id?: string;
    name: string;
    label?: string;
    className?: string;
    disabled?: boolean;
}

export const RHFCheckbox: React.FC<RHFCheckboxProps> = ({
    id,
    name,
    label,
    className,
    disabled,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={cn("flex flex-row items-center rtl:space-x-reverse", className)}>
                    <FormControl>
                        <Checkbox
                            id={id}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={disabled}
                            {...props}
                        />
                    </FormControl>
                    {label && (
                        <FormLabel className="font-normal cursor-pointer">
                            {label}
                        </FormLabel>
                    )}
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};