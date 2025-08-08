import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, createFileUrl, putCommas } from "@/lib/utils";
import { FullClaim } from "@/types/claim.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";

interface SentClaimCardProps {
    data: FullClaim;
}

export const SentClaimCard = ({ data }: SentClaimCardProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const claimStatusIndex: any = {
        pending: 1,
        approved: 2,
        paid: 3,
        in_progress: 4,
        delivered: 5
    }

    return (
        <div className="w-full bg-white rounded-2xl lg:rounded-3xl p-5 lg:p-6 flex items-center flex-col lg:flex-row justify-between">
            <div className="flex lg:items-center gap-2.5 lg:gap-4 w-full lg:w-1/4 min-w-max">
                <Icon
                    icon={"solar--pen-2-outline"}
                    sizeClass="size-8"
                    className="text-caption"
                />
                <div className="flex flex-col w-full lg:items-start gap-2.5">
                    <h3 className="text-lg font-medium text-title line-clamp-1">
                        {data.project.title}
                    </h3>
                    <p className="text-sm text-text font-normal">
                        {putCommas(parseFloat(data.amount))} {' '} {tCommon("unit.toman")}
                    </p>
                </div>
            </div>
            <div className="flex justify-between items-center lg:gap-24 w-full lg:w-auto mt-6 lg:mt-0">
                <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                        <AvatarImage
                            src={data.project.user.profile_photo_path
                                ? createFileUrl(data.project.user.profile_photo_path)
                                : undefined}
                            alt={data.project.user.nickname}
                        />
                        <AvatarFallback>{data.project.user.nickname}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-1.5 lg:gap-2">
                        <p className="text-sm text-primary font-normal">
                            {data.project.user.nickname}
                        </p>
                        <p className="text-xs text-text font-normal">
                            {tPages("profile.claims.adPublisher")}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-normal text-caption">
                        {tPages("profile.claims.projectStatus")}
                    </p>
                    <div className="flex flex-col gap-2.5 items-start">
                        <p className="text-sm text-title font-medium">
                            {tCommon(`claimStatus.${data.status}`)}
                        </p>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className={cn("w-5 h-1", (claimStatusIndex[data.status] || 0) > index ? "bg-success" : "bg-border")}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-6 lg:mt-0 lg:flex-col gap-2 w-full lg:w-auto">
                <Link href={`/profile/claims/process?claimId=${data.id}`}
                    className={cn("w-full lg:w-auto",
                        data.status === "pending" || data.status === "canceled" ? "pointer-events-none opacity-50" : ""
                    )}>
                    <Button variant={"ghost"} size={"sm"} className="w-full">
                        {tCommon("buttons.managePassenger")}
                    </Button>
                </Link>
                <Link href={`/${data.project.type}/${data.project.id}`}>
                    <Button variant={"outline"} size={"sm"} className="w-full py-2">
                        {tCommon("buttons.seeOnSite")}
                    </Button>
                </Link>
            </div>
        </div>
    )
}