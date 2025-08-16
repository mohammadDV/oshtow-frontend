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
      title: t("navigation.senders"),
      link: "/projects/sender",
    },
    {
      id: 2,
      title: t("navigation.passengers"),
      link: "/projects/passenger",
    },
    {
      id: 3,
      title: t("navigation.blog"),
      link: "/blog",
    },
    {
      id: 4,
      title: t("navigation.about"),
      link: "/about",
    },
    {
      id: 5,
      title: t("navigation.contact"),
      link: "/contact",
    },
  ];

  const customerGuide = [
    {
      id: 1,
      title: t("navigation.faq"),
      link: "/faq",
    },
    {
      id: 2,
      title: t("navigation.privacyPolicy"),
      link: "/privacy-policy",
    },
    {
      id: 3,
      title: t("navigation.termsConditions"),
      link: "/terms-and-conditions",
    },
    {
      id: 4,
      title: t("navigation.refundReturns"),
      link: "/refund-returns",
    },
    {
      id: 5,
      title: t("navigation.workWithUs"),
      link: "/work-with-us",
    },
  ];

  return (
    <footer className="lg:mt-20 mt-12 container mx-auto px-4 mb-24 lg:mb-0">
      <div className="flex items-center gap-4">
        <span className="text-2xl lg:text-3xl font-bold text-primary flex-1 min-w-24 lg:min-w-28">
          <Image src={"/images/oshtow-logo.svg"} alt="oshtow logo" width={200} height={90} />
        </span>
        <div className="h-0.5 w-full bg-gradient-to-l from-border to-border/20"></div>
      </div>
      <div className="mt-5 lg:mt-8 grid lg:grid-cols-3 gap-8 lg:gap-20">
        <div>
          <h4 className="text-title font-semibold mb-2 lg:mb-3.5">
            {t("footer.aboutSite")}
          </h4>
          <p className="text-caption font-normal text-justify text-sm leading-8">
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
                  className="hover:text-primary transition-all text-caption text-sm font-normal"
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
                  className="hover:text-primary transition-all text-caption text-sm font-normal"
                >
                  <Link href={item.link}>{item.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h4 className="text-title font-semibold mb-3.5 lg:mt-0 mt-2">
            {t("footer.socialNetworks")}
          </h4>
          <div className="flex items-center gap-5">
            <Icon
              icon="iconoir--telegram"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="iconoir--instagram"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="iconoir--whatsapp"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="iconoir--facebook"
              sizeClass="size-7"
              className="text-primary"
            />
            <Icon
              icon="iconoir--linkedin"
              sizeClass="size-7"
              className="text-primary"
            />
          </div>
          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="flex items-center justify-center p-3 border-2 border-border rounded-lg">
              <a
                referrerPolicy='origin'
                target='_blank'
                href='https://trustseal.enamad.ir/?id=606706&Code=BWoQKjqkLFhXgV4RehoCoHaxvljQOXwx'>
                <img
                  referrerPolicy='origin'
                  src='https://trustseal.enamad.ir/logo.aspx?id=606706&Code=BWoQKjqkLFhXgV4RehoCoHaxvljQOXwx'
                  alt=''
                  className="cursor-pointer" />
              </a>
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
