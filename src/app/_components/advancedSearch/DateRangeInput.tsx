'use client';

import { useState } from 'react';
import { Icon } from '@/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { Calendar } from '@/ui/calendar';
import { cn } from '@/lib/utils';
import type { DateRange } from 'react-day-picker';
import { persianMonths } from '@/_mock/persianMonths';

interface DateRangeInputProps {
    placeholder: string;
    icon: string;
    description: string;
    value?: { from: string; to: string } | null;
    onChange?: (dateRange: { from: string; to: string } | null) => void;
    className?: string;
}

const formatToShamsi = (date: Date): string => {
    try {
        const shamsiDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        }).formatToParts(date);

        const day = shamsiDate.find(part => part.type === 'day')?.value;
        const month = shamsiDate.find(part => part.type === 'month')?.value;

        if (day && month) {
            const monthIndex = parseInt(month) - 1;
            const monthName = persianMonths[monthIndex] || month;
            return `${day} ${monthName}`;
        }

        return date.toLocaleDateString('fa-IR');
    } catch (error) {
        return date.toLocaleDateString('fa-IR');
    }
};

const formatShamsiRange = (from: Date, to?: Date): string => {
    const fromShamsi = formatToShamsi(from);
    if (!to) return fromShamsi;
    const toShamsi = formatToShamsi(to);
    return `${fromShamsi} - ${toShamsi}`;
};

const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
};

export const DateRangeInput = ({
    placeholder,
    icon,
    description,
    value,
    onChange,
    className
}: DateRangeInputProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedRange, setSelectedRange] = useState<DateRange | undefined>(
        value ? {
            from: value.from ? new Date(value.from) : undefined,
            to: value.to ? new Date(value.to) : undefined
        } : undefined
    );

    const handleDateRangeSelect = (range: DateRange | undefined) => {
        setSelectedRange(range);

        if (range?.from && range?.to && range.from !== range.to) {
            onChange?.({
                from: formatDateToString(range.from),
                to: formatDateToString(range.to)
            });
            setIsOpen(false);
        } else if (range?.from && !range?.to) {
            setIsOpen(true);
        } else if (!range?.from) {
            onChange?.(null);
        }
    };

    const handlePopoverOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            setSelectedRange(undefined);
        }
    };

    const handleContainerClick = () => {
        setIsOpen(true);
    };

    const displayText = selectedRange?.from
        ? formatShamsiRange(selectedRange.from, selectedRange.to)
        : placeholder;

    const hasValue = selectedRange?.from;

    return (
        <div className={cn('flex gap-2 cursor-pointer', className)} onClick={handleContainerClick}>
            <Icon icon={icon} sizeClass="size-7 lg:size-8" className="text-caption" />
            <div className="flex-1">
                <Popover open={isOpen} onOpenChange={handlePopoverOpenChange}>
                    <PopoverTrigger asChild>
                        <div>
                            <div className={cn(
                                "text-title font-medium text-lg lg:text-xl",
                            )}>
                                {displayText}
                            </div>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent
                        className="w-auto p-0"
                        sideOffset={8}
                    >
                        <Calendar
                            mode="range"
                            defaultMonth={selectedRange?.from || new Date()}
                            selected={selectedRange}
                            onSelect={handleDateRangeSelect}
                            numberOfMonths={2}
                            showOutsideDays={false}
                            className="rounded-md border"
                        />
                    </PopoverContent>
                </Popover>

                <p className="text-caption lg:text-base text-sm mt-1 lg:mt-1.5 font-light">
                    {description}
                </p>
            </div>
        </div>
    );
};