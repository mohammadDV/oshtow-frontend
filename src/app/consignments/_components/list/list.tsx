import { ConsignmentCard } from "@/app/_components/cards/consignment";
import { MobileConsignmentCard } from "@/app/_components/cards/mobileConsignment";

interface ConsignmentsListProps {
  isMobile: boolean;
}

export const ConsignmentsList = ({ isMobile }: ConsignmentsListProps) => {
  return (
    <div className="grid lg:grid-cols-3 gap-3 lg:gap-6 mt-4 lg:mt-8">
      {isMobile
        ? Array.from({ length: 12 }, (_, index) => (
            <MobileConsignmentCard key={index} />
          ))
        : Array.from({ length: 12 }, (_, index) => (
            <ConsignmentCard key={index} />
          ))}
    </div>
  );
};
