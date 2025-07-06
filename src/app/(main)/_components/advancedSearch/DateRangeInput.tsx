'use client';

import { formatDateToString, formatShamsiRange } from '@/lib/dateUtils';
import { cn } from '@/lib/utils';
import { Calendar } from '@/ui/calendar';
import { Icon } from '@/ui/icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/ui/popover';
import { forwardRef, useImperativeHandle, useState } from 'react';
import type { DateRange } from 'react-day-picker';

interface DateRangeInputProps {
    placeholder: string;
    icon: string;
    description: string;
    value?: { from: string; to: string } | null;
    onChange?: (dateRange: { from: string; to: string } | null) => void;
    className?: string;
}

export interface DateRangeInputRef {
    focus: () => void;
}

export const DateRangeInput = forwardRef<DateRangeInputRef, DateRangeInputProps>((
    {
        placeholder,
        icon,
        description,
        value,
        onChange,
        className
    },
    ref
) => {
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

    useImperativeHandle(ref, () => ({
        focus: () => {
            setIsOpen(true);
        }
    }));

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
});

DateRangeInput.displayName = 'DateRangeInput';