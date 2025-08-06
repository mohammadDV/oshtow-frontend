import { createFileUrl } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "./_api/getPosts";

export default async function PostPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    
    try {
        const post = await getPost(resolvedParams.id);
        const relatedPosts = await getPosts();
        const t = await getTranslations("pages");

        if (!post) {
            return notFound();
        }

        const postDate = post.created_at;

        return (
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                <div className="container mx-auto px-4 mt-5 lg:mt-6">
                    <nav className="flex items-center gap-2 text-sm text-caption mb-8 p-4 bg-white backdrop-blur-sm rounded-xl border border-border/50">
                        <Link href="/" className="hover:text-primary transition-colors duration-200 font-medium">{t("post.home")}</Link>
                        {/* <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3" />
                        <Link href="/posts" className="hover:text-primary transition-colors duration-200 font-medium">اخبار و مقالات</Link> */}
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3" />
                        <span className="text-primary font-semibold">{post.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">

                            <header className="mb-8 text-center">
                                {post.pre_title && (
                                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                                        {post.pre_title}
                                    </div>
                                )}
                                <h1 className="text-2xl lg:text-4xl font-bold text-title mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="items-center justify-center gap-6 text-sm text-caption bg-white backdrop-blur-sm rounded-xl p-4 border border-border/50 inline-flex">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-primary/10 rounded-full">
                                            <Icon icon="solar--calendar-outline" sizeClass="size-4 text-primary" />
                                        </div>
                                        <span className="font-normal">{postDate}</span>
                                    </div>
                                    <div className="w-px h-4 bg-border"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-primary/10 rounded-full">
                                            <Icon icon="solar--eye-outline" sizeClass="size-4 text-primary" />
                                        </div>
                                        <span className="font-normal">{post.view} {t("post.views")}</span>
                                    </div>
                                </div>
                            </header>

                            {(post.video || post.image) && (
                                <div className="relative w-full mb-8">
                                    {post.video ? (
                                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/20">
                                            <video
                                                src={createFileUrl(post.video)}
                                                controls
                                                className="w-full h-full object-cover"
                                                poster={createFileUrl(post.image) || undefined}
                                            >
                                                {t("post.videoNotSupported")}
                                            </video>
                                        </div>
                                    ) : post.image && (
                                        <div className="relative w-full h-[400px] lg:h-[460px] rounded-3xl overflow-hidden border border-border/20">
                                            <Image
                                                src={createFileUrl(post.image)}
                                                alt={post.title}
                                                fill
                                                className="object-cover transition-transform duration-700 hover:scale-105"
                                                priority
                                            />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Post Summary */}
                            {post.summary && (
                                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6 lg:p-8 rounded-2xl mb-6 border border-primary/20">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-xl">
                                            <Icon icon="solar--pen-2-outline" sizeClass="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-title mb-2">{t("post.postSummary")}</h3>
                                            <p className="text-lg leading-relaxed text-caption">{post.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <article className="bg-white backdrop-blur-sm rounded-2xl p-6 lg:p-10">
                                <div
                                    className="prose text-text prose-lg max-w-none prose-headings:text-text prose-p:text-caption prose-p:leading-relaxed prose-a:text-primary prose-strong:text-text prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:text-caption"
                                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                />
                            </article>
                        </div>

                        <div className="lg:col-span-1">
                            {relatedPosts.data && relatedPosts.data.length > 0 && (
                                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-border/50 sticky top-6">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <Icon icon="solar--document-text-outline" sizeClass="size-5 text-primary" />
                                            </div>
                                            <h2 className="text-xl font-bold text-title">{t("post.relatedPosts")}</h2>
                                        </div>
                                        <p className="text-sm text-caption">{t("post.relatedPostsDescription")}</p>
                                    </div>
                                    <div className="space-y-4">
                                        {relatedPosts.data
                                            ?.filter(relatedPost => relatedPost.id !== post.id)
                                            .slice(0, 4)
                                            .map(relatedPost => (
                                                <Link
                                                    key={relatedPost.id}
                                                    href={`/post/${relatedPost.id}`}
                                                    className="group block rounded-xl border border-border"
                                                >
                                                    <div className="flex gap-3 p-3">
                                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                                            <Image
                                                                src={createFileUrl(relatedPost.image)}
                                                                alt={relatedPost.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h3 className="text-sm font-semibold text-title line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-5">
                                                                {relatedPost.title}
                                                            </h3>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <div className="flex items-center gap-1">
                                                                    <Icon icon="solar--eye-outline" sizeClass="size-3 text-caption" />
                                                                    <span className="text-xs text-caption">{relatedPost.view}</span>
                                                                </div>
                                                                <div className="w-1 h-1 bg-caption rounded-full"></div>
                                                                <span className="text-xs text-caption">{relatedPost.created_at}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        );
    } catch (error) {
        return notFound();
    }
}