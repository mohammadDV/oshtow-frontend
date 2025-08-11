import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";
import { PostsResponse } from "@/types/post.tye";

interface GetPostsParams {
  page?: number;
  count?: number;
}

export async function getPosts({
  page = 1,
  count = 12,
}: GetPostsParams = {}): Promise<PostsResponse> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
    count: count.toString(),
  });

  return getFetch<PostsResponse>(
    `${apiUrls.post.all}?${searchParams.toString()}`
  );
}