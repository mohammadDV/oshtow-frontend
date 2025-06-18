import Image from "next/image";
import tehranImg from "@/assets/images/tehran.jpg";
import { cn } from "@/lib/utils";

interface PostCardProps {
  heightClass?: string;
  showAuthor?: boolean;
}

export const PostCard = ({ heightClass, showAuthor }: PostCardProps) => {
  return (
    <div
      className={cn(
        "relative overflow-hidden transition-all cursor-pointer rounded-2xl lg:rounded-3xl",
        heightClass
      )}
    >
      <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-gray-700"></div>
      <Image src={tehranImg} alt="" className="object-cover w-full h-full" />
      <div className="absolute bottom-0 z-20 w-full p-4 lg:p-6">
        <span className="bg-primary text-white text-xs lg:text-sm px-3 py-1.5 rounded-full">
          اخبار گردشگری
        </span>
        <h3 className="text-white text-lg lg:text-xl font-semibold mt-3 lg:mt-4">
          سفر به جاهای دیدنی تهران: از برج میلاد تا کاخ سعد آباد
        </h3>
        {showAuthor && (
          <p className="mt-2.5 lg:mt-3 text-white text-xs font-medium">مدیر وبسایت</p>
        )}
      </div>
    </div>
  );
};
