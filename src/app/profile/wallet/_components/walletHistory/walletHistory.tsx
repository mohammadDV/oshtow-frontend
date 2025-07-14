"use client";

import { DataTable } from "@/app/_components/dataTable/dataTable";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { WalletTransactionFilters, WalletTransactionsResponse } from "@/types/wallet.type";
import { Combobox } from "@/ui/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { transactionsColumns } from "./transactionsColumns";
import { TransactionsPagination } from "./transactionsPagination";

interface WalletHistoryProps {
    data: WalletTransactionsResponse;
}

export const WalletHistory = ({ data }: WalletHistoryProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();
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
            if (name !== 'page') {
                params.set('page', '1');
            }
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = useCallback((page: number) => {
        router.push(`/profile/wallet?${createQueryString('page', page.toString())}`);
    }, [router, createQueryString]);

    const handleFilterChange = useCallback((key: keyof WalletTransactionFilters, value: string) => {
        router.push(`/profile/wallet?${createQueryString(key, value)}`);
    }, [router, createQueryString]);

    const typeOptions = [
        { value: 'deposit', label: tCommon("transactionTypes.deposit") },
        { value: 'withdrawal', label: tCommon("transactionTypes.withdrawal") },
        { value: 'refund', label: tCommon("transactionTypes.refund") },
        { value: 'transfer', label: tCommon("transactionTypes.transfer") },
        { value: 'purchase', label: tCommon("transactionTypes.purchase") }
    ];

    const statusOptions = [
        { value: 'pending', label: tCommon("transactionStatus.pending") },
        { value: 'completed', label: tCommon("transactionStatus.completed") },
        { value: 'failed', label: tCommon("transactionStatus.failed") }
    ];

    const currentType = searchParams.get('type') || '';
    const currentStatus = searchParams.get('status') || '';

    return (
        <div className="bg-white mt-5 lg:mt-8 p-6 rounded-3xl">
            <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                <h2 className="text-lg font-medium text-title">
                    {tPages("profile.wallet.transactionsHistory")}
                </h2>

                <div className="flex gap-4 lg:w-1/2">
                    <div className="flex-1">
                        <Combobox
                            options={typeOptions}
                            value={currentType}
                            onChange={(value) => handleFilterChange('type', value)}
                            placeholder={tCommon("inputs.allTypes")}
                        />
                    </div>

                    <div className="flex-1">
                        <Combobox
                            options={statusOptions}
                            value={currentStatus}
                            onChange={(value) => handleFilterChange('status', value)}
                            placeholder={tCommon("inputs.allStatus")}
                        />
                    </div>
                </div>
            </div>

            <DataTable
                columns={transactionsColumns()}
                data={data.data}
                loading={false}
            />

            <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-caption">
                    {tCommon("pagination.page")} {data.current_page} {tCommon("pagination.of")} {data.last_page}
                </div>
                {data.links && (
                    <TransactionsPagination
                        currentPage={data.current_page}
                        lastPage={data.last_page}
                        links={data.links}
                        total={data.total}
                        onPageChange={handlePageChange}
                    />
                )}
            </div>
        </div>
    );
};