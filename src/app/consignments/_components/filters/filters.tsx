import { usePagesTranslation } from "@/hooks/useTranslation";
import { OriginFilter } from "./origin";

export const ConsignmentsFilters = () => {
  const t = usePagesTranslation();

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-title">
          {t("consignments.filters")}
        </p>
        <span className="text-sm text-primary font-normal cursor-pointer hover:underline">
          {t("consignments.removeFilters")}
        </span>
      </div>

      <hr className="border-t border-border my-5" />

      <div>
        <h3 className="font-semibold text-title mb-3">{t("consignments.chooseOrigin")}</h3>
        <OriginFilter />
      </div>
    </>
  );
};
