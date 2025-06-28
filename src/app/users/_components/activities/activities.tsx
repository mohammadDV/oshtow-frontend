import { ConsignmentCard } from "@/app/_components/cards/consignment";
import { MobileConsignmentCard } from "@/app/_components/cards/mobileConsignment";
import { TripCard } from "@/app/_components/cards/trip";
import { usePagesTranslation } from "@/hooks/useTranslation";

export const ProfileActivities = () => {
    const t = usePagesTranslation();

    return (
        <div id="activities">
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-4">
                    {t("user.lastConsignments")}
                </h3>
                <div className="hidden md:grid grid-cols-2 gap-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <ConsignmentCard key={index} />
                    ))}
                </div>
                <div className="grid lg:hidden gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <MobileConsignmentCard key={index} />
                    ))}
                </div>
            </div>
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-4">
                    {t("user.lastTrips")}
                </h3>
                <div className="grid grid-cols-2 gap-4 lg:gap-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <TripCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}