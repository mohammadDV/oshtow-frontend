import { ConsignmentCard } from "@/app/_components/cards/consignment";
import { MobileConsignmentCard } from "@/app/_components/cards/mobileConsignment";
import { Project } from "@/types/project.type";

interface ConsignmentsListProps {
  isMobile: boolean;
  data: Project[];
}

export const ConsignmentsList = ({ isMobile, data }: ConsignmentsListProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text">هیچ محموله‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-3 lg:gap-6 mt-4 lg:mt-8">
      {isMobile
        ? data.map((project) => (
            <MobileConsignmentCard key={project.id} data={project} />
          ))
        : data.map((project) => (
            <ConsignmentCard key={project.id} data={project} />
          ))}
    </div>
  );
};
