import { useCommonTranslation } from "@/hooks/useTranslation";
import { FullClaim } from "@/types/claim.type";
import { ClaimCard } from "../card";

interface ClaimsListProps {
    claimsData: FullClaim[];
}

export const ClaimsList = ({ claimsData }: ClaimsListProps) => {
    const t = useCommonTranslation();

    return (
        <div className="flex flex-col gap-5">
            {claimsData?.length > 0 ? (
                claimsData.map((item) => (
                    <ClaimCard key={item.id} data={item} />
                ))
            ) : (
                <div className="text-center py-8 text-text">
                    {t("messages.noRequest")}
                </div>
            )}
        </div>
    )
}