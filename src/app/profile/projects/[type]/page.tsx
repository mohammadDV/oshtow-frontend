import { Pagination } from "@/app/_components/pagination/pagination";
import { ProjectStatusType, ProjectType } from "@/types/project.type";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getProfileProjects } from "../_api/getProfileProjects";
import { ProfileProjectsList } from "../_components/list/projectsList";

interface ProfileProjectsPageProps {
    params: Promise<{
        type: ProjectType;
    }>;
    searchParams: Promise<{
        page?: string;
        status?: ProjectStatusType;
    }>;
}

export default async function ProfileProjectsPage({ params, searchParams }: ProfileProjectsPageProps) {
    const t = await getTranslations("pages");

    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const status = resolvedSearchParams?.status;

    const projectsData = await getProfileProjects({
        type: resolvedParams.type,
        status,
        page,
        count: 6
    });

    return (
        <div>
            <div className="flex items-center justify-between">
                <h1 className="text-title text-xl lg:text-2xl font-medium">
                    {resolvedParams.type === "sender" && t("profile.projects.sendersTitle")}
                    {resolvedParams.type === "passenger" && t("profile.projects.passengersTitle")}
                </h1>
                <Link href={`/profile/projects/${resolvedParams.type}/create`}>
                    <Icon icon="solar--add-square-bold" sizeClass="size-10" className="block lg:hidden text-primary" />
                </Link>
            </div>
            <ProfileProjectsList
                type={resolvedParams.type}
                projects={projectsData.data}
                selectedStatus={status}
            />
            {projectsData?.total > 6 && (
                <div className="mt-8">
                    <Pagination
                        currentPage={projectsData.current_page}
                        lastPage={projectsData.last_page}
                        links={projectsData.links}
                        total={projectsData.total}
                        routeUrl="/profile/projects"
                    />
                </div>
            )}
        </div>
    )
}