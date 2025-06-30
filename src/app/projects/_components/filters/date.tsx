"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { DateRangePicker } from "@/ui/datepicker";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const DateFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const t = usePagesTranslation();

    const [dateRange, setDateRange] = useState<{ from: string; to?: string } | undefined>(() => {
        const send_date = searchParams.get('send_date');
        const receive_date = searchParams.get('receive_date');

        if (send_date) {
            return {
                from: send_date,
                to: receive_date || undefined
            };
        }
        return undefined;
    });

    const updateURL = useCallback((newDateRange: { from: string; to?: string } | undefined) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newDateRange?.from) {
            params.set('send_date', newDateRange.from);
            if (newDateRange.to) {
                params.set('receive_date', newDateRange.to);
            } else {
                params.delete('receive_date');
            }
        } else {
            params.delete('send_date');
            params.delete('receive_date');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleDateChange = (newDateRange: { from: string; to?: string } | undefined) => {
        setDateRange(newDateRange);
        updateURL(newDateRange);
    };

    useEffect(() => {
        const send_date = searchParams.get('send_date');
        const receive_date = searchParams.get('receive_date');

        if (send_date) {
            setDateRange({
                from: send_date,
                to: receive_date || undefined
            });
        } else {
            setDateRange(undefined);
        }
    }, [searchParams]);

    return (
        <DateRangePicker
            value={dateRange}
            onChange={handleDateChange}
            placeholder={t("projects.chooseDateRange")}
            minDate={new Date()}
        />
    );
};
