import { userProfileMenu } from "@/_mock/profileMenuData";
import vipIcon from "@/assets/images/profile.svg";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { createFileUrl } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getDashboardInfo } from "./_api/getDashboadInfo";
import { getSubscriptionActivityCount } from "./_api/getSubscriptionActivityCount";
import AuthPrompt from "./_components/authPrompt/authPrompt";
import { LogoutButton } from "./_components/logoutButton/logoutButton";
import { ProfileMenu } from "./_components/menu/profileMenu";
import { ProfileStatistics } from "./_components/statistics/profileStatistics";
import { VipType } from "@/constants/enums";

export default async function ProfilePage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");
  const userData = await getUserData();

  const dashboardInfo = await getDashboardInfo();
  const subscriptionActivityCount = await getSubscriptionActivityCount();

  return (
    <div>
      {!userData.verify_access && <AuthPrompt variant="desktop" />}
      {isMobile && (
        <>
          <Link
            href={"/profile/settings/account"}
            className="flex items-center justify-between bg-white p-4 rounded-2xl mb-4"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={
                    userData?.user?.profile_photo_path
                      ? createFileUrl(userData?.user?.profile_photo_path)
                      : undefined
                  }
                  alt=""
                  width={70}
                  height={70}
                  className="size-16 rounded-full mx-auto"
                />
                {userData?.user?.vip === VipType.IsVip && (
                  <Image src={vipIcon} alt="" width={26} height={26} className="absolute -top-1.5 left-1/2 -translate-1/2" />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-normal text-primary">
                  {userData?.user.nickname}
                </p>
                <p className="text-center text-sm font-normal text-text">
                  <span className="text-caption ml-1 inline-block">
                    {t("profile.customerNumber")}:
                  </span>
                  {userData?.customer_number}
                </p>
              </div>
            </div>
            <Icon
              icon="solar--alt-arrow-left-outline"
              sizeClass="size-5"
              className="text-caption"
            />
          </Link>
          <div className="lg:w-2xs bg-white rounded-2xl lg:rounded-3xl overflow-hidden pb-4">
            <div className="mt-4 lg:mt-6 px-6">
              <ProfileMenu items={userProfileMenu} />
              <LogoutButton />
            </div>
          </div>
        </>
      )}
      <ProfileStatistics
        dashboardInfo={dashboardInfo}
        subscriptionActivityCount={subscriptionActivityCount}
      />
    </div>
  );
}
