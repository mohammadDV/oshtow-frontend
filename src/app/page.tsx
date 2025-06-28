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
import { API_URL } from "@/configs/global";
import { apiUrls } from "@/constants/apiUrls";
import { Project } from "@/types/project.type";

interface FeaturedProjectsService {
  sender: Array<Project>;
  passenger: Array<Project>;
}

async function getFeaturedProjects(): Promise<FeaturedProjectsService> {
  const res = await fetch(
    `${API_URL}${apiUrls.projects.featured}`,
    {
      cache: 'no-store',
    }
  ).then((res) => res.json());
  return res.data;
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
        <AdvancedSearch />
      </div>
      <Benefits />
      <Carousel
        title={t("home.lastConsignments")}
        seeMoreLink="/"
        slides={featuredProjects.sender?.map(project => <ConsignmentCard key={project.id} data={project} />)}
      />
      <Carousel
        title={t("home.lastTrips")}
        seeMoreLink="/"
        slides={featuredProjects.sender?.map(project => <TripCard key={project.id} data={project} />)}

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
