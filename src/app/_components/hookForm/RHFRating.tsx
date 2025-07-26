'use client'

import { cn } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Icon } from "@/ui/icon";
import { useState } from "react";

interface RHFRatingProps {
    name: string;
    label?: string;
    className?: string;
    disabled?: boolean;
    maxRating?: number;
}

export const RHFRating: React.FC<RHFRatingProps> = ({
    name,
    label,
    className,
    disabled = false,
    maxRating = 5
}) => {
    const { control } = useFormContext();
    const [hoverRating, setHoverRating] = useState<number>(0);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <FormItem className="gap-1.5 w-full">
                    {label && <FormLabel className="text-text mb-0.5">{label}</FormLabel>}
                    <FormControl>
                        <div className={cn("flex items-center gap-0.5", className)}>
                            {Array.from({ length: maxRating }, (_, index) => {
                                const ratingValue = index + 1;
                                const currentRating = parseInt(field.value) || 0;
                                const isActive = ratingValue <= (hoverRating || currentRating);

                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => field.onChange(ratingValue.toString())}
                                        onMouseEnter={() => !disabled && setHoverRating(ratingValue)}
                                        onMouseLeave={() => !disabled && setHoverRating(0)}
                                        className={cn(
                                            "transition-colors duration-200",
                                            disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"
                                        )}
                                    >
                                        <Icon
                                            icon={isActive ? "solar--star-bold" : "solar--star-outline"}
                                            sizeClass="size-6"
                                            className={cn(
                                                "transition-colors duration-200",
                                                isActive ? "text-amber-400" : "text-gray-200",
                                                !disabled && "hover:text-amber-400"
                                            )}
                                        />
                                    </button>
                                );
                            })}
                            {field.value && (
                                <span className="mr-1 text-sm text-text">
                                    ({field.value}/{maxRating})
                                </span>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage className="text-sm" />
                </FormItem>
            )}
        />
    );
};