import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./i18n";

export default getRequestConfig(async ({ locale }) => {
  if (!locale || locale !== "fa") {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: {
      common: (await import(`../locales/${locale}/common.json`)).default,
      pages: (await import(`../locales/${locale}/pages.json`)).default,
    },
    timeZone: "Asia/Tehran",
    now: new Date(),
  };
});
