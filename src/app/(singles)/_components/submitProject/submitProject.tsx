import { usePagesTranslation } from "@/hooks/useTranslation"
import { SingleProjectResponse } from "@/types/project.type";
import { Button } from "@/ui/button"
import { Icon } from "@/ui/icon"
import Link from "next/link"

interface SubmitProjectCardProps {
    isMobile: boolean;
    projectData: SingleProjectResponse;
    title: string;
    submitLabel: string;
    chatLabel: string
    infoText: string
}

export const SubmitProjectCard = ({
    isMobile,
    projectData,
    title,
    submitLabel,
    chatLabel,
    infoText
}: SubmitProjectCardProps) => {
    const t = usePagesTranslation();

    if (isMobile) {
        return (<div className="fixed bottom-0 left-0 right-0 bg-white z-50 py-4 border-t border-border px-5">
            <div className="flex items-center justify-between gap-3.5">
                <Button variant={"default"} size={"default"} className="flex-1">
                    {submitLabel}
                    <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
                </Button>
                {/* <Button variant={"ghost"} size={"default"} className="flex-1">
                    {chatLabel}
                    <Icon icon="solar--chat-round-dots-outline" sizeClass="size-5" />
                </Button> */}
            </div>
        </div>)
    } else {
        return (
            <div className="lg:w-1/3 rounded-3xl p-6 bg-white sticky top-4">
                <p className="text-title font-normal text-lg mb-4">
                    {title}
                </p>
                <Button variant={"default"} size={"lg"} className="mb-3 w-full">
                    {submitLabel}
                    <Icon icon="solar--pen-2-outline" sizeClass="size-5" />
                </Button>
                {/* <Button variant={"ghost"} size={"lg"} className="w-full">
              {chatLabel}
              <Icon
                icon="solar--chat-round-dots-outline"
                sizeClass="size-5"
              />
            </Button> */}
                <div className="flex gap-2 mt-2">
                    <Icon
                        icon="solar--info-circle-outline"
                        sizeClass="size-5"
                        className="text-caption"
                    />
                    <p className="text-caption font-light text-sm">
                        {infoText}
                    </p>
                </div>
                <hr className="border-t border-border my-4 lg:my-4" />
                <Link href={`/user/${projectData.project.user.id}`} className="flex items-center gap-1.5">
                    <img
                        src={projectData?.project?.user?.profile_photo_path!}
                        alt=""
                        width={42}
                        height={42}
                        className="rounded-full object-cover" />
                    <div className="text-sm font-normal text-text">
                        <span className="text-primary">
                            {projectData.project.user.nickname}
                        </span>
                        <span className="ms-1">
                            {t("sender.hasSubmitAd")}
                        </span>
                    </div>
                </Link>
            </div>
        )
    }
}