import { usePagesTranslation } from "@/hooks/useTranslation";
import { OriginFilter } from "./origin";
import { DestinationFilter } from "./destination";

export const ProjectsFilters = () => {
  const t = usePagesTranslation();

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-xl font-medium text-title">
          {t("projects.filters")}
        </p>
        <span className="text-sm text-primary font-normal cursor-pointer hover:underline">
          {t("projects.removeFilters")}
        </span>
      </div>

      <hr className="border-t border-border my-5" />

      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.chooseOrigin")}</h3>
        <OriginFilter />
      </div>
      <hr className="border-t border-border my-5" />

      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.chooseDestination")}</h3>
        <DestinationFilter />
      </div>
    </>
  );
};
