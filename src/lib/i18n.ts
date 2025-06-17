export const locales = ["fa"] as const;
export const defaultLocale = "fa" as const;

export type Locale = (typeof locales)[number];

export const localeConfig = {
  fa: {
    name: "فارسی",
    dir: "rtl",
    flag: "🇮🇷",
  },
  // Future languages can be added here:
  // en: {
  //   name: 'English',
  //   dir: 'ltr',
  //   flag: '🇺🇸'
  // }
};
