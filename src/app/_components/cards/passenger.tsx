import { useCommonTranslation } from "@/hooks/useTranslation";
import { createFileUrl, pathTypeGenerator } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import Link from "next/link";

interface PassengerCardProps {
  data: Project
}

export const PassengerCard = ({ data }: PassengerCardProps) => {
  const t = useCommonTranslation();

  return (
    <Link href={`/passenger/${data.id}`}>
      <div className="relative overflow-hidden transition-all cursor-pointer h-56 lg:h-[350px] rounded-2xl lg:rounded-3xl">
        {data?.vip && <div className="absolute left-2 top-2 lg:left-3 lg:top-3 size-6 lg:size-7 bg-violet-400 flex items-center rounded-full justify-center">
          <Icon icon="solar--crown-minimalistic-outline" sizeClass="size-3.5 lg:size-4" className="text-white" />
        </div>}
        <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-gray-700"></div>
        <Image
          src={createFileUrl(data?.destination_image)}
          alt=""
          width={350}
          height={300}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 z-20 w-full p-3.5 lg:p-5">
          <h3 className="text-white text-lg lg:text-2xl font-semibold line-clamp-1">
            {data.title}
          </h3>
          <div className="flex items-center justify-between mt-3 lg:mt-4 mb-2.5 lg:mb-3">
            <div className="flex items-center gap-1">
              <Icon
                icon="solar--map-point-outline"
                sizeClass="size-4 lg:size-5"
                className="text-white"
              />
              <p className="text-xs lg:text-sm text-white font-normal">
                {data.origin.city.title}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Icon
                icon="solar--weigher-outline"
                sizeClass="size-4 lg:size-5"
                className="text-white"
              />
              <p className="text-xs lg:text-sm text-white font-normal">
                {data.weight} کیلوگرم فضا
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Icon
                icon="solar--widget-outline"
                sizeClass="size-4 lg:size-5"
                className="text-white"
              />
              <p className="text-xs lg:text-sm text-white font-normal">
                سفر {pathTypeGenerator(data.path_type)}
              </p>
            </div>
            <div className="flex items-center justify-center text-[10px] px-1 gap-1 py-0.5 lg:py-1 lg:text-sm lg:px-2.5 rounded-full text-white bg-primary">
              {t("buttons.seeMore")}
              <Icon
                icon="solar--alt-arrow-left-outline"
                sizeClass="size-0 lg:size-3.5"
              />
            </div>
          </div>
        </div>
      </div>
    </Link >
  );
};
