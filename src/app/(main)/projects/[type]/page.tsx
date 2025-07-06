import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { PathType, ProjectType } from "@/types/project.type";
import { getTranslations } from "next-intl/server";
import { getProjects } from "../_api/getProjects";
import { ProjectsFilters } from "../_components/filters";
import { MobileProjectsFilters } from "../_components/filters/mobileFilters";
import { RemoveFilters } from "../_components/filters/removeFilters";
import { PassengersList } from "../_components/list/passengers";
import { SendersList } from "../_components/list/senders";
import { Pagination } from "../_components/pagination";
import { ProjectsSort } from "../_components/sort";

interface ProjectsPageProps {
  params: Promise<{
    type: ProjectType;
  }>;
  searchParams: Promise<{
    page?: string;
    o_country_id?: string;
    o_province_id?: string;
    o_city_id?: string;
    d_country_id?: string;
    d_province_id?: string;
    d_city_id?: string;
    send_date?: string;
    receive_date?: string;
    categories?: string | string[];
    path_type?: PathType;
    min_weight?: string;
    max_weight?: string;
    sort?: string;
    column?: string;
  }>;
}

export default async function ProjectsPage({ params, searchParams }: ProjectsPageProps) {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const page = parseInt(resolvedSearchParams?.page || "1");
  const o_country_id = resolvedSearchParams?.o_country_id;
  const o_province_id = resolvedSearchParams?.o_province_id;
  const o_city_id = resolvedSearchParams?.o_city_id;
  const d_country_id = resolvedSearchParams?.d_country_id;
  const d_province_id = resolvedSearchParams?.d_province_id;
  const d_city_id = resolvedSearchParams?.d_city_id;
  const send_date = resolvedSearchParams?.send_date;
  const receive_date = resolvedSearchParams?.receive_date;
  const path_type = resolvedSearchParams?.path_type;
  const min_weight = resolvedSearchParams?.min_weight;
  const max_weight = resolvedSearchParams?.max_weight;
  const sort = resolvedSearchParams?.sort;
  const column = resolvedSearchParams?.column;

  const categoriesParam = resolvedSearchParams?.categories;
  const categories = Array.isArray(categoriesParam)
    ? categoriesParam
    : categoriesParam
      ? [categoriesParam]
      : undefined;

  const projectsData = await getProjects({
    type: resolvedParams.type,
    page,
    o_country_id,
    o_province_id,
    o_city_id,
    d_country_id,
    d_province_id,
    d_city_id,
    send_date,
    receive_date,
    categories,
    path_type,
    min_weight,
    max_weight,
    sort,
    column
  });

  return (
    <div className="flex items-start justify-between lg:gap-9 container mx-auto px-4 mt-4 lg:mt-12">
      {!isMobile && (
        <aside className="lg:w-72 bg-white rounded-3xl p-6">
          <ProjectsFilters type={resolvedParams.type} />
        </aside>
      )}
      <main className="flex-1">
        <h1 className="text-title text-xl lg:text-2xl font-semibold mb-3 lg:mb-4">
          {resolvedParams.type === "sender" && t("projects.sendersTitle")}
          {resolvedParams.type === "passenger" && t("projects.passengersTitle")}
        </h1>
        <div className="flex items-center flex-wrap lg:justify-between gap-2 mb-6 lg:mb-0">
          {isMobile && <MobileProjectsFilters type={resolvedParams.type} />}
          <ProjectsSort type={resolvedParams.type} />
          {isMobile && <RemoveFilters />}
          {!isMobile && (
            <p className="text-sm font-normal text-caption">
              {projectsData.total} {' '}
              {resolvedParams.type === "sender" && t("projects.foundedSender")}
              {resolvedParams.type === "passenger" && t("projects.foundedPassenger")}
            </p>
          )}
        </div>
        {resolvedParams.type === "sender" && <SendersList isMobile={isMobile} data={projectsData.data} />}
        {resolvedParams.type === "passenger" && <PassengersList data={projectsData.data} />}
        <Pagination
          currentPage={projectsData.current_page}
          lastPage={projectsData.last_page}
          links={projectsData.links}
          total={projectsData.total}
        />
      </main>
    </div>
  );
}
