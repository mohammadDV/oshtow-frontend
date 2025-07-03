'use client';

import { cn } from '@/lib/utils';
import { PathType } from '@/types/project.type';

interface PathTypeFilterProps {
    value?: PathType | null;
    onChange?: (pathType: PathType | null) => void;
    className?: string;
}

const pathTypeOptions = [
    {
        value: 'air' as PathType,
        label: 'هوایی',
        apiValue: 'air'
    },
    {
        value: 'land' as PathType,
        label: 'زمینی',
        apiValue: 'land'
    },
    {
        value: 'sea' as PathType,
        label: 'دریایی',
        apiValue: 'sea'
    },
];

export const PathTypeFilter = ({
    value,
    onChange,
    className
}: PathTypeFilterProps) => {
    const handlePathTypeSelect = (pathType: PathType) => {
        if (value === pathType) {
            onChange?.(null);
        } else {
            onChange?.(pathType);
        }
    };

    return (
        <div className={cn('flex items-center justify-end gap-2', className)}>
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