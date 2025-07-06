import { usePagesTranslation } from "@/hooks/useTranslation";
import { OriginFilter } from "./origin";
import { DestinationFilter } from "./destination";
import { DateFilter } from "./date";
import { CategoriesFilter } from "./categories";
import { PathTypeFilter } from "./pathType";
import { WeightRangeFilter } from "./weightRange";
import { RemoveFilters } from "./removeFilters";
import { ProjectType } from "@/types/project.type";

interface ProjectsFiltersProps {
  type: ProjectType
}

export const ProjectsFilters = ({ type }: ProjectsFiltersProps) => {
  const t = usePagesTranslation();

  return (
    <>
      <div className="hidden lg:flex items-center justify-between">
        <p className="text-xl font-medium text-title">
          {t("projects.filters")}
        </p>
        <RemoveFilters />
      </div>
      <hr className="border-t border-border mb-5 lg:my-5" />
      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.chooseOrigin")}</h3>
        <OriginFilter />
      </div>
      <hr className="border-t border-border my-5" />
      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.chooseDestination")}</h3>
        <DestinationFilter />
      </div>
      <hr className="border-t border-border my-5" />
      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.chooseDate")}</h3>
        <DateFilter />
      </div>
      {type === 'sender' && <>
        <hr className="border-t border-border my-5" />
        <div>
          <h3 className="font-semibold text-title mb-3">{t("projects.category")}</h3>
          <CategoriesFilter />
        </div>
      </>}
      {type === 'passenger' && <>
        <hr className="border-t border-border my-5" />
        <div>
          <h3 className="font-semibold text-title mb-3">{t("projects.pathType")}</h3>
          <PathTypeFilter />
        </div>
      </>}
      <hr className="border-t border-border my-5" />
      <div>
        <h3 className="font-semibold text-title mb-3">{t("projects.weight")}</h3>
        <WeightRangeFilter />
      </div>
    </>
  );
};
