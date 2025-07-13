import { getTranslations } from "next-intl/server";
import { AccountForm } from "./_components/accountForm";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { getUserAccount } from "./_api/getUserAccount";

export default async function AccountPage() {
    const t = await getTranslations("pages");
    const userData = await getUserData();
    const userAccount = await getUserAccount({ id: userData.user.id });

    return (
        <div className="bg-white rounded-3xl p-6 pb-12">
            <h1 className="text-title font-medium text-lg">
                {t("profile.account.title")}
            </h1>
            <AccountForm accountData={userAccount?.user || {}} />
        </div>
    )
}