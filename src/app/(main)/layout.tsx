import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { MobileHeader } from "../_components/header/mobileHeader";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { BottomNavigation } from "../_components/bottomNavigation";

export default async function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile ? <MobileHeader /> : <Header />}
            {children}
            <Footer />
            {isMobile && <BottomNavigation />}
        </>
    );
}