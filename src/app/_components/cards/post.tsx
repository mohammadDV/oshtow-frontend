import Image from "next/image";
import Link from "next/link";
import { cn, createFileUrl } from "@/lib/utils";
import { Post } from "@/types/post.tye";

interface PostCardProps {
  heightClass?: string;
  showAuthor?: boolean;
  data: Post;
}

export const PostCard = ({ heightClass, showAuthor, data }: PostCardProps) => {
  return (
    <Link
      href={`/post/${data.id}/${data.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-2xl lg:rounded-3xl cursor-pointer",
        heightClass
      )}
    >
      <div className="w-full h-full">
        <Image
          src={createFileUrl(data.image)}
          alt={data.title || ""}
          width={800}
          height={800}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-700 to-transparent"></div>

      <div className="absolute bottom-0 left-0 w-full p-4 lg:p-6 text-white">
        <span className="inline-block bg-primary text-xs px-3 py-1 rounded-full">
          اخبار و مقالات
        </span>
        <h3 className="mt-3 text-lg lg:text-xl font-semibold line-clamp-2">
          {data.title}
        </h3>
        {showAuthor && (
          <p className="mt-2 text-xs font-medium">مدیر وبسایت</p>
        )}
      </div>
    </Link>
  );
};
