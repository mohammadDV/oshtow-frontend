"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useCommonTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ComponentBase } from "@/types/component-base.type";

interface ShowMoreProps extends ComponentBase {
    children: React.ReactNode;
    maxHeight?: number;
    showMoreText?: string;
    showLessText?: string;
    buttonVariant?: "default" | "outline" | "ghost" | "link";
    expandIcon?: string;
    collapseIcon?: string;
}

export const ShowMore = ({
    children,
    maxHeight = 80,
    showMoreText,
    showLessText,
    buttonVariant = "ghost",
    expandIcon = "solar--alt-arrow-down-outline",
    collapseIcon = "solar--alt-arrow-up-outline",
    size = "sm",
    className,
    ...props
}: ShowMoreProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [contentHeight, setContentHeight] = useState<number>(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const tCommon = useCommonTranslation();

    const defaultShowMoreText = showMoreText || tCommon("buttons.showMore");
    const defaultShowLessText = showLessText || tCommon("buttons.showLess");

    useEffect(() => {
        if (contentRef.current) {
            const height = contentRef.current.scrollHeight;
            setContentHeight(height);
            setShowButton(height > maxHeight);
        }
    }, [children, maxHeight]);

    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={cn("relative", className)} {...props}>
            <div
                ref={contentRef}
                className={cn(
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    !isExpanded && showButton && "relative"
                )}
                style={{
                    height: showButton 
                        ? isExpanded 
                            ? `${contentHeight}px` 
                            : `${maxHeight}px`
                        : 'auto'
                }}
            >
                {children}
                {!isExpanded && showButton && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                )}
            </div>

            {showButton && (
                <div className="mt-1 flex justify-center">
                    <Button
                        variant={buttonVariant}
                        size={size}
                        onClick={toggleExpanded}
                        className="gap-1.5"
                    >
                        {isExpanded ? defaultShowLessText : defaultShowMoreText}
                        <Icon
                            icon={isExpanded ? collapseIcon : expandIcon}
                            sizeClass="size-4"
                            className="transition-transform duration-200"
                        />
                    </Button>
                </div>
            )}
        </div>
    );
};