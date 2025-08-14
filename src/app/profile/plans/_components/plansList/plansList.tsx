"use client"

import { Modal } from '@/app/_components/modal'
import { WalletService } from '@/app/profile/_api/getWallet'
import { StatusCode } from '@/constants/enums'
import { useCommonTranslation, usePagesTranslation } from '@/hooks/useTranslation'
import { formatToShamsiWithYear } from '@/lib/dateUtils'
import { cn, putCommas } from '@/lib/utils'
import { Plan, PlanType } from '@/types/plan.type'
import { Button } from '@/ui/button'
import { Icon } from '@/ui/icon'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import Link from 'next/link'
import { useActionState, useEffect, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { subscriptionAction, SubscriptionResponse } from '../../_api/subscriptionAction'

interface PlansListProps {
    plansData: Plan[];
    walletData: WalletService;
}

export const PlansList = ({ plansData, walletData }: PlansListProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [selectedTab, setSelectedTab] = useState<PlanType>("monthly");
    const [selectedPlan, setSelectedPlan] = useState<Plan>();
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = useState<string>("wallet");
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<SubscriptionResponse | null, FormData>(
        subscriptionAction,
        null
    );

    const today = new Date();

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tPages("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            if (formState.url) {
                toast.info(tCommon("messages.redirectingToGateway"));
                window.location.href = formState.url;
            } else {
                toast.success(tCommon("messages.success"));
            }
            setIsOpenModal(false);
        }
    }, [formState, tCommon, tPages]);

    const selectTabHandler = (value: PlanType) => setSelectedTab(value);

    const selectPlanHandler = (value: Plan) => {
        setSelectedPlan(value);
        setIsOpenModal(true);
    }

    const getExpiryDate = () => {
        const expiryDate = new Date();
        if (selectedPlan?.priod === "monthly") {
            expiryDate.setDate(today.getDate() + 31);
        } else {
            expiryDate.setFullYear(today.getFullYear() + 1);
        }
        return expiryDate;
    };

    const handleSubscription = () => {
        if (!selectedPlan) return;

        const formData = new FormData();
        formData.append("planId", selectedPlan.id.toString());
        formData.append("payment_method", paymentMethod);

        startTransition(async () => {
            await formAction(formData);
        });
    };

    return (
        <>
            <div className='flex items-center justify-center mt-7'>
                <div className='flex items-center justify-center gap-2 bg-white rounded-xl p-1'>
                    <span
                        onClick={() => selectTabHandler("monthly")}
                        className={cn('py-2 px-5 rounded-lg cursor-pointer',
                            selectedTab === "monthly" ? "bg-primary text-white" : "text-primary"
                        )}>
                        {tPages("profile.plans.monthly")}
                    </span>
                    <span
                        onClick={() => selectTabHandler("yearly")}
                        className={cn('py-2 px-5 rounded-lg cursor-pointer',
                            selectedTab === "yearly" ? "bg-primary text-white" : "text-primary"
                        )}>
                        {tPages("profile.plans.yearly")}
                    </span>
                </div>
            </div>
            <div className='grid lg:grid-cols-3 gap-5 mt-6 px-6 md:px-0'>
                {plansData?.filter(plan => plan.priod === selectedTab).map(item => (
                    <div
                        key={item.id}
                        className='px-5 py-7 rounded-3xl bg-white'>
                        <h3 className='text-center text-title text-lg font-medium'>
                            {item.title}
                        </h3>
                        <div className='flex items-center justify-center gap-2 mt-2.5'>
                            <p className='text-2xl text-title font-semibold'>
                                {putCommas(parseFloat(item.amount))}
                            </p>
                            <p className='text-text font-normal'>
                                {tCommon("unit.toman")} / {selectedTab === "monthly" ? tPages("profile.plans.monthly") : tPages("profile.plans.yearly")}
                            </p>
                        </div>
                        <Button
                            onClick={() => selectPlanHandler(item)}
                            variant={"ghost"}
                            size={"default"}
                            className='w-full mt-3.5'>
                            {tCommon("buttons.buyPlan")}
                        </Button>
                        <p className='text-title font-medium mt-5 mb-3'>
                            {tPages("profile.plans.features")}
                        </p>
                        <div className='flex flex-col gap-2.5'>
                            <div className='flex items-center gap-1.5'>
                                <Icon icon='solar--check-circle-bold' sizeClass='size-5' className='text-teal-500' />
                                <p className=' text-text font-normal'>
                                    {selectedTab === "monthly" ? tPages("profile.plans.monthlyPlanCredit") : tPages("profile.plans.yearlyPlanCredit")}
                                </p>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <Icon icon='solar--check-circle-bold' sizeClass='size-5' className='text-teal-500' />
                                <p className=' text-text font-normal'>
                                    {item.project_count} {selectedTab === "monthly" ? tPages("profile.plans.adsInMonth") : tPages("profile.plans.adsInYear")}
                                </p>
                            </div>
                            <div className='flex items-center gap-1.5'>
                                <Icon icon='solar--check-circle-bold' sizeClass='size-5' className='text-teal-500' />
                                <p className=' text-text font-normal'>
                                    {item.claim_count} {selectedTab === "monthly" ? tPages("profile.plans.claimInMonth") : tPages("profile.plans.claimInYear")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                size='sm'
                open={isOpenModal}
                onOpenChange={setIsOpenModal}
                title={tPages("profile.plans.buyPlan")}
                cancelText={tCommon("buttons.cancel")}
                confirmText={tCommon("buttons.payment")}
                onCancel={() => setIsOpenModal(false)}
                onConfirm={handleSubscription}
                loading={isPending}>
                <>
                    <hr className='border-t border-border' />
                    <div className='flex items-center justify-between my-4'>
                        <p className='text-text text-sm font-medium'>
                            {selectedPlan?.title} / {selectedPlan?.priod === "monthly" ? tPages("profile.plans.monthly") : tPages("profile.plans.yearly")}
                        </p>
                        {selectedPlan && <p className='text-text text-sm font-medium'>
                            {putCommas(parseFloat(selectedPlan.amount))} {tCommon("unit.toman")}
                        </p>}
                    </div>
                    <hr className='border-t border-border' />
                    <div className='flex flex-col gap-5 mt-4'>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm text-caption font-normal'>
                                {tPages("profile.plans.purchaseDate")}
                            </p>
                            <p className='text-sm text-text font-medium'>
                                {formatToShamsiWithYear(today)}
                            </p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm text-caption font-normal'>
                                {tPages("profile.plans.expireDate")}
                            </p>
                            <p className='text-sm text-text font-medium'>
                                {formatToShamsiWithYear(getExpiryDate())}
                            </p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm text-caption font-normal'>
                                {tPages("profile.plans.payableAmount")}
                            </p>
                            {selectedPlan?.amount && <p className='text-sm text-text font-medium'>
                                {putCommas(parseFloat(selectedPlan.amount))} {tCommon("unit.toman")}
                            </p>}
                        </div>
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