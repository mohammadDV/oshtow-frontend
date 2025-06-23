import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getTranslations } from "next-intl/server";
import { Benefits } from "./_components/benefits";
import { ConsignmentCard } from "./_components/cards/consignment";
import { PostCard } from "./_components/cards/post";
import { TripCard } from "./_components/cards/trip";
import { Carousel } from "./_components/carousel";
import { CtaBanner } from "./_components/ctaBanner";
import { Hero } from "./_components/hero";
import { LastPosts } from "./_components/lastPosts";
import { AdvancedSearch } from "./_components/advancedSearch";

export default async function HomePage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");

  return (
    <>
      <Hero />
      <div className="mx-4 -mt-16 lg:-mt-24 z-20 relative">
        <AdvancedSearch />
      </div>
      <Benefits />
      <Carousel
        title={t("home.lastConsignments")}
        seeMoreLink="/"
        slides={Array.from({ length: 6 }, (_, index) => (
          <ConsignmentCard key={index} />
        ))}
      />
      <Carousel
        title={t("home.lastTrips")}
        seeMoreLink="/"
        slides={Array.from({ length: 6 }, (_, index) => (
          <TripCard key={index} />
        ))}
      />
      <CtaBanner />
      {isMobile ? (
        <Carousel
          title={t("home.postsTitle")}
          seeMoreLink="/"
          slides={Array.from({ length: 4 }, (_, index) => (
            <PostCard key={index} heightClass="h-64" showAuthor />
          ))}
        />
      ) : (
        <LastPosts />
      )}
    </>
  );
}
