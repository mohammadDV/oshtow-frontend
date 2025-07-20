'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "@/ui/input";

interface RHFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
}

export const RHFInput: React.FC<RHFInputProps> = ({
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
                        <Input
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