import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";
import { Post, PostsResponse } from "@/types/post.tye";

export async function getPost(id: string): Promise<Post> {
    return await getFetch<Post>(`${apiUrls.post.single}/${id}`);
}

export async function getPosts(): Promise<PostsResponse> {
    return await getFetch<PostsResponse>(apiUrls.post.all);
}