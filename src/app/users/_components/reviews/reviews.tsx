import { ReviewCard } from "@/app/_components/cards/review";
import { usePagesTranslation } from "@/hooks/useTranslation"

export const ProfileReviews = () => {
    const t = usePagesTranslation();

    return (
        <div id="reviews">
            <h3 className="text-title font-semibold text-xl mb-4">
                {t("user.lastReviews")}
            </h3>
            <div className="flex flex-col gap-5">
                {Array.from({ length: 3 }, (_, index) => (
                    <ReviewCard key={index} />
                ))}
            </div>
        </div>
    )
}