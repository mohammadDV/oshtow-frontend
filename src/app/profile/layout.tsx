import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { BottomNavigation } from "../_components/bottomNavigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/mobileHeader";
import { getWallet } from "./_api/getWallet";
import { ProfileSidebar } from "./_components/sidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("pages");
  const isMobile = await isMobileDevice();
  const userData = await getUserData();
  const walletData = await getWallet();

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header userData={userData} />}
      {!userData.verify_access && (
        <div className="flex lg:hidden items-center px-4 py-3.5 rounded-2xl bg-border justify-between mt-5 mx-4">
          <div className="flex items-center gap-2">
            <Icon icon="solar--notes-line-duotone" sizeClass="size-6" className="text-primary" />
            <span className="text-title text-lg font-medium">
              {t("profile.authTitle")}
            </span>
          </div>
          <Link href={'/profile/settings/auth'}>
            <Button variant={"outline"} size={"sm"} className="border-primary border text-primary">
              {t("profile.completeAuth")}
            </Button>
          </Link>
        </div>
      )}
      <div className="mt-5 lg:mt-10 md:flex justify-between mx-auto gap-8 container px-4">
        {!isMobile && <ProfileSidebar userData={userData} walletData={walletData} />}
        <div className="flex-1 lg:overflow-auto">
          {children}
        </div>
      </div>
      <Footer />
      {isMobile && <BottomNavigation />}
    </>
  );
}
