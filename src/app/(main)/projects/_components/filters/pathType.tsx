"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/ui/checkbox";
import { pathTypeOptions } from "@/_mock/pathOptions";

export const PathTypeFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [selectedPathType, setSelectedPathType] = useState<string | null>(() => {
        return searchParams.get('path_type') || null;
    });

    const updateURL = useCallback((newPathType: string | null) => {
        const params = new URLSearchParams(searchParams.toString());

        if (newPathType) {
            params.set('path_type', newPathType);
        } else {
            params.delete('path_type');
        }

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handlePathTypeChange = (pathTypeValue: string, checked: boolean) => {
        let newSelectedPathType: string | null;

        if (checked) {
            newSelectedPathType = pathTypeValue;
        } else {
            newSelectedPathType = null;
        }

        setSelectedPathType(newSelectedPathType);
        updateURL(newSelectedPathType);
    };

    useEffect(() => {
        const urlPathType = searchParams.get('path_type');

        if (urlPathType !== selectedPathType) {
            setSelectedPathType(urlPathType);
        }
    }, [searchParams, selectedPathType]);

    return (
        <div className="space-y-3">
            {pathTypeOptions.map((option) => (
                <div key={option.value} className="flex items-center">
                    <Checkbox
                        id={`pathType-${option.value}`}
                        checked={selectedPathType === option.value}
                        onCheckedChange={(checked) =>
                            handlePathTypeChange(option.value, checked as boolean)
                        }
                    />
                    <label
                        htmlFor={`pathType-${option.value}`}
                        className="text-sm font-normal cursor-pointer text-text mr-1.5 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {option.label}
                    </label>
                </div>
            ))}
        </div>
    );
};