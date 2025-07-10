import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { BottomNavigation } from "../_components/bottomNavigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/mobileHeader";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { ProfileSidebar } from "./_components/sidebar";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = await isMobileDevice();
  const userData = await getUserData();

  return (
    <>
      {isMobile ? <MobileHeader /> : <Header userData={userData} />}
      <div className="lg:mt-10 flex justify-between mx-auto gap-8 container px-4">
        <ProfileSidebar userData={userData} />
        {children}
      </div>
      <Footer />
      {isMobile && <BottomNavigation />}
    </>
  );
}
