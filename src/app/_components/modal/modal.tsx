"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
} from "@/ui/drawer";
import * as React from "react";
import { useEffect, useState } from "react";

interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    showConfirm?: boolean;
    showCancel?: boolean;
    confirmVariant?: "default" | "destructive" | "outline" | "ghost" | "link" | "success";
    cancelVariant?: "default" | "destructive" | "outline" | "ghost" | "link" | "success";
    size?: "sm" | "default" | "lg" | "xl";
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    loading?: boolean;
    disabled?: boolean;
}

const Modal = ({
    open,
    onOpenChange,
    title,
    description,
    children,
    confirmText = "تأیید",
    cancelText = "لغو",
    onConfirm,
    onCancel,
    showConfirm = true,
    showCancel = true,
    confirmVariant = "default",
    cancelVariant = "outline",
    size = "default",
    className,
    headerClassName,
    footerClassName,
    loading = false,
    disabled = false,
}: ModalProps) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkDevice = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkDevice();
        window.addEventListener("resize", checkDevice);

        return () => window.removeEventListener("resize", checkDevice);
    }, []);

    const handleConfirm = () => {
        if (onConfirm && !loading && !disabled) {
            onConfirm();
        }
    };

    const handleCancel = () => {
        if (onCancel && !loading) {
            onCancel();
        } else {
            onOpenChange(false);
        }
    };

    const sizeClasses = {
        sm: "sm:max-w-sm",
        default: "sm:max-w-lg",
        lg: "sm:max-w-2xl",
        xl: "sm:max-w-4xl",
    };

    const content = (
        <div className="flex flex-col justify-between gap-4">
            {(title || description) && (
                <div className={cn("space-y-2", headerClassName)}>
                    {title && (
                        <h2 className="text-lg font-semibold text-title">
                            {title}
                        </h2>
                    )}
                    {description && (
                        <p className="text-sm text-caption">
                            {description}
                        </p>
                    )}
                </div>
            )}

            {children && (
                <div className="py-2 max-h-[70vh] overflow-auto">
                    {children}
                </div>
            )}

            {(showConfirm || showCancel) && (
                <div className={cn(
                    "flex lg:flex-col-reverse gap-3 justify-between sm:flex-row sm:justify-end",
                    footerClassName
                )}>
                    {showCancel && (
                        <Button
                            variant={cancelVariant}
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 sm:w-auto"
                        >
                            {cancelText}
                        </Button>
                    )}
                    {showConfirm && (
                        <Button
                            variant={confirmVariant}
                            onClick={handleConfirm}
                            disabled={disabled}
                            isLoading={loading}
                            className="flex-1 sm:w-auto"
                        >
                            {confirmText}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );

    if (isMobile) {
        return (
            <Drawer open={open} onOpenChange={onOpenChange}>
                <DrawerContent className={cn("p-5", className)}>
                    <DrawerHeader className="p-0">
                        {title && <DrawerTitle className="sr-only">{title}</DrawerTitle>}
                        {description && <DrawerDescription className="sr-only">{description}</DrawerDescription>}
                    </DrawerHeader>
                    {content}
                    {/* <DrawerFooter className="p-0 mt-4" /> */}
                </DrawerContent>
            </Drawer>
        );
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={cn(sizeClasses[size], className)}>
                <DialogHeader className="sr-only">
                    {title && <DialogTitle>{title}</DialogTitle>}
                    {description && <DialogDescription>{description}</DialogDescription>}
                </DialogHeader>
                {content}
                <DialogFooter className="sr-only" />
            </DialogContent>
        </Dialog>
    );
};

export { Modal };
export type { ModalProps };
