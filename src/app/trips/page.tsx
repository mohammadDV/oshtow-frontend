import { getTranslations } from "next-intl/server";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Icon } from "@/ui/icon";
import { TripsFilters } from "./_components/filters";
import { TripsSort } from "./_components/sort";
import { TripsList } from "./_components/list";

export default async function TripsPage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");

  return (
    <div className="flex items-start justify-between lg:gap-9 container mx-auto px-4 mt-4 lg:mt-12">
      {!isMobile && (
        <aside className="lg:w-72 bg-white rounded-3xl p-6">
          <TripsFilters />
        </aside>
      )}
      <main className="flex-1">
        <h1 className="text-title text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">
          {t("trips.title")}
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
                {t("trips.filters")}
              </p>
            </div>
          )}
          <TripsSort />
          {!isMobile && (
            <p className="text-sm font-normal text-caption">
              999 {t("trips.founded")}
            </p>
          )}
        </div>
        <TripsList />
      </main>
    </div>
  );
}
