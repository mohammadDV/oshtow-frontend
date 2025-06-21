import { getTranslations } from "next-intl/server";
import { ConsignmentsFilters } from "./_components/filters";
import { ConsignmentsSort } from "./_components/sort";
import { ConsignmentsList } from "./_components/list";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Icon } from "@/ui/icon";

export default async function ConsignmentsPage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");

  return (
    <div className="flex items-start justify-between lg:gap-9 container mx-auto px-4 mt-4 lg:mt-12">
      {!isMobile && (
        <aside className="lg:w-72 bg-white rounded-3xl p-6">
          <ConsignmentsFilters />
        </aside>
      )}
      <main className="flex-1">
        <h1 className="text-title text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">
          {t("consignments.title")}
        </h1>
        <div className="flex items-center flex-wrap lg:justify-between gap-2">
          {isMobile && (
            <div className="bg-white px-2.5 py-1 rounded-full flex items-center gap-1.5 justify-center">
              <Icon
                icon="solar--filters-outline"
                sizeClass="size-4"
                className="text-text"
              />
              <p className="text-sm text-text font-normal">
                {t("consignments.filters")}
              </p>
            </div>
          )}
          <ConsignmentsSort />
          {!isMobile && (
            <p className="text-sm font-normal text-caption">
              999 {t("consignments.founded")}
            </p>
          )}
        </div>
        <ConsignmentsList isMobile={isMobile} />
      </main>
    </div>
  );
}
