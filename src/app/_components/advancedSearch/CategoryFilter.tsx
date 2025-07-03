"use client";

import { cn } from '@/lib/utils';
import { Category } from '@/types/category.type';
import { useEffect, useState } from 'react';
import { getActiveCategories } from './searchServices';

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
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getActiveCategories();
                if (response.isSuccess && response.data) {
                    // Show only first 5 categories
                    setCategories(response.data.slice(0, 5));
                }
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId: number | null) => {
        if (value === categoryId) {
            onChange?.(null); // Deselect if already selected
        } else {
            onChange?.(categoryId);
        }
    };

    if (loading) {
        return (
            <div className={cn('flex items-center justify-end gap-2', className)}>
                <div className="border border-border text-title rounded-full px-3 py-1 text-sm animate-pulse">
                    در حال بارگذاری...
                </div>
            </div>
        );
    }

    return (
        <div className={cn('flex items-center justify-end gap-2', className)}>
            {/* "همه دسته بندی ها" option */}
            <div
                onClick={() => handleCategorySelect(null)}
                className={cn(
                    'border rounded-full px-3 py-1 cursor-pointer text-sm transition-colors',
                    value === null
                        ? 'border-sub text-primary bg-primary/10'
                        : 'border-border text-title hover:border-sub hover:text-primary'
                )}
            >
                همه دسته بندی ها
            </div>

            {/* Category options */}
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