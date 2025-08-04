"use client"

import { DataTable } from "@/app/_components/dataTable/dataTable";
import { Pagination } from "@/app/_components/pagination";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { TicketsResponse, TicketStatusType } from "@/types/support.type"
import { Button } from "@/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { ticketsColumns } from "./ticketsColumns";
import { AddTicketButton } from "./addTicketButton";

export interface TicketListProps {
    ticketsData: TicketsResponse;
    selectedStatus?: TicketStatusType;
}

export const TicketList = ({ ticketsData, selectedStatus }: TicketListProps) => {
    const t = useCommonTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value) {
                params.set(name, value);
            } else {
                params.delete(name);
            }
            if (name === 'status') {
                params.delete('page');
            }
            return params.toString();
        },
        [searchParams]
    );

    const handleStatusSelect = (status?: TicketStatusType) => {
        const queryString = createQueryString('status', status || '');
        router.push(`/profile/support?${queryString}`);
    };

    const supportStatuses = [
        {
            value: undefined,
            label: t("ticketStatus.all")
        },
    ]

    return (
        <div className="mt-3">
            <div className="flex items-center justify-between">
                <div className='flex items-center w-max py-1 lg:py-0 lg:justify-end gap-2 overflow-auto'>
                    {supportStatuses.map((option) => {
                        const isSelected = selectedStatus === option.value;
                        return (
                            <div
                                key={option.label}
                                onClick={() => handleStatusSelect(option.value)}
                                className={cn(
                                    'border rounded-full px-3 py-1 cursor-pointer text-sm transition-all min-w-max',
                                    isSelected
                                        ? 'border-sub text-primary bg-primary/10'
                                        : 'border-border text-title hover:border-sub/50 bg-white'
                                )}
                            >
                                {option.label}
                            </div>
                        );
                    })}
                </div>
                <AddTicketButton/>
            </div>
            <div className="bg-white p-6 rounded-3xl mt-5">
                <DataTable
                    columns={ticketsColumns()}
                    data={ticketsData?.data || []}
                />
                <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-6">
                    <div className="text-sm text-caption">
                        {t("pagination.page")} {ticketsData.current_page} {t("pagination.of")} {ticketsData.last_page}
                    </div>
                    {(ticketsData.links && ticketsData?.total > 10) && (
                        <div className="-mt-8">
                            <Pagination
                                currentPage={ticketsData.current_page}
                                lastPage={ticketsData.last_page}
                                links={ticketsData.links}
                                total={ticketsData.total}
                                routeUrl="/profile/support"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}