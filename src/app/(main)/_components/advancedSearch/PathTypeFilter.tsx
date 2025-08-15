'use client';

import { useCommonTranslation } from '@/hooks/useTranslation';
import { cn } from '@/lib/utils';
import { PathType } from '@/types/project.type';

interface PathTypeFilterProps {
    value?: PathType | null;
    onChange?: (pathType: PathType | null) => void;
    className?: string;
}

export const PathTypeFilter = ({
    value,
    onChange,
    className
}: PathTypeFilterProps) => {
    const t = useCommonTranslation();

    const handlePathTypeSelect = (pathType: PathType) => {
        onChange?.(pathType);
    };

    const pathTypeOptions = [
        {
            value: 'air' as PathType,
            label: t("path.air"),
            apiValue: 'air'
        },
        {
            value: 'land' as PathType,
            label: t("path.land"),
            apiValue: 'land'
        },
        {
            value: 'sea' as PathType,
            label: t("path.sea"),
            apiValue: 'sea'
        },
    ];

    return (
        <div className={cn('flex items-center lg:justify-end gap-2', className)}>
            {pathTypeOptions.map((option) => {
                const isSelected = value === option.value;
                return (
                    <div
                        key={option.value}
                        onClick={() => handlePathTypeSelect(option.value)}
                        className={cn(
                            'border rounded-full px-3 py-1 cursor-pointer text-sm transition-all',
                            isSelected
                                ? 'border-sub text-primary bg-primary/10'
                                : 'border-border text-title hover:border-sub/50'
                        )}
                    >
                        {option.label}
                    </div>
                );
            })}
        </div>
    );
};

export type { PathType };