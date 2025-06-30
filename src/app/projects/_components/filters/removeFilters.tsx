"use client"

import { usePagesTranslation } from "@/hooks/useTranslation"
import { useParams, useRouter, useSearchParams } from "next/navigation"

export const RemoveFilters = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const params = useParams();
    const t = usePagesTranslation()

    const handleClearFilters = () => {
        router.push(`/projects/${params.type}`);
    };

    return (
        searchParams.size > 0 && <span
            className="text-sm text-primary font-normal cursor-pointer hover:underline transition-colors"
            onClick={handleClearFilters}
            role="button"
            tabIndex={0}
        >
            {t("projects.removeFilters")}
        </span>
    )
}