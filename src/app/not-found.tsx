import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import notFoundImg from "@/assets/images/not-found.png"
import Image from "next/image";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { MobileHeader } from "./_components/header/mobileHeader";
import { Header } from "./_components/header";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { isEmpty } from "@/lib/utils";

export default async function NotFound() {
    const isMobile = await isMobileDevice();
    const userData = await getUserData();
    const tCommon = await getTranslations("common");
    const tPages = await getTranslations("pages");

    return (
        <>
            {isMobile ? <MobileHeader /> : <Header userData={userData} />}
            <div className="flex items-center justify-center px-4">
                <div className="text-center max-w-lg mx-auto">
                    <Image src={notFoundImg} alt="" width={512} height={512} />
                    <div className="mb-7">
                        <h1 className="text-2xl lg:text-3xl font-bold text-title mb-4 lg:-mt-6">
                            {tPages("notFound.title")}
                        </h1>
                        <p className="text-caption mb-8">
                            {tPages("notFound.description")}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link href="/">
                            <Button variant="default" size={"lg"}>
                                {tCommon("buttons.goHome")}
                            </Button>
                        </Link>
                        {!isEmpty(userData) && (
                            <Link href="/profile">
                                <Button variant="outline" size={"lg"}>
                                    {tCommon("buttons.goProfile")}
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}