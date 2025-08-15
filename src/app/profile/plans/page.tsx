import { getTranslations } from "next-intl/server"
import { getActivePlans } from "./_api/getActivePlans";
import { getWallet } from "../_api/getWallet";
import { getSubscriptionPlans } from "./_api/getSubscriptionPlans";
import { PlansList } from "./_components/plansList";
import { PlansHistory } from "./_components/plansHistory/plansHistory";
import { getSubscriptionActivityCount } from "../_api/getSubscriptionActivityCount";
import { SubscriptionType } from "@/constants/enums";
import { Icon } from "@/ui/icon";

interface PlansPageProps {
    searchParams: Promise<{
        page?: string;
    }>;
}

export default async function PlansPage({ searchParams }: PlansPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams.page || '1');

    const [activePlans, walletData, subscriptionPlans, subscriptionActivityCount] = await Promise.all([
        getActivePlans(),
        getWallet(),
        getSubscriptionPlans({ page, count: 5 }),
        getSubscriptionActivityCount()
    ]);

    return (
        <div>
            {subscriptionActivityCount.original.subscription.has_active_subscription === SubscriptionType.Active && (
                <div className="p-4 rounded-2xl bg-border flex gap-2.5 lg:mb-8">
                    <Icon icon='solar--info-circle-outline' className='text-warning' />
                    <p className="text-text w-fit">
                        {t("profile.plans.rewritePlan")}
                    </p>
                </div>
            )}
            <h1 className="text-center text-2xl lg:text-3xl mt-6 lg:mt-0 font-semibold text-title">
                {t("profile.plans.title")}
            </h1>
            <p className="text-center font-normal text-caption mt-3">
                {t("profile.plans.description")}
            </p>
            <PlansList plansData={activePlans} walletData={walletData} />
            <PlansHistory plansData={subscriptionPlans} />
        </div>
    )
}