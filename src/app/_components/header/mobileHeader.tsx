"use client";

import { Icon } from "@/ui/icon";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const MobileHeader = () => {
  const t = useTranslations("common");
  const pathname = usePathname();

  return (
    <div className={pathname === "/" ? "" : "sticky top-0 z-40"}>
      <div className="h-14 bg-primary w-full rounded-b-2xl z-10"></div>
      <div className="mx-4 px-4 py-3.5 rounded-xl bg-white -mt-8 z-30 relative ">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-xl font-bold text-primary w-[70px]">
            <Image src={"/images/oshtow-logo.svg"} alt="oshtow logo" width={200} height={90} />
          </Link>
          <div className="flex items-center justify-end gap-4">
            <Link href={"/contact"}>
              <Icon
                icon="solar--headphones-round-bold-duotone"
                className="text-text"
              />
            </Link>
            <Link href={"/auth/login"}>
              <Icon icon="solar--user-circle-bold" className="text-text" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
