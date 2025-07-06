"use client";

import { ReviewCard } from "@/app/_components/cards/review";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { ReviewsResponse } from "@/types/review.type";
import { Combobox } from "@/ui/combobox";
import { ReviewsPagination } from "./pagination";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface ProfileReviewsProps {
    data: ReviewsResponse | null;
    loading?: boolean;
}

const rateOptions = [
    {
        value: "",
        label: "همه امتیازها"
    },
    {
        value: "1",
        label: "1 ستاره"
    },
    {
        value: "2",
        label: "2 ستاره"
    },
    {
        value: "3",
        label: "3 ستاره"
    },
    {
        value: "4",
        label: "4 ستاره"
    },
    {
        value: "5",
        label: "5 ستاره"
    },
];

export const ProfileReviews = ({ data, loading = false }: ProfileReviewsProps) => {
    const t = usePagesTranslation();
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();

    const [selectedRate, setSelectedRate] = useState<string>("");

    const currentRate = searchParams.get('query') || '';
    const currentColumn = searchParams.get('column') || '';

    useEffect(() => {
        if (currentColumn === 'rate' && currentRate) {
            setSelectedRate(currentRate);
        } else {
            setSelectedRate('');
        }
    }, [currentRate, currentColumn]);

    const createQueryString = useCallback(
        (updates: Record<string, string | null>) => {
            const params = new URLSearchParams(searchParams.toString());

            Object.entries(updates).forEach(([key, value]) => {
                if (value === null || value === '') {
                    params.delete(key);
                } else {
                    params.set(key, value);
                }
            });

            return params.toString();
        },
        [searchParams]
    );

    const handleRateChange = (value: string) => {
        setSelectedRate(value);

        const updates: Record<string, string | null> = {
            page: '1',
        };

        if (value) {
            updates.query = value;
            updates.column = 'rate';
        } else {
            updates.query = null;
            updates.column = null;
        }

        const queryString = createQueryString(updates);
        router.push(`/user/${params.id}${queryString ? `?${queryString}` : ''}#reviews`);
    };

    if (!data) {
        return (
            <div id="reviews" className="animate-pulse">
                <div className="flex items-center justify-between mb-6">
                    <div className="h-6 bg-gray-200 rounded w-32"></div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                </div>
                <div className="flex flex-col gap-5">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="h-32 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div id="reviews">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-title font-semibold text-xl">
                    {t("user.lastReviews")} ({data.total})
                </h3>
                <Combobox
                    options={rateOptions}
                    value={selectedRate}
                    onChange={handleRateChange}
                    placeholder={t("user.chooseRate")}
                    className="w-40"
                />
            </div>

            {loading ? (
                <div className="flex flex-col gap-5">
                    {Array.from({ length: 3 }, (_, index) => (
                        <div key={index} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="flex flex-col gap-3 lg:gap-4">
                        {data.data.length > 0 ? (
                            data.data.map((review) => (
                                <ReviewCard key={review.id} data={review} />
                            ))
                        ) : (
                            <div className="text-center py-8 text-caption">
                                {t("user.noReviewFound")}
                            </div>
                        )}
                    </div>

                    {data.data.length > 0 && data.last_page > 1 && (
                        <ReviewsPagination
                            currentPage={data.current_page}
                            lastPage={data.last_page}
                            links={data.links}
                            total={data.total}
                        />
                    )}
                </>
            )}
        </div>
    );
};