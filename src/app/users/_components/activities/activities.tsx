import { MobileSenderCard } from "@/app/_components/cards/mobileSender";
import { PassengerCard } from "@/app/_components/cards/passenger";
import { SenderCard } from "@/app/_components/cards/sender";
import { usePagesTranslation } from "@/hooks/useTranslation";

export const ProfileActivities = () => {
    const t = usePagesTranslation();

    return (
        <div id="activities">
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-4">
                    {t("user.lastSenders")}
                </h3>
                <div className="hidden md:grid grid-cols-2 gap-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <SenderCard key={index} />
                    ))}
                </div>
                <div className="grid lg:hidden gap-4">
                    {Array.from({ length: 4 }, (_, index) => (
                        <MobileSenderCard key={index} />
                    ))}
                </div>
            </div>
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-4">
                    {t("user.lastPassengers")}
                </h3>
                <div className="grid grid-cols-2 gap-4 lg:gap-5">
                    {Array.from({ length: 4 }, (_, index) => (
                        <PassengerCard key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}