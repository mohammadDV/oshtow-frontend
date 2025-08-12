import { getTranslations } from "next-intl/server";
import { getPosts } from "./_api/getPosts";
import { PostCard } from "./_components/postCard";
import { Pagination } from "@/app/_components/pagination";

interface BlogPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page || "1");

    const postsData = await getPosts({ page });

    return (
        <div className="container mx-auto lg:mt-14 mt-8 px-4 lg:px-0">
            <div className="mb-8 lg:mb-14">
                <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
                    {t("blog.title")}
                </h1>
                <p className="text-center text-caption lg:text-xl font-normal">
                    {t("blog.description")}
                </p>
            </div>

            {postsData.data && postsData.data.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {postsData.data.map((post) => (
                            <PostCard key={post.id} data={post} />
                        ))}
                    </div>

                    {postsData.total > 12 && <Pagination
                        currentPage={postsData.current_page}
                        lastPage={postsData.last_page}
                        links={postsData.links}
                        total={postsData.total}
                        routeUrl="/blog"
                    />}
                </>
            ) : (
                <div className="text-center py-16">
                    <div className="max-w-md mx-auto">
                        <h3 className="text-xl font-semibold text-title mb-2">
                            {t("blog.noPostsTitle")}
                        </h3>
                    </div>
                </div>
            )}
        </div>
    );
}