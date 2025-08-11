import Image from "next/image";
import Link from "next/link";
import { Post } from "@/types/post.tye";
import { Icon } from "@/ui/icon";
import { Badge } from "@/ui/badge";
import { cn, createFileUrl } from "@/lib/utils";
import { usePagesTranslation } from "@/hooks/useTranslation";

interface PostCardProps {
  data: Post;
  className?: string;
}

export const PostCard = ({ data, className }: PostCardProps) => {
  const t = usePagesTranslation();

  return (
    <Link href={`/post/${data.id}/${data.slug}`}>
      <div className={cn(
        "bg-white rounded-2xl lg:rounded-3xl overflow-hidden group transition-all duration-300 hover:-translate-y-1",
        className
      )}>
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={createFileUrl(data.image)}
            alt={data.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {data.special === 1 && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-primary text-white text-xs px-2 py-1">
                <Icon icon="solar--star-bold" sizeClass="size-3 mr-1" />
                {t("blog.specialBadge")}
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="p-4 lg:p-6">
          {data.pre_title && (
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-primary text-sm font-medium">{data.pre_title}</span>
            </div>
          )}

          <h3 className="text-title text-lg lg:text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {data.title}
          </h3>

          <p className="text-text text-sm lg:text-base mb-4 line-clamp-2">
            {data.summary}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Icon
                  icon="solar--calendar-outline"
                  sizeClass="size-4"
                  className="text-caption"
                />
                <span className="text-caption text-xs">
                  {data.created_at}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Icon
                  icon="solar--eye-outline"
                  sizeClass="size-4"
                  className="text-caption"
                />
                <span className="text-caption text-xs">
                  {data.view.toLocaleString('fa-IR')} {t("blog.views")}
                </span>
              </div>
            </div>
            <Icon
              icon="solar--arrow-left-outline"
              sizeClass="size-5"
              className="text-primary group-hover:translate-x-1 transition-transform duration-200"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};