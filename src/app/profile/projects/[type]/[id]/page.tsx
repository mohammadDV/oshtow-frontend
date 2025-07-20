import { ProjectType } from "@/types/project.type";
import { PassengerForm } from "./_components/passengerForm";
import { getProjectEdit } from "./_api/getProjectEdit";

interface CreateEditProjectsPageProps {
    params: Promise<{
        type: ProjectType;
        id: string
    }>;
}

export default async function CreateEditProjectsPage({ params }: CreateEditProjectsPageProps) {
    const resolvedParams = await params;
    let projectData;

    if (resolvedParams.id !== "create") {
        projectData = await getProjectEdit({ id: resolvedParams.id })
    }

    return (
        <>
            <PassengerForm projectData={projectData} id={resolvedParams.id} />
        </>
    )
}