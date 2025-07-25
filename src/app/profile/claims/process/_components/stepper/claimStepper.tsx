import {
  useCommonTranslation,
  usePagesTranslation,
} from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ClaimStatus } from "@/types/claim.type";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";

interface ClaimStepperProps {
  isMobile: boolean;
  currentStep: ClaimStatus;
}

export const ClaimStepper = ({ currentStep, isMobile }: ClaimStepperProps) => {
  const tPages = usePagesTranslation();
  const tCommon = useCommonTranslation();

  const stepsData = [
    {
      value: "pending",
      step: tPages("profile.claims.firstStep"),
      title: tPages("profile.claims.firstStepTitle"),
      content: tPages("profile.claims.firstStepContent"),
    },
    {
      value: "approved",
      step: tPages("profile.claims.secondStep"),
      title: tPages("profile.claims.secondStepTitle"),
      content: tPages("profile.claims.secondStepContent"),
    },
    {
      value: "paid",
      step: tPages("profile.claims.thirdStep"),
      title: tPages("profile.claims.thirdStepTitle"),
      content: tPages("profile.claims.thirdStepContent"),
    },
    {
      value: "in_progress",
      step: tPages("profile.claims.forthStep"),
      title: tPages("profile.claims.forthStepTitle"),
      content: tPages("profile.claims.forthStepContent"),
    },
  ];

  const currentIndex = stepsData.findIndex(
    (step) => step.value === currentStep
  );

  const isDelivered = currentStep === "delivered";

  if (isMobile) {
    const progressPercentage = isDelivered ? 100 : ((currentIndex + 1) / stepsData.length) * 100;
    const circumference = 2 * Math.PI * 26;
    const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

    return (
      <div className="bg-border p-3 rounded-2xl flex items-center gap-3">
        <div className="relative w-[64px] h-[64px]">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="white"
              strokeWidth="3"
              fill="transparent"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              stroke="currentColor"
              strokeWidth="3"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className={cn(
                "transition-all duration-300 ease-in-out",
                isDelivered ? "text-success" : "text-primary"
              )}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            {isDelivered ? (
              <Icon
                icon="iconoir--check"
                sizeClass="size-7"
                className="text-success"
              />
            ) : (
              <span className="text-sm font-medium text-title">
                {currentIndex + 1} {tCommon("pagination.of")} {stepsData.length}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-title font-medium">
            {isDelivered ? tPages("profile.claims.delivered") : stepsData[currentIndex].title}
          </p>
          <p className="text-sm text-caption font-normal">
            {isDelivered
              ? tPages("profile.claims.deliveredMessage")
              : `${tCommon("buttons.nextStep")}: ${stepsData?.[currentIndex + 1]?.title || ''}`
            }
          </p>
        </div>
      </div>
    )
  } else {
    return (
      <div className="bg-white rounded-3xl p-5">
        <div className="flex flex-col gap-12 relative -mr-1">
          {stepsData.map((step, index) => (
            <div key={step.value} className="flex gap-2.5 z-10">
              <div
                className={cn(
                  "size-14 shrink-0 rounded-full flex text-lg items-center justify-center border-8 border-white",
                  isDelivered || index < currentIndex
                    ? "bg-success text-white"
                    : currentStep === step.value
                      ? "text-white bg-primary"
                      : "text-primary bg-border"
                )}
              >
                {(isDelivered || index < currentIndex) ? (
                  <Icon
                    icon="iconoir--check"
                    sizeClass="size-6"
                    className="text-white"
                  />
                ) : index + 1}
              </div>
              <div
                className={cn(
                  "flex flex-col gap-1",
                  "mt-2"
                )}
              >
                {currentStep !== step.value && (
                  <p className="text-sm text-caption font-normal">{step.step}</p>
                )}
                <p
                  className={cn("font-medium",
                    index < currentIndex ? "text-success" : "text-title"
                  )}>
                  {step.title}
                </p>
                {currentStep === step.value && (
                  <p className="text-sm text-text mt-3.5 flex-auto">
                    {step.content}
                  </p>
                )}
              </div>
            </div>
          ))}
          <div className="absolute top-0 bottom-0 w-px bg-hint right-7"></div>
        </div>

        <div className="mt-16">
          <Button variant={"ghost"} size={"default"} className="w-full">
            {tCommon("buttons.chatWithPassenger")}
            <Icon icon="solar--chat-round-dots-outline" sizeClass="size-5" />
          </Button>
          <div className="mt-6 flex items-center gap-2.5">
            <Icon
              icon="solar--headphones-round-bold-duotone"
              sizeClass="size-6"
              className="text-caption"
            />
            <div className="flex flex-col gap-1">
              <p className="text-caption text-sm font-normal">
                {tCommon("messages.needGuid")}
              </p>
              <div className="flex items-center gap-1 text-caption">
                <span className="text-primary">{tPages("profile.claims.supportRequest")}</span>
                {tPages("profile.claims.or")}
                <span className="text-primary">{tPages("profile.claims.contactUs")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
