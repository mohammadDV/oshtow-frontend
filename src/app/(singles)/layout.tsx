import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Footer } from "../_components/footer";
import { Header } from "../_components/header";
import { SingleNavigation } from "./_components/singleNavigation";

export default async function SinglesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();

    return (
        <>
            {isMobile ? <SingleNavigation /> : <Header />}
            {children}
            <Footer />
        </>
    );
}