import { useCommonTranslation } from "@/hooks/useTranslation";
import istanbulVertical from "@/assets/images/istanbul-vertical.png";
import Image from "next/image";
import { Icon } from "@/ui/icon";
import Link from "next/link";

export const TripCard = () => {
    const t = useCommonTranslation();

    return (
        <div className="relative overflow-hidden transition-all cursor-pointer h-72 lg:h-96 rounded-2xl lg:rounded-3xl">
            <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-neutral-800 to-neutral-800/20"></div>
            <Image src={istanbulVertical} alt="" className="object-cover w-full h-full" />
            <div className="absolute bottom-0 z-20 w-full p-4 lg:p-5">
                <h3 className="text-white text-xl lg:text-2xl font-semibold">
                    سفر به تهران
                </h3>
                <div className="flex items-center justify-between mt-3 lg:mt-4 mb-2.5 lg:mb-3">
                    <div className="flex items-center gap-1">
                        <Icon icon="solar--map-point-outline" sizeClass="size-4 lg:size-5" className="text-white" />
                        <p className="text-xs lg:text-sm text-white font-normal">
                            مبدا: استانبول
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <Icon icon="solar--weigher-outline" sizeClass="size-4 lg:size-5" className="text-white" />
                        <p className="text-xs lg:text-sm text-white font-normal">
                            20 کیلو جا دارم
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <Icon icon="solar--widget-outline" sizeClass="size-4 lg:size-5" className="text-white" />
                        <p className="text-xs lg:text-sm text-white font-normal">
                            نوع سفر: هوایی
                        </p>
                    </div>
                    <Link
                        href={'/'}
                        className="flex items-center justify-center text-xs lg:text-sm gap-1 px-2 lg:px-2.5 py-1.5 rounded-full text-white bg-primary">
                        {t('buttons.seeMore')}
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3 lg:size-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}