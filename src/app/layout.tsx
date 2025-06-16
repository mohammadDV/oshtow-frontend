import type { Metadata } from "next";
import "./globals.css";
import { peydaFont } from "@/constants/localFont";

export const metadata: Metadata = {
  title: "اوشتو | جابجایی سریع مرسوله های بین المللی",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={peydaFont.className}>{children}</body>
    </html>
  );
}
