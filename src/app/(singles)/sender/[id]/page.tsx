import { SenderCard } from "@/app/_components/cards/sender";
import { Carousel } from "@/app/_components/carousel";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getSender } from "../_api/getSender";
import { ShareProject } from "../../_components/shareProject";
import { SubmitProjectCard } from "../../_components/submitProject";
import { getCheckRequest } from "../../_api/getCheckRequest";

interface SenderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function SenderPage({ params }: SenderPageProps) {
  const t = await getTranslations("pages");
  const isMobile = await isMobileDevice();

  const resolvedParams = await params;

  const senderData = await getSender({ id: resolvedParams.id });
  const checkRequestData = await getCheckRequest({ id: resolvedParams.id });

  return (
    <>
      <div className="lg:max-w-6xl mx-auto lg:px-4 lg:mt-10 mt-4">
        <div className="lg:flex items-start justify-between gap-5 px-4 lg:px-0">
          <div className="lg:w-2/3 bg-white p-4 lg:p-8 rounded-2xl lg:rounded-3xl">
            <h1 className="text-title font-semibold text-lg lg:text-xl">
              {senderData.project.title}
            </h1>
            <div className="text-text font-normal mt-2 lg:mt-3">
              {t("sender.category")}
              {senderData.project?.categories?.map((cat, index) => (
                <div key={cat.id}
                  className="inline-block mr-1">
                  <Link key={cat.id}
                    href={`/projects/sender?categories=${cat.id}`}>
                    <span className="text-primary">{cat.title}</span>
                  </Link>
                  {senderData.project?.categories.length - 1 > index && <span className="mr-1 text-hint">|</span>}
                </div>
              ))}
            </div>
            <hr className="border-t border-border my-4 lg:my-5" />

            <div>
              <h3 className="text-title font-normal text-lg mb-2.5 lg:mb-3">
                {t("sender.details")}
              </h3>
              <div className="border border-border p-4 rounded-2xl gap-y-2.5 grid lg:grid-cols-2 lg:gap-x-14 lg:gap-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--map-point-wave-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.origin")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.origin.country.title} - {senderData.project?.origin.city.title}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--map-point-wave-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.destination")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.destination.country.title} - {senderData.project?.destination.city.title}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--calendar-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.startDate")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.send_date || '-'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--calendar-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.endDate")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.receive_date || '-'}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--weigher-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.weight")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.weight || '-'} کیلو گرم
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Icon
                      icon="solar--box-minimalistic-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.size")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    {senderData.project?.dimensions || '-'}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 lg:mt-7">
              <h3 className="text-title font-normal text-lg mb-1.5 lg:mb-2">
                {t("sender.description")}
              </h3>
              <p className="text-caption font-normal text-justify text-sm leading-7">
                {senderData.project.description}
              </p>
            </div>

            {!isMobile && (
              <div className="mt-7">
                <h3 className="text-title font-normal text-lg mb-3">
                  {t("sender.shareSender")}
                </h3>
                <ShareProject />
              </div>
            )}

            {isMobile && (
              <Link
                href={`/user/${senderData.project.user.id}`}
                className="flex items-center gap-1.5 mt-4">
                <img
                  src={senderData.project.user.profile_photo_path!}
                  alt=""
                  width={40}
                  height={40}
                  className="rounded-full object-cover" />
                <div className="text-sm font-normal text-text">
                  <span className="text-primary">
                    {senderData.project.user.nickname}
                  </span>
                  <span className="ms-1">
                    {t("sender.hasSubmitAd")}
                  </span>
                </div>
              </Link>
            )}
          </div>

          <SubmitProjectCard
            isMobile={isMobile}
            projectData={senderData}
            title={t("sender.submitProposalTitle")}
            submitLabel={t("sender.submitProposal")}
            chatLabel={t("sender.chat")}
            infoText={t("sender.submitInfo")}
            showRequestButton={checkRequestData.request_enable}
            showChatButton={checkRequestData.chat_enable} />
        </div>

        <Carousel
          desktopSlidesPerView={3.5}
          title={t("sender.sameItems")}
          slides={senderData.recommended?.map(item => <SenderCard key={item.id} data={item} />)}
        />
      </div>
    </>
  );
}
