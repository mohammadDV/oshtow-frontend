import { usePagesTranslation } from "@/hooks/useTranslation";
import { Benefits } from "./_components/benefits";
import { ConsignmentsCarousel } from "./_components/consignmentsCarousel";
import { Hero } from "./_components/hero";
import 'swiper/css';
import 'swiper/css/navigation';

export default function HomePage() {
  const t = usePagesTranslation();

  return (
    <>
      <Hero />
      <Benefits />
      <ConsignmentsCarousel title={t('home.lastConsignments')} />
    </>
  );
}
