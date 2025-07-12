"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar } from "./calendar"
import { Button } from "./button"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"
import { useCommonTranslation } from "@/hooks/useTranslation"
import type { DateRange } from "react-day-picker"

const formatToShamsi = (date: Date): string => {
    try {
        return new Intl.DateTimeFormat('fa-IR-u-nu-latn', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).format(date).replace(/\//g, '/')
    } catch (error) {
        return format(date, "yyyy/MM/dd")
    }
}

const formatShamsiRange = (from: Date, to?: Date): string => {
    const fromShamsi = formatToShamsi(from)
    if (!to) return fromShamsi
    const toShamsi = formatToShamsi(to)
    return `${fromShamsi} - ${toShamsi}`
}

const stringToDate = (dateString: string): Date => {
    return new Date(dateString)
}

const dateToString = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

interface DatePickerProps {
    id?: string
    value?: string
    onChange?: (date: string | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
}

interface DateRangePickerProps {
    id?: string
    value?: { from: string; to?: string }
    onChange?: (range: { from: string; to?: string } | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
}

export function DatePicker({
    id,
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
    minDate,
    maxDate,
}: DatePickerProps) {
    const [open, setOpen] = React.useState(false)
    const t = useCommonTranslation()

    const dateValue = value ? stringToDate(value) : undefined

    const handleSelect = (date: Date | undefined) => {
        const stringDate = date ? dateToString(date) : undefined
        onChange?.(stringDate)
        setOpen(false)
    }

    const displayValue = dateValue ? formatToShamsi(dateValue) : ""

    const clearSelection = () => {
        onChange?.("")
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    className={cn(
                        "w-full justify-between h-11 border border-border text-sm px-3 font-normal",
                        !value && "text-caption",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    disabled={disabled}
                >
                    {displayValue || (
                        <span className="text-caption">
                            {placeholder || t("inputs.selectDate")}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5">
                        {displayValue && (
                            <Icon
                                onClick={clearSelection}
                                icon="ep--close"
                                sizeClass="size-4"
                                className="text-caption"
                            />
                        )}
                        <Icon
                            icon="solar--calendar-outline"
                            sizeClass="size-5"
                            className="text-caption"
                        />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={dateValue}
                    onSelect={handleSelect}
                    disabled={[
                        ...(minDate ? [{ before: minDate }] : []),
                        ...(maxDate ? [{ after: maxDate }] : []),
                    ]}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export function DateRangePicker({
    id,
    value,
    onChange,
    placeholder,
    className,
    disabled = false,
    minDate,
    maxDate,
}: DateRangePickerProps) {
    const [open, setOpen] = React.useState(false)
    const t = useCommonTranslation()

    const dateRangeValue: DateRange | undefined = value ? {
        from: stringToDate(value.from),
        to: value.to ? stringToDate(value.to) : undefined
    } : undefined

    const handleSelect = (range: DateRange | undefined) => {
        const stringRange = range ? {
            from: dateToString(range.from!),
            to: range.to ? dateToString(range.to) : undefined
        } : undefined

        onChange?.(stringRange)

    }

    const displayValue = React.useMemo(() => {
        if (!dateRangeValue?.from) return ""
        return formatShamsiRange(dateRangeValue.from, dateRangeValue.to)
    }, [dateRangeValue])

    const clearSelection = () => {
        onChange?.(undefined)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    id={id}
                    variant="outline"
                    className={cn(
                        "w-full justify-between h-11 border border-border text-sm px-3 font-normal",
                        !displayValue && "text-caption",
                        disabled && "opacity-50 cursor-not-allowed",
                        className
                    )}
                    disabled={disabled}
                >
                    {displayValue || (
                        <span className="text-caption">
                            {placeholder || t("inputs.selectDateRange")}
                        </span>
                    )}
                    <div className="flex items-center gap-1.5">
                        {displayValue && (
                            <Icon
                                onClick={clearSelection}
                                icon="ep--close"
                                sizeClass="size-4"
                                className="text-caption"
                            />
                        )}
                        <Icon
                            icon="solar--calendar-outline"
                            sizeClass="size-5"
                            className="text-caption"
                        />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="range"
                    selected={dateRangeValue}
                    onSelect={handleSelect}
                    disabled={[
                        ...(minDate ? [{ before: minDate }] : []),
                        ...(maxDate ? [{ after: maxDate }] : []),
                    ]}
                    // numberOfMonths={2}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

interface CombinedDatePickerProps {
    id?: string
    mode: "single" | "range"
    value?: string | { from: string; to?: string }
    onChange?: (value: string | { from: string; to?: string } | undefined) => void
    placeholder?: string
    className?: string
    disabled?: boolean
    minDate?: Date
    maxDate?: Date
}

export function DatePickerComponent({
    mode,
    value,
    onChange,
    ...props
}: CombinedDatePickerProps) {
    if (mode === "single") {
        return (
            <DatePicker
                value={value as string}
                onChange={onChange as (date: string | undefined) => void}
                {...props}
            />
        )
    }

    return (
        <DateRangePicker
            value={value as { from: string; to?: string }}
            onChange={onChange as (range: { from: string; to?: string } | undefined) => void}
            {...props}
        />
    )
}

export { DatePicker as default }