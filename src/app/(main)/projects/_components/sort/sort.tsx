"use client"

import { usePagesTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/types/project.type";
import { Icon } from "@/ui/icon";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

type SortOption = 'default' | 'lightest' | 'heaviest';

interface ProjectsSortProps {
  type: ProjectType
}

export const ProjectsSort = ({ type }: ProjectsSortProps) => {
  const t = usePagesTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = searchParams.get('sort');
  const currentColumn = searchParams.get('column');

  const getActiveSortOption = (): SortOption => {
    if (currentColumn === 'weight' && currentSort === 'asc') return 'lightest';
    if (currentColumn === 'weight' && currentSort === 'desc') return 'heaviest';
    return 'default';
  };

  const activeSortOption = getActiveSortOption();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === '') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (sortOption: SortOption) => {
    const updates: Record<string, string | null> = {
      page: '1',
    };

    if (sortOption === 'lightest') {
      updates.sort = 'asc';
      updates.column = 'weight';
    } else if (sortOption === 'heaviest') {
      updates.sort = 'desc';
      updates.column = 'weight';
    } else {
      updates.sort = null;
      updates.column = null;
    }

    const queryString = createQueryString(updates);
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`);
  };

  return (
    <div className="flex items-center gap-2 lg:gap-4 bg-white lg:bg-transparent lg:p-0 pl-1.5 pr-2 lg:px-2.5 py-1 rounded-full">
      <div className="flex items-center gap-2 lg:gap-3">
        <Icon
          icon="solar--sort-outline"
          sizeClass="size-4.5 lg:size-6"
          className="text-text"
        />
        <p className="hidden lg:block text-text font-font-medium">
          {t("projects.sort")}
        </p>
      </div>
      <div className="hidden lg:block h-3 w-0.5 bg-border"></div>
      <div className="flex items-center gap-0.5 lg:gap-3">
        <button
          onClick={() => handleSortChange('default')}
          className={cn("text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === 'default'
              ? 'bg-primary/10 lg:bg-transparent text-primary font-medium'
              : 'text-caption font-normal hover:text-text'
          )}
        >
          {t("projects.default")}
        </button>
        <button
          onClick={() => handleSortChange('lightest')}
          className={cn("text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === 'lightest'
              ? 'bg-primary/10 lg:bg-transparent text-primary font-medium'
              : 'text-caption font-normal hover:text-text'
          )}
        >
          {type === "sender" && t("projects.lightest")}
          {type === "passenger" && t("projects.minimum")}
        </button>
        <button
          onClick={() => handleSortChange('heaviest')}
          className={cn("text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === 'heaviest'
              ? 'bg-primary/10 lg:bg-transparent text-primary font-medium'
              : 'text-caption font-normal hover:text-text'
          )}
        >
          {type === "sender" && t("projects.heaviest")}
          {type === "passenger" && t("projects.maximum")}
        </button>
      </div>
    </div>
  );
};
