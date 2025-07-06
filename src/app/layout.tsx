import { peydaFont } from "@/constants/localFont";
import { defaultLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from 'nextjs-toploader';
import "swiper/css";
import "swiper/css/navigation";
import "../assets/icons/others.css";
import "../assets/icons/solar.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "اوشتو | جابجایی سریع مرسوله های بین المللی",
  description: "",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = defaultLocale;
  const messages = await getMessages();

  return (
    <html lang={locale} dir="rtl">
      <body className={peydaFont.className}>
        <NextTopLoader color="#e64eb5" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
