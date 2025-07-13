"use client"

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { checkVerificationAction } from "../_api/verificationAction";
import Link from "next/link";
import { Icon } from "@/ui/icon";
import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { Button } from "@/ui/button";
import { resendVerifyAction, ResendVerifyService } from "../_api/resendVerifyAction";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function EmailVerification() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const tPage = usePagesTranslation();
    const tCommon = useCommonTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [seconds, setSeconds] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<ResendVerifyService | null>(
        resendVerifyAction,
        null
    );

    useEffect(() => {
        const checkVerification = async () => {
            setIsLoading(true);
            try {
                const res = await checkVerificationAction();
                if (res?.verify_email) {
                    router.replace(searchParams.get("backUrl") || "/profile")
                } else setIsLoading(false);
            } catch (error) {
                console.error('Verification check failed:', error);
                setIsLoading(false);
            }
        };

        checkVerification();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0)
                clearInterval(interval);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    useEffect(() => {
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(tPage("auth.resendLinkSuccess"));
            setSeconds(60);
        }
    }, [formState]);

    const onSubmit = async () => {
        startTransition(async () => {
            await formAction();
        });
    }

    if (isLoading) return (
        <div className="px-6 py-7 md:p-8 text-text flex items-center justify-center">
            <div className="mt-10 md:mt-0">
                <Icon icon="line-md--loading-twotone-loop" sizeClass="size-24" className="text-sub mx-auto" />
                <h3 className="mt-7 text-title text-xl font-medium text-center mb-3">
                    {tCommon("messages.loading")}
                </h3>
            </div>
        </div>
    )

    return (
        <div className="px-6 py-7 md:p-8">
            <Link href={'/'} className="items-center gap-1.5 hidden md:flex">
                <Icon icon="solar--arrow-right-outline" sizeClass="size-5" className="text-caption" />
                <p className="text-sm font-normal text-caption">{tPage("auth.returnToHome")}</p>
            </Link>
            <div className="mt-8">
                <Icon icon="solar--mailbox-bold-duotone" sizeClass="size-28" className="text-sub mx-auto" />
                <h3 className="mt-7 text-title text-xl font-medium text-center mb-3">
                    {tPage("auth.checkEmail")}
                </h3>
                <p className="text-caption text-sm leading-6 font-normal text-center mb-4">
                    {tPage("auth.checkEmailDescription")}
                </p>
                {seconds > 0
                    ? <div className="flex items-center justify-center gap-1">
                        <p className="text-caption">{tPage("auth.resendLink")}: </p>
                        <p className="text-sub" dir="ltr">
                            {`${Math.floor(seconds / 60) > 0
                                ? Math.floor(seconds / 60) : '00'}
                                :${(seconds - (Math.floor(seconds / 60)) * 60) > 0
                                    ? (seconds - (Math.floor(seconds / 60)) * 60)
                                    : '00'}`}
                        </p>
                    </div>
                    : <form action={onSubmit}>
                        <Button
                            type="submit"
                            variant="link"
                            className={cn("mx-auto text-center block",
                                isPending ? "pointer-events-none opacity-40" : "")}>
                            {tPage("auth.resendLink")}
                        </Button>
                    </form>}
            </div>
        </div>
    );
}