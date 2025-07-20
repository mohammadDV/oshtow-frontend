import { PassengerCard } from "@/app/_components/cards/passenger";
import { Carousel } from "@/app/_components/carousel";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { pathTypeGenerator, putCommas } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getPassenger } from "../_api/getPassenger";
import { ShareProject } from "../../_components/shareProject";
import { SubmitProjectCard } from "../../_components/submitProject";
import { getCheckRequest } from "../../_api/getCheckRequest";

interface PassengerPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PassengerPage({ params }: PassengerPageProps) {
  const t = await getTranslations("pages");
  const isMobile = await isMobileDevice();

  const resolvedParams = await params;

  const passengerData = await getPassenger({ id: resolvedParams.id });
  const checkRequestData = await getCheckRequest({ id: resolvedParams.id });

  return (
    <>
      <section className="relative mx-4 lg:mx-0 mt-4 lg:mt-0 rounded-xl lg:rounded-none lg:w-full z-10 h-32 lg:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={passengerData.project?.destination_image}
            alt=""
            priority
            width={1600}
            height={320}
            quality={100}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-gray-700/90 to-gray-700/30 lg:bg-gradient-to-l lg:from-gray-700/90 lg:to-gray-700/25"></div>
        </div>

        <div className="relative lg:max-w-6xl px-4 mx-auto z-10 h-full">
          <div className="flex flex-col justify-center items-start max-w-lg h-full text-white">
            <h1 className="text-xl lg:text-3xl font-semibold lg:font-bold mb-2 lg:mb-3">
              {passengerData.project.title}
            </h1>
            <p className="lg:text-lg text-white">
              {t("passenger.type")}
              <Link
                href={`/projects/passenger?path_type=${passengerData.project.path_type}`}
                className="text-sub mr-1">
                {pathTypeGenerator(passengerData.project.path_type)}
              </Link>
            </p>
          </div>
        </div>
      </section>
      <div className="lg:max-w-6xl mx-auto lg:px-4 lg:-mt-24 mt-4 z-20 relative">
        <div className="lg:flex items-start justify-between gap-5 px-4 lg:px-0">
          <div className="lg:w-2/3 bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl">
            <div>
              <h3 className="text-title font-normal text-lg mb-2.5 lg:mb-3">
                {t("passenger.details")}
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-4">
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--map-point-wave-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.origin")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {passengerData.project?.origin.country.title} - {passengerData.project?.origin.city.title}
                    </p>
                  </div>
                </div>
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--map-point-wave-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.destination")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {passengerData.project?.destination.country.title} - {passengerData.project?.destination.city.title}
                    </p>
                  </div>
                </div>
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--weigher-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.emptySize")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {passengerData.project?.weight || '-'} کیلو گرم
                    </p>
                  </div>
                </div>
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--calendar-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.startDate")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {passengerData.project?.send_date || '-'}
                    </p>
                  </div>
                </div>
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--calendar-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.endDate")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {passengerData.project?.receive_date || '-'}
                    </p>
                  </div>
                </div>
                <div className="py-2 px-2 lg:py-2.5 lg:px-3 rounded-lg lg:rounded-xl bg-light flex items-center gap-1.5 lg:gap-3">
                  <Icon
                    icon="solar--money-bag-bold-duotone"
                    sizeClass="size-7 lg:size-9"
                    className="text-sub"
                  />
                  <div className="flex flex-col gap-1 lg:gap-1.5">
                    <span className="text-caption font-normal text-xs lg:text-sm">
                      {t("passenger.suggestPrice")}
                    </span>
                    <p className="text-title font-normal lg:text-base text-sm">
                      {putCommas(passengerData.project?.amount) || '-'} تومان
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 lg:mt-7">
              <h3 className="text-title font-normal text-lg mb-1.5 lg:mb-2">
                {t("passenger.description")}
              </h3>
              <p className="text-caption font-normal text-justify text-sm leading-7">
                {passengerData.project.description}
              </p>
            </div>

            {!isMobile && (
              <div className="mt-7">
                <h3 className="text-title font-normal text-lg mb-3">
                  {t("passenger.sharePassenger")}
                </h3>
                <ShareProject />
              </div>
            )}
          </div>

          <SubmitProjectCard
            isMobile={isMobile}
            projectData={passengerData}
            title={t("passenger.submitRequestTitle")}
            submitLabel={t("passenger.submitRequest")}
            chatLabel={t("passenger.chat")}
            infoText={t("passenger.submitInfo")}
            showRequestButton={checkRequestData.request_enable}
            showChatButton={checkRequestData.chat_enable} />
        </div>

        <Carousel
          desktopSlidesPerView={3.5}
          title={t("passenger.sameItems")}
          slides={passengerData?.recommended?.map(item => <PassengerCard key={item.id} data={item} />)}
        />
      </div>
    </>
  );
}
