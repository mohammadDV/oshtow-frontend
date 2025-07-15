import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { getPaymentResult } from "../_api/getPaymentResult";
import { cn, putCommas } from "@/lib/utils";
import { formatToShamsiWithYear } from "@/lib/dateUtils";

export interface PaymentResultResponse {
    bank_transaction_id: string;
    reference: number | null;
    status: "completed" | "failed";
    amount: number;
    message: string;
    date: string
}

interface PaymentResultPageProps {
    params: Promise<{
        transactionId: string;
    }>;
}

export default async function PaymentResultPage({ params }: PaymentResultPageProps) {
    const tPage = await getTranslations("pages");
    const tCommon = await getTranslations("common");
    const resolvedParams = await params;

    const paymentResultData: PaymentResultResponse = await getPaymentResult({ id: resolvedParams.transactionId })

    const paymentDate = new Date(paymentResultData.date.replace(' ', 'T'));
    const formattedDate = formatToShamsiWithYear(paymentDate);
    const formattedTime = paymentDate.toLocaleTimeString('fa-IR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });

    return (
        <div className="mt-5 lg:mt-16">
            <div className="md:max-w-md px-4 mx-auto">
                <div className="bg-white py-8 px-6 rounded-xl relative">
                    <div className="bg-light size-5 rounded-full absolute -left-2.5 top-40"></div>
                    <div className="bg-light size-5 rounded-full absolute -right-2.5 top-40"></div>
                    <div className={cn("flex items-center w-fit mx-auto justify-center p-3 rounded-full",
                        paymentResultData?.status === "completed"
                            ? "bg-success/15"
                            : "bg-destructive/15"
                    )}>
                        <Icon
                            icon={paymentResultData?.status === "completed"
                                ? "solar--check-circle-bold"
                                : "solar--close-circle-bold"}
                            sizeClass="size-8"
                            className={paymentResultData?.status === "completed"
                                ? "text-success"
                                : "text-destructive"
                            } />
                    </div>
                    <h2 className={cn("text-2xl text-center font-semibold mt-4",
                        paymentResultData?.status === "completed"
                            ? "text-success"
                            : "text-destructive"
                    )}>
                        {paymentResultData?.status === "completed"
                            ? tPage("paymentResult.successPayment")
                            : tPage("paymentResult.failedPayment")}
                    </h2>
                    <p className="text-caption text-center mt-2">
                        {paymentResultData.message}
                    </p>
                    <hr className="border-t border-dashed border-border my-8" />
                    <div className="flex flex-col gap-3.5">
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.trackingCode")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                {paymentResultData?.bank_transaction_id}
                            </p>
                        </div>
                        {paymentResultData?.reference && <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.referenceCode")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                {paymentResultData.reference}
                            </p>
                        </div>}
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.paymentDate")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                {formattedDate}
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.time")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                {formattedTime}
                            </p>
                        </div>
                    </div>
                    <hr className="border-t border-dashed border-border my-3.5" />
                    <div className="flex items-center justify-between mb-7">
                        <p className="text-caption text-sm font-medium">
                            {tPage("paymentResult.paidAmount")}
                        </p>
                        <p className="text-title font-medium">
                            {putCommas(parseFloat(paymentResultData?.amount.toString()))}
                            {" "}
                            {tCommon("unit.toman")}
                        </p>
                    </div>
                    <Link href={"/profile"}>
                        <Button variant={"ghost"} className="w-full">
                            {tCommon("buttons.returnToProfile")}
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}