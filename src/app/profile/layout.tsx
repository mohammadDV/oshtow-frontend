import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { getTranslations } from "next-intl/server";
import { BottomNavigation } from "../_components/bottomNavigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { getWallet } from "./_api/getWallet";
import { ProfileNavigation } from "./_components/profileNavigation/profileNavigation";
import { ProfileSidebar } from "./_components/sidebar";
import AuthPrompt from "./_components/authPrompt/authPrompt";

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
      {isMobile ? <ProfileNavigation /> : <Header userData={userData} />}
      {!userData.verify_access && <AuthPrompt variant="mobile" />}
      <div className="mt-4 lg:mt-10 md:flex justify-between items-start mx-auto gap-8 container px-4">
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
