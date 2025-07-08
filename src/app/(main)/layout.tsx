import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { BottomNavigation } from "../_components/bottomNavigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/mobileHeader";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    return (
        <>
            {isMobile ? <MobileHeader /> : <Header userData={userData} />}
            {children}
            <Footer />
            {isMobile && <BottomNavigation />}
        </>
    );
}