import { peydaFont } from "@/constants/localFont";
import { defaultLocale } from "@/lib/i18n";
import { PWAProvider } from "@/providers/pwa-provider";
import { Toaster } from "@/ui/sonner";
import type { Metadata, Viewport } from "next";
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
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "اوشتو",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
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
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="اوشتو" />
        <link rel="apple-touch-icon" href="/icons/icon.svg" />
        <link rel="apple-touch-startup-image" href="/icons/app.jpg" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/app.jpg" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" />
        <link rel="apple-touch-startup-image" href="/icons/app.jpg" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)" />
      </head>
      <body className={peydaFont.className}>
        <NextTopLoader color="#e64eb5" />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PWAProvider>
            {children}
            <Toaster position='bottom-right' />
          </PWAProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
