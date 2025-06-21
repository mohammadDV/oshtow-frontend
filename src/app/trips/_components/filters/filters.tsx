import { usePagesTranslation } from "@/hooks/useTranslation";

export const TripsFilters = () => {
  const t = usePagesTranslation();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-title">
          {t("trips.filters")}
        </p>
        <span className="text-sm text-primary font-normal">
          {t("trips.removeFilters")}
        </span>
      </div>
    </>
  );
};
