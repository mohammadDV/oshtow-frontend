"use client"

import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { ClaimStatusResponse, FullClaim } from "@/types/claim.type";
import { Icon } from "@/ui/icon";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { createReviewAction, CreateReviewResponse } from "../../_api/createReviewAction";
import z from "zod";
import { useZodForm } from "@/hooks/useZodForm";
import { FormProvider } from "react-hook-form";
import { RHFRating } from "@/app/_components/hookForm/RHFRating";
import { RHFTextarea } from "@/app/_components/hookForm/RHFTextarea";
import { Button } from "@/ui/button";
import { StatusCode } from "@/constants/enums";
import { toast } from "sonner";
import { Review } from "@/types/review.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";

interface DeliveredClaimProps {
    claimStatus: ClaimStatusResponse;
    claimData?: FullClaim;
    reviewsData?: Review[];
}

export const DeliveredClaim = ({ claimStatus, claimData, reviewsData }: DeliveredClaimProps) => {
    const router = useRouter();
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const [isPending, startTransition] = useTransition();
    const [formState, formAction] = useActionState<CreateReviewResponse | null, FormData>(
        createReviewAction,
        null
    );

    const reviewSchema = z.object({
        rate: z.string().min(1, tCommon("validation.required.thisField")),
        comment: z.string().min(1, tCommon("validation.required.thisField"))
    });

    type ReviewFormData = z.infer<typeof reviewSchema>;

    const form = useZodForm(reviewSchema, {
        defaultValues: {
            rate: '',
            comment: '',
        }
    });

    useEffect(() => {
        console.log(formState)
        if (!!formState && formState.status === StatusCode.Failed) {
            toast.error(formState?.message || tCommon("messages.error"));
        } else if (!!formState && formState.status === StatusCode.Success) {
            toast.success(formState?.message || tCommon("messages.success"));
            router.replace(`/profile/claims/process?claimId=${formState?.data?.claim_id}`)
        }
    }, [formState]);

    const onSubmit = async (data: ReviewFormData) => {
        const formData = new FormData();
        formData.append("claimId", claimData?.id.toString() || '');
        formData.append("rate", data.rate);
        formData.append("comment", data.comment);

        startTransition(async () => {
            await formAction(formData);
        });
    }

    return (
        <>
            <div className="p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-white">
                <Icon
                    icon="solar--check-circle-outline"
                    sizeClass="size-16"
                    className="text-success mx-auto" />
                <h2 className="mt-3 lg:mt-4 text-center text-xl font-semibold text-title">
                    {tPages("profile.claims.delivered")}
                </h2>
                <p className="text-caption text-sm font-normal leading-6 text-center mt-2">
                    {tPages("profile.claims.deliveredDescription")}
                </p>
            </div>
            <div className="mt-5">
                {claimStatus.show_review_form && <div className="bg-white p-5 rounded-2xl lg:rounded-3xl">
                    <FormProvider {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            <RHFRating
                                name="rate"
                                label={tCommon("inputs.yourRate")}
                            />
                            <RHFTextarea
                                name="comment"
                                label={tCommon("inputs.yourComment")}
                            />
                            <div className="flex items-center justify-end mt-1">
                                <Button
                                    variant={"default"}
                                    type="submit"
                                    className="flex-1 md:flex-initial"
                                    isLoading={isPending}>
                                    {tCommon("buttons.submitReview")}
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>}
            </div>
            {reviewsData?.map(review => (
                <div
                    key={review.id}
                    className="bg-white p-5 rounded-2xl lg:rounded-3xl mt-4">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-12">
                            <AvatarImage src={review.user.profile_photo_path!} alt={review.user.nickname} />
                            <AvatarFallback>{review.user.nickname}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-primary font-normal">
                                {review.user.nickname}
                            </p>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }, (_, index) => (
                                    <Icon key={index}
                                        icon={index < review.rate ? "solar--star-bold" : "solar--star-outline"}
                                        sizeClass="size-4"
                                        className="text-amber-400" />
                                ))}
                            </div>
                        </div>
                    </div>
                    <p className="mt-3 text-caption font-normal text-justify text-sm leading-6">
                        {review.comment}
                    </p>
                </div>
            ))}
        </>
    )
}