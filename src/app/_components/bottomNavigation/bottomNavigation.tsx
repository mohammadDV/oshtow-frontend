"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();
  const t = useCommonTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-40 py-3 border-t border-border px-5">
      <div className="flex items-center justify-between">
        <Link href={"/"} className="flex flex-col gap-1.5 items-center">
          <Icon
            icon="solar--home-angle-2-outline"
            sizeClass="size-6"
            className={pathname === "/" ? "text-primary" : "text-caption"}
          />
          <p
            className={cn(
              "text-center text-sm",
              pathname === "/" ? "text-title" : "text-caption"
            )}
          >
            {t("navigation.home")}
          </p>
        </Link>
        <div className="flex flex-col gap-1.5 items-center">
          <Icon
            icon="solar--magnifer-outline"
            sizeClass="size-6"
            className={pathname === "/search" ? "text-primary" : "text-caption"}
          />
          <p
            className={cn(
              "text-center text-sm",
              pathname === "/search" ? "text-title" : "text-caption"
            )}
          >
            {t("navigation.ads")}
          </p>
        </div>
        <Link href={"/"} className="flex flex-col gap-1.5 items-center">
          <Icon
            icon="solar--add-circle-outline"
            sizeClass="size-6"
            className={pathname === "/add" ? "text-primary" : "text-caption"}
          />
          <p
            className={cn(
              "text-center text-sm",
              pathname === "/add" ? "text-title" : "text-caption"
            )}
          >
            {t("navigation.submitAd")}
          </p>
        </Link>
        <Link href={"/"} className="flex flex-col gap-1.5 items-center">
          <Icon
            icon="solar--user-outline"
            sizeClass="size-6"
            className={
              pathname === "/profile" ? "text-primary" : "text-caption"
            }
          />
          <p
            className={cn(
              "text-center text-sm",
              pathname === "/profile" ? "text-title" : "text-caption"
            )}
          >
            {t("navigation.profile")}
          </p>
        </Link>
        <div className="flex flex-col gap-1.5 items-center">
          <Icon
            icon="solar--menu-dots-outline"
            sizeClass="size-6"
            className={pathname === "/others" ? "text-primary" : "text-caption"}
          />
          <p
            className={cn(
              "text-center text-sm",
              pathname === "/others" ? "text-title" : "text-caption"
            )}
          >
            {t("navigation.others")}
          </p>
        </div>
      </div>
    </div>
  );
};
