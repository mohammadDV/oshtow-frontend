"use client"

import { useCommonTranslation } from "@/hooks/useTranslation";
import { Icon } from "@/ui/icon";
import { useState } from "react";

export const ShareProject = () => {
    const t = useCommonTranslation();
    const [copied, setCopied] = useState(false);

    const getCurrentUrl = () => {
        if (typeof window !== 'undefined') {
            return window.location.href;
        }
        return '';
    };

    const shareOnTelegram = () => {
        const url = getCurrentUrl();
        window.open(`https://t.me/share/url?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnWhatsApp = () => {
        const url = getCurrentUrl();
        window.open(`https://wa.me/?text=${url}`, '_blank');
    };

    const shareOnFacebook = () => {
        const url = getCurrentUrl();
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnLinkedIn = () => {
        const url = getCurrentUrl();
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
    };

    const shareOnInstagram = () => {
        copyToClipboard();
    };

    const copyToClipboard = async () => {
        try {
            const url = getCurrentUrl();
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
            const textArea = document.createElement('textarea');
            textArea.value = getCurrentUrl();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button
                    onClick={shareOnTelegram}
                    className="size-9 bg-sub/30 flex items-center justify-center rounded-full hover:bg-sub/50 transition-colors cursor-pointer"
                    title="Share on Telegram"
                >
                    <Icon
                        icon="iconoir--telegram"
                        sizeClass="size-5"
                        className="text-primary"
                    />
                </button>
                <button
                    onClick={shareOnInstagram}
                    className="size-9 bg-sub/30 flex items-center justify-center rounded-full hover:bg-sub/50 transition-colors cursor-pointer"
                    title="Share on Instagram"
                >
                    <Icon
                        icon="iconoir--instagram"
                        sizeClass="size-5"
                        className="text-primary"
                    />
                </button>
                <button
                    onClick={shareOnWhatsApp}
                    className="size-9 bg-sub/30 flex items-center justify-center rounded-full hover:bg-sub/50 transition-colors cursor-pointer"
                    title="Share on WhatsApp"
                >
                    <Icon
                        icon="iconoir--whatsapp"
                        sizeClass="size-5"
                        className="text-primary"
                    />
                </button>
                <button
                    onClick={shareOnFacebook}
                    className="size-9 bg-sub/30 flex items-center justify-center rounded-full hover:bg-sub/50 transition-colors cursor-pointer"
                    title="Share on Facebook"
                >
                    <Icon
                        icon="iconoir--facebook"
                        sizeClass="size-5"
                        className="text-primary"
                    />
                </button>
                <button
                    onClick={shareOnLinkedIn}
                    className="size-9 bg-sub/30 flex items-center justify-center rounded-full hover:bg-sub/50 transition-colors cursor-pointer"
                    title="Share on LinkedIn"
                >
                    <Icon
                        icon="iconoir--linkedin"
                        sizeClass="size-5"
                        className="text-primary"
                    />
                </button>
            </div>
            <button
                onClick={copyToClipboard}
                className={`flex items-center justify-center text-sm gap-2.5 py-2 px-4 rounded-full transition-colors cursor-pointer ${copied
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                    }`}
                title="Copy link to clipboard"
            >
                {copied ? t("messages.copied") || "Copied!" : t("buttons.copyLink")}
                <Icon
                    icon={copied ? "solar--check-circle-outline" : "solar--copy-outline"}
                    sizeClass="size-5"
                />
            </button>
        </div>
    )
}