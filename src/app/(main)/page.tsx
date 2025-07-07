import { apiUrls } from "@/constants/apiUrls";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Project } from "@/types/project.type";
import { getTranslations } from "next-intl/server";
import { PassengerCard } from "../_components/cards/passenger";
import { PostCard } from "../_components/cards/post";
import { SenderCard } from "../_components/cards/sender";
import { Carousel } from "../_components/carousel";
import { AdvancedSearch } from "./_components/advancedSearch";
import { MobileAdvancedSearch } from "./_components/advancedSearch/mobileAdvancedSearch";
import { Benefits } from "./_components/benefits";
import { CtaBanner } from "./_components/ctaBanner";
import { Hero } from "./_components/hero";
import { LastPosts } from "./_components/lastPosts";
import { getFetch } from "@/core/publicService";

interface FeaturedProjectsService {
  data: {
    sender: Array<Project>;
    passenger: Array<Project>;
  }
}

async function getFeaturedProjects(): Promise<FeaturedProjectsService> {
  return await getFetch<FeaturedProjectsService>(apiUrls.projects.featured);
}

export default async function HomePage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");
  const featuredProjectsData = getFeaturedProjects() || {};

  const [featuredProjects] = await Promise.all([featuredProjectsData]);

  return (
    <>
      <Hero />
      <div className="mx-4 -mt-16 lg:-mt-24 z-20 relative">
        {isMobile ? <MobileAdvancedSearch /> : <AdvancedSearch />}
      </div>
      <Benefits />
      <Carousel
        title={t("home.lastSenders")}
        seeMoreLink="/"
        slides={featuredProjects.data?.sender?.map(project => <SenderCard key={project.id} data={project} />)}
      />
      <Carousel
        title={t("home.lastPassengers")}
        seeMoreLink="/"
        slides={featuredProjects.data?.sender?.map(project => <PassengerCard key={project.id} data={project} />)}

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
