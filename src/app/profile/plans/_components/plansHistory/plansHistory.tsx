"use client";

import { DataTable } from "@/app/_components/dataTable/dataTable";
import { Pagination } from "@/app/_components/pagination";
import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import { SubscriptionPlansResponse } from "@/types/plan.type";
import { plansColumns } from "./plansColumns";

interface PlansHistoryProps {
  plansData: SubscriptionPlansResponse | null;
}

export const PlansHistory = ({ plansData }: PlansHistoryProps) => {
  const tPages = usePagesTranslation();
  const tCommon = useCommonTranslation();

  return (
    <div className="mt-5 lg:mt-8">
      <div className="bg-white p-6 rounded-3xl">
        <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
          <h2 className="text-lg font-medium text-title line-clamp-1">
            {tPages("profile.plans.subscriptionHistory")}
          </h2>
        </div>

        {plansData && (
          <>
            <DataTable
              columns={plansColumns()}
              data={plansData.data || []}
              loading={false}
            />

            <div className="flex flex-col md:flex-row items-center gap-4 justify-between mt-6">
              <div className="text-sm text-caption">
                {tCommon("pagination.page")} {plansData.current_page}{" "}
                {tCommon("pagination.of")} {plansData.last_page}
              </div>
              {plansData.links && (
                <div className="-mt-8">
                  <Pagination
                    currentPage={plansData.current_page}
                    lastPage={plansData.last_page}
                    links={plansData.links}
                    total={plansData.total}
                    routeUrl="/profile/plans"
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
