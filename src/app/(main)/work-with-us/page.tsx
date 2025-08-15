import { SITE_URL } from "@/configs/global";
import { getTranslations } from "next-intl/server";

async function getWorkHtml() {
  const res = await fetch(`${SITE_URL}/htmlPages/work-with-us-fa.html`);

  if (!res.ok) {
    return `<p class="text-red-500 text-center">خطا در بارگذاری شرایط حریم خصوصی</p>`;
  }

  return res.text();
}

export default async function WorkWithUsPage() {
  const t = await getTranslations("pages");
  const htmlContent = await getWorkHtml();

  return (
    <div className="lg:mt-14 mt-8 mb-16 lg:mb-24 container mx-auto px-4">
      <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
        {t("workWithUs.title")}
      </h1>
      <p className="text-center text-caption lg:text-xl font-normal">
        {t("workWithUs.description")}
      </p>
      <div className="mt-7 lg:mt-14">
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
