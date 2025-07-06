'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Combobox } from "@/ui/combobox"

export type OptionTypes = {
    label: string,
    value: string
}

interface RHFComboboxProps {
    name: string
    options: OptionTypes[]
    label?: string
    placeholder?: string
    className?: string
}

export const RHFCombobox: React.FC<RHFComboboxProps> = ({
    name,
    options,
    label,
    placeholder = "انتخاب کنید",
    className,
}) => {
    const { control } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Combobox
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder={placeholder}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    )
}
