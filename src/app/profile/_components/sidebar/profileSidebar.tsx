"use client";

import { userProfileMenu } from "@/_mock/profileMenuData";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { UserData } from "@/types/user.type";
import { LogoutButton } from "../logoutButton/logoutButton";
import { ProfileMenu } from "../menu/profileMenu";
import { putCommas } from "@/lib/utils";
import { WalletService } from "../../_api/getWallet";

interface ProfileSidebarProps {
  userData?: UserData | null;
  isMobile?: boolean;
  walletData: WalletService
}

export const ProfileSidebar = ({ userData, walletData }: ProfileSidebarProps) => {
  const tPages = usePagesTranslation();
  const tCommon = useCommonTranslation();

  return (
    <div className="lg:w-2xs bg-white rounded-2xl lg:shrink-0 lg:rounded-3xl overflow-hidden pb-4">
      <div>
        <div className="w-full h-28 bg-border rounded-b-full"></div>
        <img
          src={userData?.user?.profile_photo_path!}
          alt=""
          width={98}
          height={98}
          className="size-20 bg-white rounded-full mx-auto -mt-12"
        />
        <p className="mt-3 text-center text-sm font-normal text-text">
          {tPages("profile.welcomeUser")}
        </p>
        <p className="mt-2 text-center text-sm font-normal text-primary">
          {userData?.user.nickname}
        </p>
        <div className=" mx-6 border border-border rounded-xl px-4 py-3 mt-3">
          <span className="text-text inline-block ml-0.5 font-normal text-sm">
            {tPages("profile.walletCredit")}:
          </span>
          <span className="text-primary inline-block ml-0.5 font-normal text-sm">
            {putCommas(walletData?.data?.available_balance)} {' '} {tCommon("unit.toman")}
          </span>
        </div>
      </div>
      <div className="mt-4 lg:mt-6 px-6">
        <ProfileMenu items={userProfileMenu} />
        <LogoutButton />
      </div>
    </div>
  );
};
