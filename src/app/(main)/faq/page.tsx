import { getTranslations } from "next-intl/server";
import { FaqSection } from "./_components/faqSection";

export default async function FaqPage() {
  const t = await getTranslations("pages");

  return (
    <div className="lg:mt-14 mt-8 mb-16 lg:mb-24">
      <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
        {t("faq.title")}
      </h1>
      <p className="text-center text-caption lg:text-xl font-normal">
        {t("faq.description")}
      </p>
      <FaqSection />
    </div>
  );
}
