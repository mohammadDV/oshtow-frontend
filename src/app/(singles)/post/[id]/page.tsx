import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/ui/badge";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import { PostCard } from "@/app/_components/cards/post";
import { getPost, getPosts } from "./_api/getPosts";
import Link from "next/link";

export default async function PostPage({ params }: { params: { id: string } }) {
    try {
        const post = await getPost(params.id);
        const relatedPosts = await getPosts();
        const t = await getTranslations("pages");

        if (!post) {
            return notFound();
        }

        // Format date for display
        const postDate = post.created_at;

        return (
            <main className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
                <div className="container mx-auto px-4 py-6 lg:py-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-caption mb-8 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-border/50">
                        <Link href="/" className="hover:text-primary transition-colors duration-200 font-medium">خانه</Link>
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3" />
                        <Link href="/posts" className="hover:text-primary transition-colors duration-200 font-medium">اخبار و مقالات</Link>
                        <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-3" />
                        <span className="text-primary font-semibold">{post.title}</span>
                    </nav>

                    {/* Main Content Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">

                            {/* Post Header */}
                            <header className="mb-10 text-center">
                                {post.pre_title && (
                                    <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
                                        {post.pre_title}
                                    </div>
                                )}
                                <h1 className="text-3xl lg:text-5xl font-bold text-title mb-6 leading-tight">
                                    {post.title}
                                </h1>
                                <div className="flex items-center justify-center gap-6 text-sm text-caption bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-border/50 inline-flex">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-primary/10 rounded-full">
                                            <Icon icon="solar--calendar-outline" sizeClass="size-4 text-primary" />
                                        </div>
                                        <span className="font-medium">{postDate}</span>
                                    </div>
                                    <div className="w-px h-4 bg-border"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 bg-primary/10 rounded-full">
                                            <Icon icon="solar--eye-outline" sizeClass="size-4 text-primary" />
                                        </div>
                                        <span className="font-medium">{post.view} بازدید</span>
                                    </div>
                                </div>
                            </header>

                            {/* Post Media */}
                            {(post.video || post.image) && (
                                <div className="relative w-full mb-10">
                                    {post.video ? (
                                        <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-border/20">
                                            <video
                                                src={post.video}
                                                controls
                                                className="w-full h-full object-cover"
                                                poster={post.image || undefined}
                                            >
                                                متصفح شما از ویدیو پشتیبانی نمی‌کند.
                                            </video>
                                        </div>
                                    ) : post.image && (
                                        <div className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden border border-border/20">
                                            <Image
                                                src={post.image}
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
                                <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 p-6 lg:p-8 rounded-2xl mb-10 border border-primary/20">
                                    <div className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/20 rounded-xl">
                                            <Icon icon="solar--document-text-outline" sizeClass="size-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-title mb-2">خلاصه مطلب</h3>
                                            <p className="text-lg leading-relaxed text-caption">{post.summary}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Post Content */}
                            <article className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 lg:p-10 mb-12 border border-border/50">
                                <div
                                    className="prose prose-lg max-w-none prose-headings:text-text prose-p:text-caption prose-p:leading-relaxed prose-a:text-primary prose-strong:text-text prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:text-caption"
                                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                                />
                            </article>

                            {/* Post Tags */}
                            <div className="flex flex-wrap gap-3 mb-8">
                                <Badge variant="default" className="px-4 py-2 text-sm font-medium">اخبار</Badge>
                                <Badge variant="outline" className="px-4 py-2 text-sm font-medium">مقالات</Badge>
                            </div>
                        </div>

                        {/* Sidebar - Related Posts */}
                        <div className="lg:col-span-1">
                            {relatedPosts.data && relatedPosts.data.length > 0 && (
                                <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50 sticky top-6">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-primary/10 rounded-xl">
                                                <Icon icon="solar--document-text-outline" sizeClass="size-5 text-primary" />
                                            </div>
                                            <h2 className="text-xl font-bold text-title">مطالب مرتبط</h2>
                                        </div>
                                        <p className="text-sm text-caption">مطالب دیگری که ممکن است برای شما جالب باشد</p>
                                    </div>
                                    <div className="space-y-4">
                                        {relatedPosts.data
                                            ?.filter(relatedPost => relatedPost.id !== post.id)
                                            .slice(0, 4)
                                            .map(relatedPost => (
                                                <div key={relatedPost.id}
                                                    className="transform transition-all duration-300 hover:scale-105">
                                                    <PostCard
                                                        data={relatedPost}
                                                        showAuthor={false}
                                                        heightClass="h-40"
                                                    />
                                                </div>
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