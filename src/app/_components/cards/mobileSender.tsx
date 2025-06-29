import { useCommonTranslation } from "@/hooks/useTranslation";
import { Project } from "@/types/project.type";
import { Icon } from "@/ui/icon";

interface MobileSenderCardProps {
  data: Project;
}

export const MobileSenderCard = ({ data }: MobileSenderCardProps) => {
  const t = useCommonTranslation();

  return (
    <div className="bg-white rounded-2xl p-2 flex items-center gap-2.5 relative">
      {data?.vip && (
        <div className="absolute left-2 top-2 size-5 bg-violet-400 flex items-center rounded-full justify-center">
          <Icon icon="solar--crown-minimalistic-outline" sizeClass="size-3" className="text-white" />
        </div>
      )}
      <div className="flex items-center justify-center size-16 rounded-lg bg-gradient-to-l from-light to-light/25">
        <Icon
          icon="solar--documents-bold-duotone"
          sizeClass="size-9"
          className="text-sub"
        />
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <h3 className="text-title text-sm font-semibold line-clamp-1">{data.title}</h3>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--map-point-wave-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">
              {data.origin.city.title} به {data.destination.city.title}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--weigher-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">{data.weight} کیلوگرم</p>
          </div>
          <div className="flex items-center gap-1">
            <Icon
              icon="solar--calendar-bold-duotone"
              sizeClass="size-4"
              className="text-sub"
            />
            <p className="text-text text-xs font-normal">{data.send_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
