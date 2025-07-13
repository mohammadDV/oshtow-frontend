import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function PaymentResultPage() {
    const tPage = await getTranslations("pages");
    const tCommon = await getTranslations("common");

    return (
        <div className="mt-5 lg:mt-16">
            <div className="md:max-w-sm px-4 mx-auto">
                <div className="bg-white py-8 px-6 rounded-xl relative">
                    <div className="bg-light size-5 rounded-full absolute -left-2.5 top-40"></div>
                    <div className="bg-light size-5 rounded-full absolute -right-2.5 top-40"></div>
                    <div className="flex items-center w-fit mx-auto justify-center p-3 rounded-full bg-success/15">
                        <Icon icon="solar--check-circle-bold" sizeClass="size-8" className="text-success" />
                    </div>
                    <h2 className="text-2xl text-center text-success font-semibold mt-4">
                        {tPage("paymentResult.successPayment")}
                    </h2>
                    <hr className="border-t border-dashed border-border my-8" />
                    <div className="flex flex-col gap-3.5">
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.trackingCode")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                23131243451235768
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.paymentDate")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                12 ادیبهشت 1404
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.time")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                12:30
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-caption text-sm font-medium">
                                {tPage("paymentResult.paymentMethod")}
                            </p>
                            <p className="text-text text-sm font-medium">
                                روش پرداخت
                            </p>
                        </div>
                    </div>
                    <hr className="border-t border-dashed border-border my-3.5" />
                    <div className="flex items-center justify-between mb-7">
                        <p className="text-caption text-sm font-medium">
                            {tPage("paymentResult.paidAmount")}
                        </p>
                        <p className="text-title font-medium">
                            40,000 تومان
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