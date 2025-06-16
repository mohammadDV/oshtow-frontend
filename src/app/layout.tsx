import { peydaFont } from "@/constants/localFont";
import type { Metadata } from "next";
import "../assets/icons/solar.css";
import { Header } from "./_components/header";
import "./globals.css";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { MobileHeader } from "./_components/header/mobileHeader";

export const metadata: Metadata = {
  title: "اوشتو | جابجایی سریع مرسوله های بین المللی",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMobile = await isMobileDevice();

  return (
    <html lang="fa" dir="rtl">
      <body className={peydaFont.className}>
        {isMobile ? <MobileHeader /> : <Header />}
        {children}
      </body>
    </html>
  );
}
