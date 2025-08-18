'use client'

import * as React from "react"
import { useFormContext } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { Combobox } from "@/ui/combobox"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip"
import { Icon } from "@/ui/icon"
import { useState } from "react"

export type OptionTypes = {
    label: string,
    value: string
}

interface RHFComboboxProps {
    name: string;
    options: OptionTypes[];
    label?: string;
    placeholder?: string;
    className?: string;
    loading?: boolean;
    tooltip?: string;
}

export const RHFCombobox: React.FC<RHFComboboxProps> = ({
    name,
    options,
    label,
    placeholder = "انتخاب کنید",
    className,
    loading,
    tooltip
}) => {
    const { control } = useFormContext()
    const [isTooltipOpen, setIsTooltipOpen] = useState(false)

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
                        <Combobox
                            options={options}
                            value={field.value}
                            onChange={field.onChange}
                            loading={loading}
                            placeholder={placeholder}
                            className={cn(
                                fieldState.error && "border-destructive/50",
                                className
                            )}
                        />
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    )
}
