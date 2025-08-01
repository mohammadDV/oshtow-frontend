"use client"

import { Modal } from '@/app/_components/modal';
import { StatusCode } from '@/constants/enums';
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { putCommas } from "@/lib/utils";
import { ClaimStatusResponse, FullClaim } from "@/types/claim.type";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { toast } from 'sonner';
import { payClaimAction, PayClaimResponse } from '../../_api/payClaimAction';
import { WalletService } from '@/app/profile/_api/getWallet';

interface SecurePaymentProps {
    claimStatus: ClaimStatusResponse;
    claimData?: FullClaim;
    walletData: WalletService;
}

export const SecurePayment = ({ claimData, claimStatus, walletData }: SecurePaymentProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("wallet");
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<PayClaimResponse | null, FormData>(
        payClaimAction,
        null
    );

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            if (formState.url) {
                toast.info(tCommon("messages.redirectingToGateway"));
                window.location.href = formState.url;
            } else {
                toast.success(tCommon("messages.success"));
                router.replace(`/profile/claims/process?claimId=${claimData?.id}`)
            }
            setIsOpenModal(false);
        }
    }, [formState]);

    const handlePayment = () => {
        if (!claimData?.id || !claimData?.amount) return;

        const formData = new FormData();
        formData.append("claimId", claimData.id.toString());
        formData.append("amount", claimData.amount);
        formData.append("payment_method", paymentMethod);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <>
            <div className="p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white">
                <Icon
                    icon="solar--card-bold-duotone"
                    sizeClass="size-16 lg:size-20"
                    className="text-sub mx-auto" />
                <h2 className="mt-3 lg:mt-4 text-center text-xl font-semibold text-title">
                    {claimStatus.sponsor
                        ? tPages("profile.claims.securePaymentByYou")
                        : tPages("profile.claims.securePaymentForYou")}
                </h2>
                <p className="text-caption text-sm font-normal leading-6 text-center mt-3">
                    {tPages("profile.claims.securePaymentDescription")}
                </p>
                {claimStatus.sponsor && <div className="flex flex-col lg:flex-row items-center gap-4 justify-between mt-5 lg:mt-6">
                    <div>
                        <span className="text-sm text-text font-normal inline-block ml-1">
                            {tPages("profile.claims.agreedAmount")}
                        </span>
                        {claimData?.amount && <span className="text-title font-medium inline-block">
                            {putCommas(parseFloat(claimData.amount))} {tCommon("unit.toman")}
                        </span>}
                    </div>
                    <Button className='w-full lg:w-auto'
                        onClick={() => setIsOpenModal(true)}>
                        {tCommon("buttons.payment")}
                    </Button>
                </div>}
            </div>

            <Modal
                size='sm'
                open={isOpenModal}
                onOpenChange={setIsOpenModal}
                title={tCommon("buttons.payment")}
                cancelText={tCommon("buttons.cancel")}
                confirmText={tCommon("buttons.payment")}
                onCancel={() => setIsOpenModal(false)}
                onConfirm={handlePayment}
                loading={isPending}>
                <>
                    <hr className='border-t border-border' />
                    <div className='flex items-center justify-between my-4'>
                        <p className='text-text text-sm font-medium'>
                            {tPages("profile.claims.agreedAmount")}
                        </p>
                        {claimData?.amount && <p className='text-text text-sm font-medium'>
                            {putCommas(parseFloat(claimData.amount))} {tCommon("unit.toman")}
                        </p>}
                    </div>
                    <hr className='border-t border-border my-4' />

                    <div className='mb-3'>
                        <p className='text-sm text-title font-medium mb-3'>
                            {tPages("profile.plans.paymentMethod")}
                        </p>
                        <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                            <div className='flex items-center gap-1.5'>
                                <RadioGroupItem value="wallet" id="wallet" />
                                <label htmlFor="wallet" className='text-sm text-text font-normal cursor-pointer flex-1'>
                                    {tPages("profile.plans.walletPayment")} ({tPages("profile.plans.walletBalance")}:
                                    {putCommas(walletData?.data?.available_balance)} {' '} {tCommon("unit.toman")}) -
                                    <Link href={"/profile/wallet"} className='text-primary mr-1'>{tPages("profile.plans.chargeWallet")}</Link>
                                </label>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <RadioGroupItem value="bank" id="bank" />
                                <label htmlFor="bank" className='text-sm text-text font-normal cursor-pointer'>
                                    {tPages("profile.plans.directPayment")}
                                </label>
                            </div>
                        </RadioGroup>
                    </div>
                </>
            </Modal>
        </>
    )
}