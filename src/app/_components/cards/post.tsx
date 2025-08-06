import Image from "next/image";
import { cn, createFileUrl } from "@/lib/utils";
import { Post } from "@/types/post.tye";
import Link from "next/link";

interface PostCardProps {
  heightClass?: string;
  showAuthor?: boolean;
  data: Post;
}

export const PostCard = ({ heightClass, showAuthor, data }: PostCardProps) => {
  return (
    <Link
      href={`/post/${data.id}`}
      className={cn(
        "relative overflow-hidden transition-all cursor-pointer rounded-2xl lg:rounded-3xl",
        heightClass
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-gray-700"></div>
      <Image src={createFileUrl(data.image)} alt="" width={512} height={512} className="object-cover w-full h-full" />
      <div className="absolute bottom-0 z-20 w-full p-4 lg:p-6">
        <span className="bg-primary text-white text-xs  px-3 py-1 rounded-full">
          اخبار و مقالات
        </span>
        <h3 className="text-white text-lg lg:text-xl font-semibold mt-3 line-clamp-1">
          {data.title}
        </h3>
        {showAuthor && (
          <p className="mt-2.5 lg:mt-3 text-white text-xs font-medium">مدیر وبسایت</p>
        )}
      </div>
    </Link>
  );
};
