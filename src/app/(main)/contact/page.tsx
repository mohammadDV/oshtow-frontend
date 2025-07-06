import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";

export default async function ContactPage() {
  const t = await getTranslations("pages");

  return (
    <div className="lg:mt-14 mt-8 mb-16 lg:mb-24">
      <h1 className="text-2xl lg:text-3xl text-title text-center font-semibold mb-3">
        {t("contact.title")}
      </h1>
      <p className="text-center text-caption lg:text-xl font-normal">
        {t("contact.description")}
      </p>
      <div className="lg:max-w-5xl mx-auto px-4 mt-6 lg:mt-12">
        <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
          <div className="rounded-2xl lg:rounded-3xl bg-white py-7 lg:py-9 flex flex-col items-center">
            <div className="flex items-center justify-center size-14 rounded-full bg-sub/25">
              <Icon
                icon="solar--letter-linear"
                sizeClass="size-8"
                className="text-primary"
              />
            </div>
            <h3 className="text-title text-lg font-semibold mt-6 mb-3">
              {t("contact.email")}
            </h3>
            <p className="text-text font-normal">Info@oshtow.com</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl bg-white py-7 lg:py-9 flex flex-col items-center">
            <div className="flex items-center justify-center size-14 rounded-full bg-sub/25">
              <Icon
                icon="solar--phone-calling-outline"
                sizeClass="size-8"
                className="text-primary"
              />
            </div>
            <h3 className="text-title text-lg font-semibold mt-6 mb-3">
              {t("contact.phone")}
            </h3>
            <p className="text-text font-normal">۰۹۱۷۷۷۰۵۹۵۲</p>
          </div>
          <div className="rounded-2xl lg:rounded-3xl bg-white py-7 lg:py-9 flex flex-col items-center">
            <div className="flex items-center justify-center size-14 rounded-full bg-sub/25">
              <Icon
                icon="solar--map-point-wave-outline"
                sizeClass="size-8"
                className="text-primary"
              />
            </div>
            <h3 className="text-title text-lg font-semibold mt-6 mb-3">
              {t("contact.address")}
            </h3>
            <p className="text-text font-normal">تهران، خیابان ولیعصر...</p>
          </div>
        </div>

        <div className="mt-8 lg:mt-12">
          <iframe
            title="map-iframe"
            src="https://neshan.org/maps/iframe/places/tehran-city#c35.701-51.738-9z-0p/35.70069306001047/51.401448230279264"
            className="w-full lg:h-72 rounded-2xl lg:rounded-3xl"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>

        <div className="mt-8 lg:mt-12">
          <div className="w-full bg-white rounded-2xl lg:rounded-3xl py-9">
            <h2 className="text-center text-lg font-semibold text-title mb-6">
              {t("contact.socialNetwork")}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="size-12 bg-sub/30 flex items-center justify-center rounded-full">
                <Icon
                  icon="iconoir--telegram"
                  sizeClass="size-6"
                  className="text-primary"
                />
              </div>
              <div className="size-12 bg-sub/30 flex items-center justify-center rounded-full">
                <Icon
                  icon="iconoir--instagram"
                  sizeClass="size-6"
                  className="text-primary"
                />
              </div>
              <div className="size-12 bg-sub/30 flex items-center justify-center rounded-full">
                <Icon
                  icon="iconoir--whatsapp"
                  sizeClass="size-6"
                  className="text-primary"
                />
              </div>
              <div className="size-12 bg-sub/30 flex items-center justify-center rounded-full">
                <Icon
                  icon="iconoir--facebook"
                  sizeClass="size-6"
                  className="text-primary"
                />
              </div>
              <div className="size-12 bg-sub/30 flex items-center justify-center rounded-full">
                <Icon
                  icon="iconoir--linkedin"
                  sizeClass="size-6"
                  className="text-primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
