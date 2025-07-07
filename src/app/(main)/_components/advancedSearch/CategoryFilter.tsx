"use client";

import { cn } from '@/lib/utils';
import { Category } from '@/types/category.type';
import { useEffect, useState } from 'react';
import { getActiveCategories } from './searchServices';
import { useCommonTranslation } from '@/hooks/useTranslation';

interface CategoryFilterProps {
    value?: number | null;
    onChange?: (categoryId: number | null) => void;
    className?: string;
}

export const CategoryFilter = ({
    value,
    onChange,
    className
}: CategoryFilterProps) => {
    const t = useCommonTranslation();
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categories = await getActiveCategories();
                setCategories(categories.slice(0, 5));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
            setLoading(false);
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId: number | null) => {
        onChange?.(categoryId);
    };

    if (loading) {
        return (
            <div className={cn('flex items-center justify-end gap-2', className)}>
                <div className="border border-border text-title rounded-full px-3 py-1 text-sm animate-pulse">
                    {t("inputs.loading")}
                </div>
            </div>
        );
    }

    return (
        <div className={cn('flex items-center justify-end gap-2', className)}>
            <div
                onClick={() => handleCategorySelect(null)}
                className={cn(
                    'border rounded-full px-3 py-1 cursor-pointer text-sm transition-colors',
                    value === null
                        ? 'border-sub text-primary bg-primary/10'
                        : 'border-border text-title hover:border-sub hover:text-primary'
                )}
            >
                {t("inputs.allCategories")}
            </div>

            {categories.map((category) => {
                const isSelected = value === category.id;
                return (
                    <div
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={cn(
                            'border rounded-full px-3 py-1 cursor-pointer text-sm transition-colors',
                            isSelected
                                ? 'border-sub text-primary bg-primary/10'
                                : 'border-border text-title hover:border-sub hover:text-primary'
                        )}
                    >
                        {category.title}
                    </div>
                );
            })}
        </div>
    );
};