import { usePagesTranslation } from "@/hooks/useTranslation";

export const ConsignmentsFilters = () => {
  const t = usePagesTranslation();
  
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-title">
          {t("consignments.filters")}
        </p>
        <span className="text-sm text-primary font-normal">
          {t("consignments.removeFilters")}
        </span>
      </div>
    </>
  );
};
