'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "@/ui/input";

interface RHFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
    trailingLabel?: string
}

export const RHFInput: React.FC<RHFInputProps> = ({
    name,
    label,
    className,
    trailingLabel,
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
                        <div className="relative">
                            <Input
                                {...field}
                                {...props}
                                value={field.value ?? ''}
                                className={className}
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