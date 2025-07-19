import { ProjectType } from "@/types/project.type";
import { PassengerForm } from "./_components/passengerForm";

interface CreateEditProjectsPageProps {
    params: Promise<{
        type: ProjectType;
        id: string
    }>;
}

export default async function CreateEditProjectsPage({ params }: CreateEditProjectsPageProps) {
    const resolvedParams = await params;

    return (
        <>
            <PassengerForm />
        </>
    )
}