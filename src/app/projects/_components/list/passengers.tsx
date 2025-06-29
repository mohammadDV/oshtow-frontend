import { PassengerCard } from "@/app/_components/cards/passenger";
import { Project } from "@/types/project.type";

interface SendersListProps {
    data: Project[];
}

export const PassengersList = ({ data }: SendersListProps) => {
    if (!data || data.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-text">هیچ سفری یافت نشد</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mt-4 lg:mt-8">
            {data.map((project) => (<PassengerCard key={project.id} data={project} />))}
        </div>
    );
};