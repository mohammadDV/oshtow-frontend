import { getTranslations } from "next-intl/server"
import { getActivePlans } from "./_api/getActivePlans";
import { PlansList } from "./_components/plansList";
import { getWallet } from "../_api/getWallet";

export default async function PlansPage() {
    const t = await getTranslations("pages");

    const activePlans = await getActivePlans();
    const walletData = await getWallet();

    return (
        <div>
            <h1 className="text-center text-2xl lg:text-3xl font-semibold text-title">
                {t("profile.plans.title")}
            </h1>
            <p className="text-center font-normal text-caption mt-3">
                {t("profile.plans.description")}
            </p>
            <PlansList plansData={activePlans} walletData={walletData} />
        </div>
    )
}