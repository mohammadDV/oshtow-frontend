import { getFetch } from "@/core/publicService";
import { apiUrls } from "@/constants/apiUrls";
import { ReviewsResponse } from "@/types/review.type";

interface GetReviewsParams {
    id: string;
    page?: number;
    count?: number;
    query?: string;
    column?: string;
}

export async function getReviews({
    id,
    page = 1,
    count = 5,
    query,
    column
}: GetReviewsParams): Promise<ReviewsResponse> {
    const searchParams = new URLSearchParams({
        count: count.toString(),
        page: page.toString(),
    });

    if (query) searchParams.set("query", query);
    if (column) searchParams.set("column", column);

    return getFetch<ReviewsResponse>(`${apiUrls.user.info}/${id}/reviews?${searchParams.toString()}`);
}
