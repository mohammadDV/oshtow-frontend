import { getTranslations } from "next-intl/server";
import { TopUpButton } from "./_components/topUpButton";
import { WithdrawButton } from "./_components/withdrawButton";
import { TransferButton } from "./_components/transferButton";
import { getUserData } from "@/lib/getUserDataFromHeaders";
import { WalletHistory } from "./_components/walletHistory";
import { getWalletTransactions } from "./_api/getWalletTransactions";
import { getWithdrawRequests } from "./_api/getWithdrawRequests";
import { TransactionStatus, TransactionType, WithdrawStatus } from "@/types/wallet.type";
import { getWallet } from "../_api/getWallet";
import { putCommas } from "@/lib/utils";
import { getWallets } from "./_api/getWallets";

interface WalletPageProps {
    searchParams: Promise<{
        page?: string;
        type?: TransactionType;
        status?: TransactionStatus | WithdrawStatus;
        tab?: 'transactions' | 'withdraws';
    }>;
}

export default async function WalletPage({ searchParams }: WalletPageProps) {
    const tPages = await getTranslations("pages");
    const tCommon = await getTranslations("common");
    const userData = await getUserData();
    const resolvedSearchParams = await searchParams;

    const walletsData = await getWallets();

    const page = parseInt(resolvedSearchParams?.page || "1");
    const tab = resolvedSearchParams?.tab || 'transactions';

    let transactionsData = null;
    let withdrawRequestsData = null;

    if (tab === 'transactions') {
        const type = resolvedSearchParams?.type as TransactionType;
        const status = resolvedSearchParams?.status as TransactionStatus;

        transactionsData = await getWalletTransactions({
            id: walletsData?.data?.[0].id.toString(),
            page,
            type,
            status,
            count: 10
        });
    } else if (tab === 'withdraws') {
        const status = resolvedSearchParams?.status as WithdrawStatus;

        withdrawRequestsData = await getWithdrawRequests({
            page,
            status,
            count: 10
        });
    }

    return (
        <div className="lg:max-w-5xl">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-7">
                <div className="w-full lg:w-1/3 bg-[url(/images/card-bg.jpg)] shadow-[0px_4px_36px_4px_#FF7ED580] bg-cover h-44 bg-center bg-no-repeat rounded-3xl p-7 relative">
                    <p className="text-border font-normal mb-2">
                        {tPages("profile.wallet.walletCredit")}
                    </p>
                    <p className="text-2xl font-medium text-white">
                        {putCommas(parseFloat(walletsData?.data?.[0].balance))} {' '} {tCommon("unit.toman")}
                    </p>
                    <span className="text-white/30 font-normal absolute left-6 bottom-5">
                        {tCommon("brand.domain")}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-5 h-28 lg:h-44 lg:w-2/3 w-full">
                    <TopUpButton userData={userData} />
                    <WithdrawButton />
                    <TransferButton />
                </div>
            </div>
            <WalletHistory
                transactionsData={transactionsData}
                withdrawRequestsData={withdrawRequestsData}
                activeTab={tab}
            />
        </div>
    )
}