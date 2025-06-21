import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const t = useCommonTranslation();

  const useFullLinks = [
    {
      id: 1,
      title: t("navigation.firstPage"),
      link: "/",
    },
    {
      id: 2,
      title: t("navigation.consignments"),
      link: "/consignments",
    },
    {
      id: 3,
      title: t("navigation.trips"),
      link: "/trips",
    },
    {
      id: 4,
      title: t("navigation.magazine"),
      link: "/blog",
    },
    {
      id: 5,
      title: t("navigation.faq"),
      link: "/faq",
    },
  ];

  const customerGuide = [
    {
      id: 1,
      title: t("navigation.about"),
      link: "/about",
    },
    {
      id: 2,
      title: t("navigation.contact"),
      link: "/contact",
    },
    {
      id: 3,
      title: t("navigation.faq"),
      link: "/faq",
    },
    {
      id: 4,
      title: t("navigation.privacyPolicy"),
      link: "/privacyPolicy",
    },
    {
      id: 5,
      title: t("navigation.plansCost"),
      link: "/plans",
    },
  ];

  return (
    <footer className="lg:mt-20 mt-12 container mx-auto px-4 mb-24 lg:mb-0">
      <div className="flex items-center gap-4">
        <span className="text-2xl lg:text-3xl font-bold text-primary flex-1 min-w-max">
          {t("brand.name")}
        </span>
        <div className="h-0.5 w-full bg-gradient-to-l from-border to-border/20"></div>
      </div>
      <div className="mt-5 lg:mt-8 grid lg:grid-cols-3 gap-8 lg:gap-20">
        <div>
          <h4 className="text-title font-semibold mb-2 lg:mb-3.5">
            {t("footer.aboutSite")}
          </h4>
          <p className="text-caption font-light text-justify text-sm leading-8">
            {t("footer.aboutContent")}
          </p>
        </div>
        <div className="flex lg:justify-around gap-14 lg:gap-12">
          <div>
            <h4 className="text-title font-semibold mb-4">
              {t("footer.useFullLinks")}
            </h4>
            <ul className="flex flex-col gap-4">
              {useFullLinks.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-primary transition-all text-caption text-sm font-light"
                >
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-title font-semibold mb-4">
              {t("footer.customerGuide")}
            </h4>
            <ul className="flex flex-col gap-4">
              {customerGuide.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-primary transition-all text-caption text-sm font-light"
                >
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-title font-semibold mb-4 lg:mt-0 mt-2">
            {t("footer.socialNetworks")}
          </h4>
          <div className="flex items-center gap-5">
            <Icon
              icon="streamline-logos--telegram-logo-2"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="streamline-logos--instagram-logo-2"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="streamline-logos--whatsapp-logo"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="streamline-logos--linkedin-logo"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="streamline-logos--google-mail-logo"
              sizeClass="size-7"
              className="text-primary"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="flex items-center justify-center p-3 border-2 border-border rounded-lg">
              <Image
                src={"/images/enamad.png"}
                alt=""
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-3 border-2 border-border rounded-lg">
              <Image
                src={"/images/enamad.png"}
                alt=""
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-3 border-2 border-border rounded-lg">
              <Image
                src={"/images/enamad.png"}
                alt=""
                width={72}
                height={72}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-l from-border/20 via-border to-border/20 mt-8 lg:mt-12"></div>
      <p className="text-center text-caption font-normal my-7">
        {t("footer.copyRight")}
      </p>
    </footer>
  );
};
