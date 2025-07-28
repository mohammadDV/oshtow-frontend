"use client"

import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Project, ProjectType } from "@/types/project.type";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createdDateConvertor } from "@/lib/dateUtils";

interface ProfileProjectCardProps {
    data: Project;
    type: ProjectType;
}

export const ProfileProjectCard = ({ data, type }: ProfileProjectCardProps) => {
    const router = useRouter();
    const t = useCommonTranslation();

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case "pending":
                return "secondary";
            case "in_progress":
            case "completed":
            case "approved":
                return "default";
            case "canceled":
            case "failed":
            case "reject":
                return "destructive";
            default:
                return "secondary";
        }
    };

    const handleEdit = () => {
        router.push(`/profile/projects/${type}/${data.id}`)
    };

    const handleDeactivate = () => {
        console.log('Deactivate project:', data.id);
    };

    const handleViewOnSite = () => {
        router.push(`/${type}/${data.id}`)
    };

    return (
        <div className="w-full bg-white lg:rounded-3xl rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                    <Icon
                        icon={type === "sender" ? "solar--box-outline" : "solar--earth-outline"}
                        sizeClass="size-8"
                        className="text-caption"
                    />
                    <h3 className="text-lg lg:text-xl font-medium text-title line-clamp-1">
                        {data.title}
                    </h3>
                    <Badge variant={getStatusBadgeVariant(data.status)} className="lg:block hidden">
                        {t(`projectStatus.${data.status}`)}
                    </Badge>
                    {data?.vip && (
                        <div className="size-6 lg:size-7 bg-violet-400 flex items-center rounded-full justify-center">
                            <Icon icon="solar--crown-minimalistic-outline" sizeClass="size-3.5 lg:size-4" className="text-white" />
                        </div>
                    )}
                </div>
                <Popover>
                    <PopoverTrigger asChild>
                        <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
                            <Icon icon="solar--menu-dots-outline" sizeClass="size-6" className="text-caption" />
                        </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2" align="end">
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={handleEdit}
                                className={cn("flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-100 rounded-md transition-colors w-full text-right",
                                    data.status === "pending" || data.status === "reject"
                                        ? ""
                                        : "pointer-events-none opacity-40"
                                )}
                            >
                                <Icon icon="solar--pen-2-outline" sizeClass="size-5" className="text-sub" />
                                {t("buttons.edit")}
                            </button>
                            <button
                                onClick={handleDeactivate}
                                className={cn("flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-100 rounded-md transition-colors w-full text-right",
                                    data.status === "approved" ? "" : "pointer-events-none opacity-40"
                                )}
                            >
                                <Icon icon="solar--close-circle-outline" sizeClass="size-5" className="text-sub" />
                                {t("buttons.deactivate")}
                            </button>
                            <button
                                onClick={handleViewOnSite}
                                className={cn("flex items-center gap-2 px-3 py-2 text-sm text-title hover:bg-gray-100 rounded-md transition-colors w-full text-right",
                                    data.status === "approved" || data.status === "in_progress" || data.status === "completed"
                                        ? ""
                                        : "pointer-events-none opacity-40"
                                )}
                            >
                                <Icon icon="solar--eye-outline" sizeClass="size-5" className="text-sub" />
                                {t("buttons.seeOnSite")}
                            </button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center gap-5 mt-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--map-point-wave-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        {data.origin.city.title} به {data.destination.city.title}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--calendar-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        {data.send_date}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--weigher-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        {data.weight} {t("unit.kg")}
                    </span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Icon
                        icon="solar--tag-price-bold-duotone"
                        sizeClass="size-5"
                        className="text-sub"
                    />
                    <span className="text-text font-normal text-sm">
                        {data.amount.toLocaleString()} {t("unit.toman")} {type === "passenger" && "(Kg)"}
                    </span>
                </div>
            </div>
            <hr className="border-t border-border mt-5 mb-4" />
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center justify-between w-full lg:w-fit">
                    <div className="text-sm text-text font-normal">
                        {t("columns.releaseAt")}: {createdDateConvertor(data.created_at || "")}
                    </div>
                    <Badge variant={getStatusBadgeVariant(data.status)} className="block lg:hidden">
                        {t(`projectStatus.${data.status}`)}
                    </Badge>
                </div>
                <Button
                    variant={"ghost"}
                    size={"sm"}
                    disabled={data.status !== "approved" && data.status !== "in_progress"}>
                    {t("buttons.managePassenger")}
                </Button>
            </div>
        </div>
    )
}