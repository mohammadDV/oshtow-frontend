import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { MobileHeader } from "../_components/header/mobileHeader";
import { Header } from "../_components/header";
import { Footer } from "../_components/footer";
import { BottomNavigation } from "../_components/bottomNavigation";
import { UserInfo } from "@/types/user.type";
import { getFetchAuth } from "@/core/baseService";
import { apiUrls } from "@/constants/apiUrls";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface VerificationService {
    verify_email: boolean,
    verify_access: boolean,
    user: UserInfo
}

async function checkVerificationApi(): Promise<VerificationService> {
    return await getFetchAuth<VerificationService>(apiUrls.auth.checkVerification);
}

async function setUserDataViaCookie(userData: VerificationService) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/set-user-data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        
        if (!response.ok) {
            throw new Error('Failed to set cookie');
        }
    } catch (error) {
        console.error('Error setting user data cookie:', error);
    }
}

export default async function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isMobile = await isMobileDevice();
    const cookieStore = await cookies();
    const userDataCookie = cookieStore.get("userData");
    const token = cookieStore.get("token");
    let verifyEmail = false;

    if (userDataCookie) {
        try {
            const userData = JSON.parse(userDataCookie.value);
            verifyEmail = userData.verify_email;
        } catch (e) {
            console.log(e)
        }
    }

    if (verifyEmail) {
        return (
            <>
                {isMobile ? <MobileHeader /> : <Header />}
                {children}
                <Footer />
                {isMobile && <BottomNavigation />}
            </>
        );
    }

    if (!token) redirect("/auth/email-verification");

    const result = await checkVerificationApi();
    if (result?.verify_email) {
        await setUserDataViaCookie(result);
        
        return <>
            {isMobile ? <MobileHeader /> : <Header />}
            {children}
            <Footer />
            {isMobile && <BottomNavigation />}
        </>;
    }

    redirect("/auth/email-verification");
}