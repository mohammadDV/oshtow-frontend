'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Textarea } from "@/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/ui/tooltip";
import { Icon } from "@/ui/icon";
import { useState } from "react";

interface RHFTextareaProps extends React.ComponentProps<"textarea"> {
    name: string;
    label?: string;
    className?: string;
    tooltip?: string;
}

export const RHFTextarea: React.FC<RHFTextareaProps> = ({
    name,
    label,
    className,
    tooltip,
    ...props
}) => {
    const { control } = useFormContext();
    const [isTooltipOpen, setIsTooltipOpen] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
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
                        <Textarea
                            {...field}
                            {...props}
                            value={field.value ?? ''}
                            className={className}
                        />
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};