import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { Review } from "@/types/review.type";

interface GetClaimReviewsParams {
  id: string;
}

export async function getClaimReviews({
  id,
}: GetClaimReviewsParams): Promise<Review[]> {
  return await getFetchAuth<Review[]>(
    `${apiUrls.claims.profile}/${id}/reviews`
  );
}
