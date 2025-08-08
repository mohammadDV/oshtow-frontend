"use client";

import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "@/app/_components/modal";
import { useState } from "react";
import { useRouter } from "next/navigation";

export const BottomNavigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useCommonTranslation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isOthersModalOpen, setIsOthersModalOpen] = useState(false);

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
        <button
          className="flex flex-col gap-1.5 items-center"
          onClick={() => setIsSearchModalOpen(true)}
        >
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
        </button>
        <button
          className="flex flex-col gap-1.5 items-center"
          onClick={() => setIsAddModalOpen(true)}
        >
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
        </button>
        <Link href={"/profile"} className="flex flex-col gap-1.5 items-center">
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
        <button
          className="flex flex-col gap-1.5 items-center"
          onClick={() => setIsOthersModalOpen(true)}
        >
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
        </button>
      </div>

      <Modal
        open={isSearchModalOpen}
        onOpenChange={setIsSearchModalOpen}
        title={t("navigation.searchModalTitle")}
        description={t("navigation.searchModalDescription")}
        showConfirm={false}
        showCancel={false}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              router.push("/projects/sender");
              setIsSearchModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--bag-4-bold"
              sizeClass="size-8"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.senders")}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              router.push("/projects/passenger");
              setIsSearchModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="ion--airplane"
              sizeClass="size-8"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.passengers")}
              </p>
            </div>
          </button>
        </div>
      </Modal>

      {/* Add Modal */}
      <Modal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        title={t("navigation.addModalTitle")}
        description={t("navigation.addModalDescription")}
        showConfirm={false}
        showCancel={false}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              router.push("/profile/projects/sender/create");
              setIsAddModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--add-circle-outline"
              sizeClass="size-8"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.submitSenderAd")}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              router.push("/profile/projects/passenger/create");
              setIsAddModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--add-circle-outline"
              sizeClass="size-8"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.submitPassengerAd")}
              </p>
            </div>
          </button>
        </div>
      </Modal>

      {/* Others Modal */}
      <Modal
        open={isOthersModalOpen}
        onOpenChange={setIsOthersModalOpen}
        title={t("navigation.others")}
        description="دسترسی سریع به صفحات مهم"
        showConfirm={false}
        showCancel={false}
        size="sm"
      >
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              router.push("/about");
              setIsOthersModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--info-circle-outline"
              sizeClass="size-6"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.about")}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              router.push("/contact");
              setIsOthersModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--phone-outline"
              sizeClass="size-6"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.contact")}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              router.push("/faq");
              setIsOthersModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--question-circle-outline"
              sizeClass="size-6"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.faq")}
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              router.push("/magazine");
              setIsOthersModalOpen(false);
            }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border hover:bg-gray-50 transition-colors"
          >
            <Icon
              icon="solar--notebook-minimalistic-outline"
              sizeClass="size-6"
              className="text-sub"
            />
            <div className="text-right">
              <p className="font-medium text-text">
                {t("navigation.magazine")}
              </p>
            </div>
          </button>
        </div>
      </Modal>
    </div>
  );
};
