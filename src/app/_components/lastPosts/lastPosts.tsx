import {
    useCommonTranslation,
    usePagesTranslation,
} from "@/hooks/useTranslation";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { PostCard } from "../cards/post";

export const LastPosts = () => {
  const t = useCommonTranslation();
  const tPage = usePagesTranslation();

  return (
    <section className="container mx-auto px-4 mt-8 lg:mt-16">
      <div className="flex items-center justify-between mb-4 lg:mb-6 pl-4 lg:pl-0">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <h2 className="text-lg lg:text-2xl font-bold text-title">
            {tPage("home.postsTitle")}
          </h2>
          <div className="h-0.5 rounded-full w-9 lg:w-12 bg-hint"></div>
        </div>
        <div className="flex items-center justify-end gap-4">
          <Link
            href={"/"}
            className="h-8 lg:h-9 flex items-center gap-1.5 justify-center px-3 lg:px-4 text-primary text-xs lg:text-sm rounded-full bg-white"
          >
            {t("buttons.seeMore")}
            <Icon
              icon="solar--alt-arrow-left-outline"
              sizeClass="size-3 lg:size-4"
            />
          </Link>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-5">
        <PostCard heightClass="h-96" showAuthor />
        <div className="flex flex-col gap-5">
          <PostCard heightClass="h-[182px]" />
          <PostCard heightClass="h-[182px]" />
        </div>
        <PostCard heightClass="h-96" showAuthor />
      </div>
    </section>
  );
};
