import { ProjectStatusType, ProjectType } from "@/types/project.type";
import { getTranslations } from "next-intl/server";
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

    return (
        <div>
            <h1 className="text-title text-2xl font-medium">
                {resolvedParams.type === "sender" && t("profile.projects.sendersTitle")}
                {resolvedParams.type === "passenger" && t("profile.projects.passengersTitle")}
            </h1>
            <ProfileProjectsList />
        </div>
    )
}