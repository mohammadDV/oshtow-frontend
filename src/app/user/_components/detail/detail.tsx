import { usePagesTranslation } from "@/hooks/useTranslation"
import { UserInfo } from "@/types/user.type";

interface ProfileDetailProps {
    userInfo: UserInfo;
    sendersCount: number;
    passengersCount: number;
}

export const ProfileDetail = ({ userInfo, sendersCount, passengersCount }: ProfileDetailProps) => {
    const t = usePagesTranslation();

    return (
        <div className="bg-white p-5 rounded-3xl">
            {userInfo?.biography && <>
                <h3 className="text-title font-semibold text-lg mb-2">
                    {t("user.aboutMe")}
                </h3>
                <p className="text-sm font-normal text-caption text-justify leading-6 mb-6">
                    {userInfo?.biography}
                </p>
            </>}
            <h3 className="text-title font-semibold text-lg mb-3">
                {t("user.profileDetail")}
            </h3>
            <div className="flex flex-col gap-2.5">
                {/* <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedReviews")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        ۱۸ نظر
                    </p>
                </div> */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedSenders")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        {sendersCount} مرسوله
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedPassengers")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        {passengersCount} سفر
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.allAds")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        {sendersCount + passengersCount} آگهی
                    </p>
                </div>
            </div>
        </div>
    )
}