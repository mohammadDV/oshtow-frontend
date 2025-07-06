import { MobileSenderCard } from "@/app/_components/cards/mobileSender";
import { SenderCard } from "@/app/_components/cards/sender";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { Project } from "@/types/project.type";

interface SendersListProps {
  isMobile: boolean;
  data: Project[];
}

export const SendersList = ({ isMobile, data }: SendersListProps) => {
  const t = usePagesTranslation();

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-text">{t("projects.noSenderFound")}</p>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-3 lg:gap-6 mt-4 lg:mt-8">
      {isMobile
        ? data.map((project) => (
          <MobileSenderCard key={project.id} data={project} />
        ))
        : data.map((project) => (
          <SenderCard key={project.id} data={project} />
        ))}
    </div>
  );
};
