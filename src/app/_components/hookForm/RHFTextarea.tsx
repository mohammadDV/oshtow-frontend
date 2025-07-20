'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Textarea } from "@/ui/textarea";

interface RHFTextareaProps extends React.ComponentProps<"textarea"> {
    name: string;
    label?: string;
    className?: string;
}

export const RHFTextarea: React.FC<RHFTextareaProps> = ({
    name,
    label,
    className,
    ...props
}) => {
    const { control } = useFormContext();

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel className="text-text mb-1">{label}</FormLabel>}
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