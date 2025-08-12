'use client'

import { cn, putCommas } from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "@/ui/input";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useState, useEffect } from "react";

interface RHFCurrencyProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
    name: string;
    label?: string;
    className?: string;
    showCurrencyLabel?: boolean;
    currencyLabel?: string;
}

export const RHFCurrency: React.FC<RHFCurrencyProps> = ({
    name,
    label,
    className,
    showCurrencyLabel = true,
    currencyLabel,
    ...props
}) => {
    const { control } = useFormContext();
    const t = useCommonTranslation();
    const [displayValue, setDisplayValue] = useState<string>("");

    const formatNumber = (value: string): string => {
        const numericValue = value.replace(/[^\d]/g, '');
        
        if (!numericValue) return '';
        
        return putCommas(Number(numericValue));
    };

    const parseNumber = (value: string): string => {
        return value.replace(/,/g, '');
    };

    const convertPersianToEnglish = (str: string): string => {
        const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
        const englishDigits = '0123456789';
        
        return str.replace(/[۰-۹]/g, (char) => {
            return englishDigits[persianDigits.indexOf(char)];
        });
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void
    ) => {
        let inputValue = e.target.value;
        
        inputValue = convertPersianToEnglish(inputValue);
        
        const numericValue = inputValue.replace(/[^\d]/g, '');
        
        const formattedValue = formatNumber(numericValue);
        setDisplayValue(formattedValue);
        
        onChange(numericValue);
    };

    return (
        <FormField
            control={control}
            name={name}
            render={({ field, fieldState }) => {
                useEffect(() => {
                    if (field.value !== undefined && field.value !== null) {
                        setDisplayValue(formatNumber(field.value.toString()));
                    } else {
                        setDisplayValue('');
                    }
                }, [field.value]);

                return (
                    <FormItem className="gap-1.5 w-full">
                        {label && <FormLabel className="text-text mb-1">{label}</FormLabel>}
                        <FormControl>
                            <div className="relative">
                                <Input
                                    {...props}
                                    value={displayValue}
                                    onChange={(e) => handleInputChange(e, field.onChange)}
                                    onBlur={field.onBlur}
                                    name={field.name}
                                    ref={field.ref}
                                    className={cn(
                                        showCurrencyLabel ? "pl-16" : "",
                                        className
                                    )}
                                    inputMode="numeric"
                                    pattern="[0-9,]*"
                                    aria-invalid={!!fieldState.error}
                                />
                                {showCurrencyLabel && (
                                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-caption pointer-events-none">
                                        {currencyLabel || t("unit.toman")}
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage className="text-sm" />
                    </FormItem>
                );
            }}
        />
    );
};