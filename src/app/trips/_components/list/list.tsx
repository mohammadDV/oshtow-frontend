import { TripCard } from "@/app/_components/cards/trip";

export const TripsList = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 mt-4 lg:mt-8">
      {Array.from({ length: 12 }, (_, index) => (
        <TripCard key={index} />
      ))}
    </div>
  );
};
