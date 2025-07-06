import { usePagesTranslation } from "@/hooks/useTranslation"
import { Icon } from "@/ui/icon";

export const Benefits = () => {
    const t = usePagesTranslation();

    const benefitsData = [
        {
            id: 1,
            icon: 'solar--money-bag-bold-duotone',
            title: t('home.reduceCostTitle'),
            description: t('home.reduceCostDescription'),
        },
        {
            id: 2,
            icon: 'solar--hourglass-line-bold-duotone',
            title: t('home.saveTimeTitle'),
            description: t('home.saveTimeDescription'),
        },
        {
            id: 3,
            icon: 'solar--calendar-bold-duotone',
            title: t('home.holidaysTitle'),
            description: t('home.holidaysDescription'),
        },
    ]

    return (
        <div className="container mx-auto px-4 mt-8 lg:mt-16">
            <div className="grid lg:grid-cols-3 gap-4 lg:gap-8">
                {benefitsData.map(item => (
                    <div key={item.id}
                        className="border-2 border-border rounded-2xl lg:rounded-3xl lg:px-6 lg:py-7 p-5 hover:border-white hover:bg-white transition-all flex items-center gap-3">
                        <Icon icon={item.icon} sizeClass="size-10 lg:size-12" className="text-primary" />
                        <div className="flex flex-col gap-1.5 lg:gap-2">
                            <p className="text-title font-semibold text-sm lg:text-lg">
                                {item.title}
                            </p>
                            <p className="text-caption font-normal text-xs lg:text-sm">
                                {item.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}