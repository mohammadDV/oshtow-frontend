import { usePagesTranslation } from "@/hooks/useTranslation"

export const ProfileDetail = () => {
    const t = usePagesTranslation();

    return (
        <div className="bg-white p-5 rounded-3xl">
            <h3 className="text-title font-semibold text-lg mb-2">
                {t("user.aboutMe")}
            </h3>
            <p className="text-sm font-normal text-caption text-justify leading-6">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
            </p>
            <h3 className="text-title font-semibold text-lg mb-3 mt-6">
                {t("user.profileDetail")}
            </h3>
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedReviews")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        ۱۸ نظر
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedConsignments")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        ۲ مرسوله
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.submittedTrips")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        ۱۲ سفر
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-caption font-normal">
                        {t("user.allAds")}
                    </p>
                    <p className="text-sm text-text font-normal">
                        ۱۴ آگهی
                    </p>
                </div>
            </div>
        </div>
    )
}