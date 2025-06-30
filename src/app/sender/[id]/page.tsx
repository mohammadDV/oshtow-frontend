import { SenderCard } from "@/app/_components/cards/sender";
import { Carousel } from "@/app/_components/carousel";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import { getSender } from "../_api/getSender";
import Link from "next/link";

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
                      icon="solar--weigher-bold-duotone"
                      sizeClass="size-6"
                      className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                      {t("sender.size")}
                    </span>
                  </div>
                  <p className="text-title text-left text-sm font-normal">
                    -
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
                  {t("sender.share")}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 bg-sub/30 flex items-center justify-center rounded-full">
                      <Icon
                        icon="iconoir--telegram"
                        sizeClass="size-5"
                        className="text-primary"
                      />
                    </div>
                    <div className="size-9 bg-sub/30 flex items-center justify-center rounded-full">
                      <Icon
                        icon="iconoir--instagram"
                        sizeClass="size-5"
                        className="text-primary"
                      />
                    </div>
                    <div className="size-9 bg-sub/30 flex items-center justify-center rounded-full">
                      <Icon
                        icon="iconoir--whatsapp"
                        sizeClass="size-5"
                        className="text-primary"
                      />
                    </div>
                    <div className="size-9 bg-sub/30 flex items-center justify-center rounded-full">
                      <Icon
                        icon="iconoir--facebook"
                        sizeClass="size-5"
                        className="text-primary"
                      />
                    </div>
                    <div className="size-9 bg-sub/30 flex items-center justify-center rounded-full">
                      <Icon
                        icon="iconoir--linkedin"
                        sizeClass="size-5"
                        className="text-primary"
                      />
                    </div>
                  </div>
                  <div className="bg-gray-100 flex items-center justify-center text-gray-400 text-sm gap-2.5 py-2 px-4 rounded-full">
                    {t("sender.copyLink")}
                    <Icon icon="solar--copy-outline" sizeClass="size-5" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {!isMobile && (
            <div className="lg:w-1/3 rounded-3xl p-6 bg-white sticky top-4">
              <p className="text-title font-normal text-lg mb-4">
                {t("sender.submitProposalTitle")}
              </p>
              <Button variant={"default"} size={"lg"} className="mb-3 w-full">
                {t("sender.submitProposal")}
                <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
              </Button>
              <Button variant={"ghost"} size={"lg"} className="mb-5 w-full">
                {t("sender.chat")}
                <Icon
                  icon="solar--chat-round-dots-outline"
                  sizeClass="size-5"
                />
              </Button>
              <div className="flex gap-2">
                <Icon
                  icon="solar--info-circle-outline"
                  sizeClass="size-5"
                  className="text-caption"
                />
                <p className="text-caption font-light text-sm">
                  {t("sender.submitInfo")}
                </p>
              </div>
            </div>
          )}
        </div>

        <Carousel
          desktopSlidesPerView={3.5}
          title={t("sender.sameItems")}
          slides={senderData.recommended?.map(item => <SenderCard key={item.id} data={item} />)}
        />
      </div>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-white z-50 py-4 border-t border-border px-5">
          <div className="flex items-center justify-between gap-3.5">
            <Button variant={"default"} size={"default"} className="flex-1">
              {t("sender.submitProposal")}
              <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
            </Button>
            <Button variant={"ghost"} size={"default"} className="flex-1">
              {t("sender.chat")}
              <Icon icon="solar--chat-round-dots-outline" sizeClass="size-5" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
