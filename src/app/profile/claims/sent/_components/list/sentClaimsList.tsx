"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Claim, ClaimStatus, FullClaim } from "@/types/claim.type"
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { SentClaimCard } from "../card";

interface SentClaimsListProps {
    data: FullClaim[];
    selectedStatus?: ClaimStatus;
}

export const SentClaimsList = ({ data, selectedStatus }: SentClaimsListProps) => {
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

    const handleStatusSelect = (status?: ClaimStatus) => {
        const queryString = createQueryString('status', status || '');
        router.push(`/profile/claims/sent?${queryString}`);
    };

    const claimStatuses = [
        {
            value: undefined,
            label: t("claimStatus.all")
        },
        {
            value: "pending" as ClaimStatus,
            label: t("claimStatus.pending")
        },
        {
            value: "approved" as ClaimStatus,
            label: t("claimStatus.approved")
        },
        {
            value: "in_progress" as ClaimStatus,
            label: t("claimStatus.in_progress")
        },
        {
            value: "paid" as ClaimStatus,
            label: t("claimStatus.paid")
        },
        {
            value: "delivered" as ClaimStatus,
            label: t("claimStatus.delivered")
        },
        {
            value: "canceled" as ClaimStatus,
            label: t("claimStatus.canceled")
        },
    ];
    
    return (
        <div className="mt-3">
        <div className='flex overflow-auto items-center w-full lg:w-max py-1 lg:py-0 lg:justify-end gap-2'>
            {claimStatuses.map((option) => {
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
        <div className="flex flex-col gap-4 mt-6">
            {data?.length > 0 ? (
                data.map((item) => (
                    <SentClaimCard key={item.id} data={item} />
                ))
            ) : (
                <div className="text-center py-8 text-text">
                    {t("messages.noResult")}
                </div>
            )}
        </div>
    </div>
    )
}