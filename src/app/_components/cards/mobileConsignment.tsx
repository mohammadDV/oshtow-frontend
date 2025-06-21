import { useCommonTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

export const MobileConsignmentCard = () => {
  const t = useCommonTranslation();

  return (
    <div className="bg-white rounded-2xl p-2 flex items-center gap-2.5">
      <div className="flex items-center justify-center size-16 rounded-lg lg:rounded-xl bg-gradient-to-l from-light to-light/25">
        <Icon
          icon="solar--documents-bold-duotone"
          sizeClass="size-9"
          className="text-sub"
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-title text-sm font-semibold">اوراق و مدارک</h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--map-point-wave-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">
              تهران به استانبول
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--weigher-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">1 کیلوگرم</p>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--calendar-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">8 اردیبهشت </p>
          </div>
        </div>
      </div>
    </div>
  );
};
