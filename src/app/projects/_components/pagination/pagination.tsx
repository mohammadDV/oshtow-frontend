"use client";

import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { PaginationLink } from "@/types/project.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    links: PaginationLink[];
    total: number;
}

export const Pagination = ({ currentPage, links }: PaginationProps) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handlePageChange = (page: number) => {
        router.push(`/projects/sender?${createQueryString('page', page.toString())}`);
    };

    const renderPageButton = (link: PaginationLink, index: number) => {
        if (!link.url && link.label === "...") {
            return (
                <span key={index} className="px-3 py-2 text-text">
                    ...
                </span>
            );
        }

        if (link.label === "&laquo; قبلی") {
            return (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && handlePageChange(currentPage - 1)}
                    className="flex items-center gap-1 text-text"
                >
                    <Icon icon="solar--alt-arrow-right-outline" sizeClass="size-4" />
                    قبلی
                </Button>
            );
        }

        if (link.label === "بعدی &raquo;") {
            return (
                <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    disabled={!link.url}
                    onClick={() => link.url && handlePageChange(currentPage + 1)}
                    className="flex items-center gap-1 text-text"
                >
                    بعدی
                    <Icon icon="solar--alt-arrow-left-outline" sizeClass="size-4" />
                </Button>
            );
        }

        const pageNumber = parseInt(link.label);
        if (!isNaN(pageNumber)) {
            return (
                <Button
                    key={index}
                    variant={link.active ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNumber)}
                    className={cn("min-w-[40px]", link.active ? "border border-primary" : "")}
                >
                    {pageNumber}
                </Button>
            );
        }

        return null;
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-8">
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {links.map((link, index) => renderPageButton(link, index))}
            </div>
        </div>
    );
};