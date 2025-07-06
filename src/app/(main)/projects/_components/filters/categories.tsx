"use client"

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/ui/checkbox";
import { useFetchData } from "@/hooks/useFetchData";
import { apiUrls } from "@/constants/apiUrls";
import { Category } from "@/types/category.type";
import { ApiResponse } from "@/core/http-service";

export const CategoriesFilter = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const { response: categories, loading } = useFetchData<ApiResponse>(apiUrls.categories.active);

    const [selectedCategories, setSelectedCategories] = useState<number[]>(() => {
        const categoryParams = searchParams.getAll('categories');
        return categoryParams.map(id => parseInt(id)).filter(id => !isNaN(id));
    });

    const updateURL = useCallback((newSelectedCategories: number[]) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete('categories');

        newSelectedCategories.forEach(categoryId => {
            params.append('categories', categoryId.toString());
        });

        params.delete('page');

        const newURL = `${pathname}?${params.toString()}`;
        router.push(newURL, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleCategoryChange = (categoryId: number, checked: boolean) => {
        let newSelectedCategories: number[];

        if (checked) {
            newSelectedCategories = [...selectedCategories, categoryId];
        } else {
            newSelectedCategories = selectedCategories.filter(id => id !== categoryId);
        }

        setSelectedCategories(newSelectedCategories);
        updateURL(newSelectedCategories);
    };

    useEffect(() => {
        const categoryParams = searchParams.getAll('categories');
        const urlCategories = categoryParams.map(id => parseInt(id)).filter(id => !isNaN(id));

        if (JSON.stringify(urlCategories.sort()) !== JSON.stringify(selectedCategories.sort())) {
            setSelectedCategories(urlCategories);
        }
    }, [searchParams]);

    if (loading) {
        return (
            <div className="space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center space-x-2 animate-pulse">
                        <div className="w-4 h-4 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-40 overflow-auto">
            {categories?.data?.map((category: Category) => (
                <div key={category.id} className="flex items-center">
                    <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) =>
                            handleCategoryChange(category.id, checked as boolean)
                        }
                    />
                    <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-normal text-text mr-1.5 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {category.title}
                    </label>
                </div>
            ))}
        </div>
    );
};