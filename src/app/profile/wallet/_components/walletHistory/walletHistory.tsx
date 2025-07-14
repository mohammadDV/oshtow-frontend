"use client";

import { DataTable } from "@/app/_components/dataTable/dataTable";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { WalletTransactionFilters, WalletTransactionsResponse, WithdrawRequestsResponse, WithdrawRequestFilters } from "@/types/wallet.type";
import { Combobox } from "@/ui/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { transactionsColumns } from "./transactionsColumns";
import { withdrawRequestsColumns } from "./withdrawRequestsColumns";
import { TransactionsPagination } from "./transactionsPagination";
import { cn } from "@/lib/utils";

interface WalletHistoryProps {
    transactionsData: WalletTransactionsResponse | null;
    withdrawRequestsData: WithdrawRequestsResponse | null;
    activeTab: 'transactions' | 'withdraws';
}

export const WalletHistory = ({ transactionsData, withdrawRequestsData, activeTab }: WalletHistoryProps) => {
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

    const handleFilterChange = useCallback((key: keyof (WalletTransactionFilters & WithdrawRequestFilters), value: string) => {
        router.push(`/profile/wallet?${createQueryString(key, value)}`);
    }, [router, createQueryString]);

    const handleTabChange = useCallback((tab: 'transactions' | 'withdraws') => {
        const params = new URLSearchParams();
        params.set('tab', tab);
        params.set('page', '1');
        router.push(`/profile/wallet?${params.toString()}`);
    }, [router]);

    const typeOptions = [
        { value: 'deposit', label: tCommon("transactionTypes.deposit") },
        { value: 'withdrawal', label: tCommon("transactionTypes.withdrawal") },
        { value: 'refund', label: tCommon("transactionTypes.refund") },
        { value: 'transfer', label: tCommon("transactionTypes.transfer") },
        { value: 'purchase', label: tCommon("transactionTypes.purchase") }
    ];

    const transactionStatusOptions = [
        { value: 'pending', label: tCommon("transactionStatus.pending") },
        { value: 'completed', label: tCommon("transactionStatus.completed") },
        { value: 'failed', label: tCommon("transactionStatus.failed") }
    ];

    const withdrawStatusOptions = [
        { value: 'pending', label: tCommon("withdrawStatus.pending") },
        { value: 'completed', label: tCommon("withdrawStatus.completed") },
        { value: 'reject', label: tCommon("withdrawStatus.reject") }
    ];

    const currentType = searchParams.get('type') || '';
    const currentStatus = searchParams.get('status') || '';
    const currentData = activeTab === 'transactions' ? transactionsData : withdrawRequestsData;

    return (
        <div className="mt-5 lg:mt-8">
            <div className="flex items-center mr-7">
                <button
                    onClick={() => handleTabChange('transactions')}
                    className={cn("font-normal cursor-pointer rounded-t-xl px-4 py-2.5",
                        activeTab === 'transactions'
                            ? 'text-primary bg-white'
                            : 'text-text')}
                >
                    {tCommon("tabs.transactions")}
                </button>
                <button
                    onClick={() => handleTabChange('withdraws')}
                    className={cn("font-normal cursor-pointer rounded-t-xl px-4 py-2.5",
                        activeTab === 'withdraws'
                            ? 'text-primary bg-white'
                            : 'text-text')}
                >
                    {tCommon("tabs.withdrawRequests")}
                </button>
            </div>
            <div className="bg-white p-6 rounded-3xl">
                <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                    <h2 className="text-lg font-medium text-title">
                        {activeTab === 'transactions'
                            ? tPages("profile.wallet.transactionsHistory")
                            : tPages("profile.wallet.withdrawRequestsHistory")
                        }
                    </h2>

                    <div className={cn("flex gap-4", activeTab === 'transactions' ? "lg:w-1/2" : "lg:w-1/3")}>
                        {activeTab === 'transactions' && (
                            <div className="flex-1">
                                <Combobox
                                    options={typeOptions}
                                    value={currentType}
                                    onChange={(value) => handleFilterChange('type', value)}
                                    placeholder={tCommon("inputs.allTypes")}
                                />
                            </div>
                        )}

                        <div className="flex-1">
                            <Combobox
                                options={activeTab === 'transactions' ? transactionStatusOptions : withdrawStatusOptions}
                                value={currentStatus}
                                onChange={(value) => handleFilterChange('status', value)}
                                placeholder={tCommon("inputs.allStatus")}
                            />
                        </div>
                    </div>
                </div>

                {currentData && (
                    <>
                        {activeTab === "transactions"
                            ? <DataTable
                                columns={transactionsColumns()}
                                data={transactionsData?.data || []}
                                loading={false}
                            />
                            : <DataTable
                                columns={withdrawRequestsColumns()}
                                data={withdrawRequestsData?.data || []}
                                loading={false}
                            />}

                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-caption">
                                {tCommon("pagination.page")} {currentData.current_page} {tCommon("pagination.of")} {currentData.last_page}
                            </div>
                            {currentData.links && (
                                <TransactionsPagination
                                    currentPage={currentData.current_page}
                                    lastPage={currentData.last_page}
                                    links={currentData.links}
                                    total={currentData.total}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>
                    </>
                )}
            </div>
        </div >
    );
};