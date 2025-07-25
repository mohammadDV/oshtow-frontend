import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";

interface ProjectClaimsCardProps {
    data: Project;
}

export const ProjectClaimsCard = ({ data }: ProjectClaimsCardProps) => {
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
                <div className="flex lg:flex-col w-full lg:items-start gap-2.5">
                    <h3 className="text-lg font-medium text-title">
                        {data.title}
                    </h3>
                    {!isEmpty(data?.categories) && <Badge variant={"primary"} className="mr-auto lg:mr-0">
                        {data.categories?.[0]?.title}
                    </Badge>}
                </div>
            </div>
            <div className="flex justify-between items-center lg:gap-24 w-full lg:w-auto mt-7 lg:mt-0">
                <div className="flex flex-col gap-3">
                    {!isEmpty(data?.claimsLimit) && <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
                        {data?.claimsLimit?.map(claim => (
                            <Avatar key={claim.id}>
                                <AvatarImage src={claim.user.profile_photo_path!} alt={claim.user.nickname} />
                                <AvatarFallback>{claim.user.nickname}</AvatarFallback>
                            </Avatar>
                        ))}
                    </div>}
                    <div className="text-sm text-title font-normal">
                        {data?.claims_count || 0} {' '} {tPages("profile.claims.claimSent")}
                    </div>
                </div>
                <div className="flex flex-col gap-1.5">
                    <p className="text-xs font-normal text-caption">
                        {tPages("profile.claims.projectStatus")}
                    </p>
                    <div className="flex flex-col gap-2.5 items-start">
                        <p className="text-sm text-title font-medium">
                            {tCommon(`claimStatus.${data.claimSelected?.[0]?.status || "pending"}`)}
                        </p>
                        <div className="flex items-center gap-0.5">
                            {Array.from({ length: 5 }, (_, index) => (
                                <div key={index} className={cn("w-5 h-1", (claimStatusIndex[data.claimSelected?.[0]?.status || 1] || 1) > index ? "bg-success" : "bg-border")}></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-6 lg:mt-0 lg:flex-col gap-2 w-full lg:w-auto">
                <Link href={`/profile/claims/process?projectId=${data.id}${!isEmpty(data.claimSelected) ? "&claimId=" + data.claimSelected?.[0].id : ''}`}
                    className={cn("w-full lg:w-auto",
                        data.status === "approved" || data.status === "in_progress" || data.status === "completed" ? "" : "pointer-events-none opacity-50"
                    )}>
                    <Button variant={"ghost"} size={"sm"} className="w-full">
                        {tCommon("buttons.managePassenger")}
                    </Button>
                </Link>
                <Link href={`/${data.type}/${data.id}`}
                    className={cn("w-full lg:w-auto",
                        data.status === "approved" || data.status === "in_progress" || data.status === "completed" ? "" : "pointer-events-none opacity-50"
                    )}>
                    <Button variant={"outline"} size={"sm"} className="w-full py-2">
                        {tCommon("buttons.seeOnSite")}
                    </Button>
                </Link>
            </div>
        </div>
    )
}