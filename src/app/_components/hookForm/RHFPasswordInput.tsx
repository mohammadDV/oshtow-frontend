'use client'

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "@/ui/input";
import { Icon } from "@/ui/icon";

interface RHFPasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    className?: string;
}

export const RHFPasswordInput: React.FC<RHFPasswordInputProps> = ({
    name,
    label,
    className,
    ...props
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                {...props}
                                className={className}
                                type={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute flex items-center justify-center left-3 bottom-1/2 translate-y-1/2 cursor-pointer"
                            >
                                <Icon icon={showPassword ? 'solar--eye-closed-line-duotone' : 'solar--eye-line-duotone'}
                                    className="text-text"
                                    sizeClass="size-5" />
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};
