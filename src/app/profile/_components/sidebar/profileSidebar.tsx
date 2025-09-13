"use client";

import { userProfileMenu } from "@/_mock/profileMenuData";
import vipIcon from "@/assets/images/profile.svg";
import { VipType } from "@/constants/enums";
import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import { createFileUrl, putCommas } from "@/lib/utils";
import { UserData } from "@/types/user.type";
import Image from "next/image";
import { WalletService } from "../../_api/getWallet";
import { LogoutButton } from "../logoutButton/logoutButton";
import { ProfileMenu } from "../menu/profileMenu";

interface ProfileSidebarProps {
  userData?: UserData | null;
  isMobile?: boolean;
  walletData: WalletService;
}

export const ProfileSidebar = ({
  userData,
  walletData,
}: ProfileSidebarProps) => {
  const tPages = usePagesTranslation();
  const tCommon = useCommonTranslation();

  return (
    <div className="lg:w-2xs bg-white rounded-2xl lg:shrink-0 lg:rounded-3xl overflow-hidden pb-4">
      <div>
        <div className="w-full h-28 bg-border rounded-b-full"></div>
        <div className="relative">
          <img
            src={
              userData?.user?.profile_photo_path
                ? createFileUrl(userData?.user?.profile_photo_path)
                : undefined
            }
            alt=""
            width={98}
            height={98}
            className="size-20 bg-white rounded-full mx-auto -mt-12"
          />
          {userData?.user?.vip === VipType.IsVip && (
            <Image src={vipIcon} alt="" width={36} height={36} className="absolute -top-1.5 left-1/2 -translate-1/2" />
          )}
        </div>
        <p className="mt-4 text-center text-sm font-normal text-primary">
          {userData?.user.nickname}
        </p>
        <p className="mt-1 text-center text-sm font-normal text-text">
          <span className="text-caption ml-1 inline-block">{tPages("profile.customerNumber")}:</span>
          {userData?.customer_number}
        </p>
        <div className=" mx-6 border border-border rounded-xl px-4 py-3 mt-2.5">
          <span className="text-text inline-block ml-0.5 font-normal text-sm">
            {tPages("profile.walletCredit")}:
          </span>
          <span className="text-primary inline-block ml-0.5 font-normal text-sm">
            {putCommas(walletData?.data?.available_balance)}{" "}
            {tCommon("unit.toman")}
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
