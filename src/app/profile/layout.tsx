import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { BottomNavigation } from "../_components/bottomNavigation";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { MobileHeader } from "../_components/header/mobileHeader";

export default async function ProfileLayout({
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