import { SITE_URL } from "@/configs/global";
import { getTranslations } from "next-intl/server";

async function getPrivacyHtml() {
  const res = await fetch(`${SITE_URL}/htmlPages/privacy-policy-fa.html`);

  if (!res.ok) {
    return `<p class="text-red-500 text-center">خطا در بارگذاری شرایط حریم خصوصی</p>`;
  }

  return res.text();
}

export default async function PrivacyPolicyPage() {
  const t = await getTranslations("pages");
  const htmlContent = await getPrivacyHtml();

  return (
    <div className="lg:mt-14 mt-8 mb-16 lg:mb-24 container mx-auto px-4">
      <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
        {t("privacyPolicy.title")}
      </h1>
      <p className="text-center text-caption lg:text-xl font-normal">
        {t("privacyPolicy.description")}
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
