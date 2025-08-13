import { getUserData } from "@/lib/getUserDataFromHeaders";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { ProfileStatistics } from "./_components/statistics/profileStatistics";
import { isMobileDevice } from "@/lib/getDeviceFromHeaders";
import { ProfileMenu } from "./_components/menu/profileMenu";
import { userProfileMenu } from "@/_mock/profileMenuData";
import { LogoutButton } from "./_components/logoutButton/logoutButton";
import { getDashboardInfo } from "./_api/getDashboadInfo";
import { getSubscriptionActivityCount } from "./_api/getSubscriptionActivityCount";
import { createFileUrl } from "@/lib/utils";

export default async function ProfilePage() {
  const isMobile = await isMobileDevice();
  const t = await getTranslations("pages");
  const userData = await getUserData();

  const dashboardInfo = await getDashboardInfo();
  const subscriptionActivityCount = await getSubscriptionActivityCount();

  return (
    <div>
      {!userData.verify_access && (
        <div className="hidden lg:flex mb-5 items-center px-4 py-3.5 rounded-2xl bg-border justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon="solar--notes-line-duotone"
              sizeClass="size-6"
              className="text-primary"
            />
            <span className="text-title text-lg font-medium">
              {t("profile.authTitle")}
            </span>
            <span className="text-text text-sm font-normal">
              {t("profile.authDescription")}
            </span>
          </div>
          <Link href={"/profile/settings/auth"}>
            <Button
              variant={"outline"}
              size={"sm"}
              className="border-primary border text-primary"
            >
              {t("profile.completeAuth")}
            </Button>
          </Link>
        </div>
      )}
      {isMobile && (
        <>
          <Link
            href={"/profile/settings/account"}
            className="flex items-center justify-between bg-white p-4 rounded-2xl mb-4"
          >
            <div className="flex items-center gap-3">
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
