import { useCommonTranslation } from "@/hooks/useTranslation"
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"

export const ConsignmentCard = () => {
    const t = useCommonTranslation();

    return (
        <div className='bg-white rounded-2xl lg:rounded-3xl p-4 lg:p-5'>
            <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center size-10 lg:size-12 rounded-lg lg:rounded-xl bg-gradient-to-l from-light to-light/25">
                    <Icon icon="solar--documents-bold-duotone" sizeClass="size-7 lg:size-8" className="text-sub" />
                </div>
                <h3 className="text-title lg:text-lg font-semibold">
                    اوراق و مدارک
                </h3>
            </div>
            <div className="relative flex items-center justify-between my-3 lg:my-4">
                <p className="text-text text-sm lg:text-base font-normal bg-white z-10 pl-2">
                    تهران
                </p>
                <div className="bg-white z-10 flex items-center justify-between px-1.5">
                    <Icon icon="ion--airplane" sizeClass="size-6" className="text-hint rotate-180" />
                </div>
                <p className="text-text text-sm lg:text-base font-normal bg-white z-10 pr-2">
                    استانبول
                </p>
                <hr className="border-t border-dashed border-hint absolute left-0 right-0 z-0" />
            </div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <Icon icon="solar--calendar-bold-duotone" sizeClass="size-5" className="text-sub" />
                    <p className="text-xs font-normal text-text">
                        8 اردیبهشت
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon icon="solar--weigher-bold-duotone" sizeClass="size-5" className="text-sub" />
                    <p className="text-xs font-normal text-text">
                        1 کیلوگرم
                    </p>
                </div>
            </div>
            <Button variant={'default'}
                size={'default'}
                className="w-full mt-4 lg:mt-6 text-sm lg:text-base">
                {t('buttons.seeMore')}
                <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-4" />
            </Button>
        </div>
    )
}