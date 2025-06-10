import { getTranslations } from "next-intl/server";
import Image from "next/image";
import shippingParcel from "@/assets/images/shipping-parcel.jpg";
import sendParcel from "@/assets/images/send-parcel.png";

export default async function ContactPage() {
    const t = await getTranslations("pages");

    return (
        <div className="lg:mt-14 mt-8 mb-16 lg:mb-24 container mx-auto px-4">
            <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
                {t("about.title")}
            </h1>
            <p className="text-center text-caption lg:text-xl font-normal">
                {t("about.description")}
            </p>
            <div className="mt-12 lg:mt-20 flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-16">
                <div className="lg:w-1/2 w-full">
                    <h2 className="text-title font-semibold text-lg lg:text-2xl mb-3 lg:mb-5">
                        {t("about.firstContentTitle")}
                    </h2>
                    <p className="text-caption text-sm lg:text-base font-normal text-justify leading-6 lg:leading-7">
                        {t("about.firstContentDescription")}
                    </p>
                </div>
                <Image src={shippingParcel} alt="" height={345} width={580} className="lg:w-1/2 w-full rounded-2xl lg:rounded-3xl" />
            </div>
            <div className="mt-12 lg:mt-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-6 lg:gap-16">
                <Image src={sendParcel} alt="" height={345} width={580} className="lg:w-1/2 w-full rounded-2xl lg:rounded-3xl" />
                <div className="lg:w-1/2 w-full">
                    <h2 className="text-title font-semibold text-lg lg:text-2xl mb-3 lg:mb-5">
                        {t("about.secondContentTitle")}
                    </h2>
                    <p className="text-caption text-sm lg:text-base font-normal text-justify leading-6 lg:leading-7">
                        {t("about.secondContentDescription")}
                    </p>
                </div>
            </div>
        </div>
    )
}