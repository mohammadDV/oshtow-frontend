import { getTranslations } from "next-intl/server"
import { TopUpButton } from "./_components/topUpButton";
import { WithdrawButton } from "./_components/withdrawButton";
import { TransferButton } from "./_components/transferButton";

export default async function WalletPage() {
    const tPages = await getTranslations("pages");
    const tCommon = await getTranslations("common");

    return (
        <div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-7">
                <div className="w-full lg:w-1/3 bg-[url(/images/card-bg.jpg)] shadow-[0px_4px_36px_4px_#FF7ED580] bg-cover h-44 bg-center bg-no-repeat rounded-3xl p-7 relative">
                    <p className="text-border font-normal mb-2">
                        {tPages("profile.wallet.walletCredit")}
                    </p>
                    <p className="text-2xl font-medium text-white">
                        4,200,000 تومان
                    </p>
                    <span className="text-white/30 font-normal absolute left-6 bottom-5">
                        {tCommon("brand.domain")}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-3 md:gap-5 h-28 lg:h-44 lg:w-2/3 w-full">
                    <TopUpButton />
                    <WithdrawButton />
                    <TransferButton />
                </div>
            </div>
        </div>
    )
}