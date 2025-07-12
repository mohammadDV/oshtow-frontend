"use client";

import { userProfileMenu } from "@/_mock/profileMenuData";
import { usePagesTranslation } from "@/hooks/useTranslation";
import { UserData } from "@/types/user.type";
import { ProfileMenu } from "../menu/profileMenu";

interface ProfileSidebarProps {
  userData?: UserData | null;
  isMobile?: boolean;
}

export const ProfileSidebar = ({ userData }: ProfileSidebarProps) => {
  const t = usePagesTranslation();

  return (
    <div className="lg:w-2xs bg-white rounded-2xl lg:rounded-3xl overflow-hidden pb-4">
      <div>
        <div className="w-full h-28 bg-border rounded-b-full"></div>
        <img
          src={userData?.user.profile_photo_path}
          alt=""
          width={98}
          height={98}
          className="size-20 rounded-full mx-auto -mt-14"
        />
        <p className="mt-3 text-center text-sm font-normal text-text">
          {t("profile.welcomeUser")}
        </p>
        <p className="mt-2 text-center text-sm font-normal text-primary">
          {userData?.user.nickname}
        </p>
        <div className=" mx-6 border border-border rounded-xl px-4 py-3 mt-3">
          <span className="text-text inline-block ml-0.5 font-normal text-sm">
            {t("profile.walletCredit")}:
          </span>
          <span className="text-primary inline-block ml-0.5 font-normal text-sm">
            20000 تومان
          </span>
        </div>
      </div>
      <div className="mt-4 lg:mt-6 px-6">
        <ProfileMenu items={userProfileMenu} />
      </div>
    </div>
  );
};
