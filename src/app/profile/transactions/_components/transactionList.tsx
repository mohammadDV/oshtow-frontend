"use client";

import { DataTable } from "@/app/_components/dataTable/dataTable";
import { Pagination } from "@/app/_components/pagination";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { TransactionsResponse, TransactionStatus, TransactionType } from "@/types/transactions.type";
import { Combobox } from "@/ui/combobox";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { transactionsColumns } from "./transactionsColumns";

interface TransactionListProps {
  transactionsData: TransactionsResponse;
  selectedStatus?: TransactionStatus;
  selectedType?: TransactionType;
}

export const TransactionList = ({
  transactionsData,
  selectedStatus,
  selectedType
}: TransactionListProps) => {
  const t = useCommonTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const columns = transactionsColumns();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      if (name !== 'page') {
        params.delete('page');
      }
      return params.toString();
    },
    [searchParams]
  );

  const handleStatusChange = (status: string) => {
    const queryString = createQueryString('status', status);
    router.push(`/profile/transactions?${queryString}`);
  };

  const handleTypeChange = (type: string) => {
    const queryString = createQueryString('type', type);
    router.push(`/profile/transactions?${queryString}`);
  };

  const statusOptions = [
    { value: 'pending', label: t("transactionStatus.pending") },
    { value: 'completed', label: t("transactionStatus.completed") },
    { value: 'cancelled', label: t("transactionStatus.cancelled") },
    { value: 'failed', label: t("transactionStatus.failed") }
  ];

  const typeOptions = [
    { value: 'wallet', label: t("transactionType.wallet") },
    { value: 'plan', label: t("transactionType.plan") },
    { value: 'identity', label: t("transactionType.identity") },
    { value: 'secure', label: t("transactionType.secure") }
  ];

  return (
    <div className="mt-4 lg:mt-5">
      <div className="bg-white p-6 rounded-3xl">
        <div className="flex gap-4 lg:w-1/2 mb-3">
          <div className="flex-1">
            <Combobox
              options={statusOptions}
              value={selectedStatus || ''}
              onChange={handleStatusChange}
              placeholder={t("filters.status")}
            />
          </div>

          <div className="flex-1">
            <Combobox
              options={typeOptions}
              value={selectedType || ''}
              onChange={handleTypeChange}
              placeholder={t("filters.type")}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={transactionsData?.data || []}
        />
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-6">
          <div className="text-sm text-caption">
            {t("pagination.page")} {transactionsData.current_page} {t("pagination.of")} {transactionsData.last_page}
          </div>
          {(transactionsData.links && transactionsData?.total > 10) && (
            <div className="-mt-8">
              <Pagination
                currentPage={transactionsData.current_page}
                lastPage={transactionsData.last_page}
                links={transactionsData.links}
                total={transactionsData.total}
                routeUrl="/profile/transactions"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};