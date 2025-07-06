import { MobileSenderCard } from "@/app/_components/cards/mobileSender";
import { PassengerCard } from "@/app/_components/cards/passenger";
import { SenderCard } from "@/app/_components/cards/sender";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { isEmpty } from "@/lib/utils";
import { Project } from "@/types/project.type";

interface ProfileActivitiesProps {
    sendersData: Project[];
    passengersData: Project[];
}

export const ProfileActivities = ({ sendersData, passengersData }: ProfileActivitiesProps) => {
    const t = usePagesTranslation();

    return (
        <div id="activities">
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-5">
                    {t("user.lastSenders")}
                </h3>
                {!isEmpty(sendersData)
                    ? <>
                        <div className="hidden md:grid grid-cols-2 gap-5">
                            {sendersData?.map(item => <SenderCard key={item.id} data={item} />)}
                        </div>
                        <div className="grid lg:hidden gap-3">
                            {sendersData?.map(item => <MobileSenderCard key={item.id} data={item} />)}
                        </div>
                    </>
                    : <div className="text-center py-4">
                        <p className="text-caption">{t("projects.noSenderFound")}</p>
                    </div>}
            </div>
            <div className="mt-8 lg:mt-12">
                <h3 className="text-title font-semibold text-xl mb-5">
                    {t("user.lastPassengers")}
                </h3>
                {!isEmpty(passengersData)
                    ? <div className="grid grid-cols-2 gap-3 lg:gap-5">
                        {passengersData?.map(item => <PassengerCard key={item.id} data={item} />)}
                    </div>
                    : <div className="text-center py-4">
                        <p className="text-caption">{t("projects.noPassengerFound")}</p>
                    </div>}
            </div>
        </div>
    )
}