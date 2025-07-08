import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SingleNavigation } from "./_components/singleNavigation";
import { getUserData } from "@/lib/getUserDataFromHeaders";

export default async function SinglesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();

    return (
        <>
            {isMobile ? <SingleNavigation /> : <Header userData={userData} />}
            {children}
            <Footer />
        </>
    );
}