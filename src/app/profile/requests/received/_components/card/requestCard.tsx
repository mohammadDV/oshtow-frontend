import { useCommonTranslation, usePagesTranslation } from "@/hooks/useTranslation";
import { cn, isEmpty } from "@/lib/utils";
import { Project } from "@/types/project.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import Link from "next/link";

interface ReceivedRequestCardProps {
    data: Project;
}

export const ReceivedRequestCard = ({ data }: ReceivedRequestCardProps) => {
    const tPages = usePagesTranslation();
    const tCommon = useCommonTranslation();

    const projectStatusIndex: any = {
        pending: 1,
        approved: 2,
        in_progress: 3,
        completed: 4
    }

    return (
        <div className="w-full bg-white rounded-2xl lg:rounded-3xl p-6 flex items-center justify-between">
            <div className="flex items-center gap-4 lg:w-1/4 min-w-max">
                <Icon
                    icon={"solar--pen-2-outline"}
                    sizeClass="size-8"
                    className="text-caption"
                />
                <div className="flex flex-col items-start gap-2.5">
                    <h3 className="text-lg font-semibold text-title">
                        {data.title}
                    </h3>
                    {!isEmpty(data?.categories) && <Badge variant={"primary"}>
                        {data.categories?.[0]?.title}
                    </Badge>}
                </div>
            </div>
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
                    {data?.claims_count || 0} {' '} {tPages("profile.requests.requestSent")}
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <p className="text-xs font-normal text-caption">
                    {tPages("profile.requests.projectStatus")}
                </p>
                <div className="flex flex-col gap-2.5 items-start">
                    <p className="text-sm text-title font-medium">
                        {tCommon(`projectStatus.${data.status}`)}
                    </p>
                    <div className="flex items-center gap-0.5">
                        {Array.from({ length: 4 }, (_, index) => (
                            <div key={index} className={cn("w-4 h-1", (projectStatusIndex[data.status] || 0) > index ? "bg-success" : "bg-border")}></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Link href={`/profile/requests/claim/${data.id}`}
                    className={data.status === "approved" || data.status === "in_progress" || data.status === "completed" ? "" : "pointer-events-none opacity-50"}>
                    <Button variant={"ghost"} size={"sm"}>
                        {tCommon("buttons.manageRequests")}
                    </Button>
                </Link>
                <Link href={`/${data.type}/${data.id}`}
                    className={data.status === "approved" || data.status === "in_progress" || data.status === "completed" ? "" : "pointer-events-none opacity-50"}>
                    <Button variant={"outline"} size={"sm"} className="w-full">
                        {tCommon("buttons.seeOnSite")}
                    </Button>
                </Link>
            </div>
        </div >
    )
}