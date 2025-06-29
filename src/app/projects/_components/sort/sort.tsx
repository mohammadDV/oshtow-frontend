import { usePagesTranslation } from "@/hooks/useTranslation";
import { Icon } from "@/ui/icon";

export const ProjectsSort = () => {
  const t = usePagesTranslation();

  return (
    <div className="flex items-center gap-2 lg:gap-4 bg-white lg:bg-transparent lg:p-0 px-2.5 py-1 rounded-full">
      <div className="flex items-center gap-2 lg:gap-3">
        <Icon
          icon="solar--sort-outline"
          sizeClass="size-4.5 lg:size-6"
          className="text-text"
        />
        <p className="hidden lg:block text-text font-font-medium">
          {t("projects.sort")}
        </p>
      </div>
      <div className="hidden lg:block h-3 w-0.5 bg-border"></div>
      <div className="flex items-center gap-3">
        <span className="text-sm font-normal bg-primary/10 lg:bg-transparent lg:p-0 px-2.5 rounded-full py-0.5 text-primary">
          {t("projects.newest")}
        </span>
        <span className="text-sm font-normal text-caption">
          {t("projects.lightest")}
        </span>
        <span className="text-sm font-normal text-caption">
          {t("projects.heaviest")}
        </span>
      </div>
    </div>
  );
};
