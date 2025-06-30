import { peydaFont } from "@/constants/localFont";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { defaultLocale } from "@/lib/i18n";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import NextTopLoader from 'nextjs-toploader';
import "swiper/css";
import "swiper/css/navigation";
import "../assets/icons/others.css";
import "../assets/icons/solar.css";
import { BottomNavigation } from "./_components/bottomNavigation";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { MobileHeader } from "./_components/header/mobileHeader";
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
  const isMobile = await isMobileDevice();
  const locale = defaultLocale;
  const messages = await getMessages();

  return (
    <html lang={locale} dir="rtl">
      <body className={peydaFont.className}>
        <NextTopLoader color="#e64eb5" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {isMobile ? <MobileHeader /> : <Header />}
          {children}
          <Footer />
          {isMobile && <BottomNavigation />}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
