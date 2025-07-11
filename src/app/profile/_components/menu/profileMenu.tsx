"use client";

import { cn } from "@/lib/utils";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export interface MenuItem {
  label: string;
  icon: string;
  link?: string;
  children?: MenuItem[];
}

interface ProfileMenuProps {
  items: MenuItem[];
  depth?: number;
}

export const ProfileMenu = ({ items, depth = 0 }: ProfileMenuProps) => {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const isActive = (item: MenuItem): boolean => {
    if (item.link && pathname === item.link) return true;
    if (item.children) return item.children.some((child) => isActive(child));
    return false;
  };

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isMenuOpen = (label: string) => openMenus.includes(label);

  return (
    <ul className={cn(depth > 0 && "pr-2.5")}>
      {items.map((item) => {
        const active = isActive(item);
        const open = isMenuOpen(item.label) || active;

        return (
          <li
            key={item.label}
            className={cn(
              "relative",
              depth > 0 ? "my-0.5 transition hover:-translate-x-1" : "my-1.5"
            )}
          >
            {item.children ? (
              <div
                onClick={() => toggleMenu(item.label)}
                className={cn(
                  "py-2.5 rounded-lg transition cursor-pointer relative",
                  active ? "text-primary" : "text-caption"
                )}
              >
                {active && (
                  <div className="w-0.5 bg-primary rounded-full h-6 absolute -right-6"></div>
                )}
                <div
                  className={cn(
                    "flex items-center justify-between",
                    active ? "text-primary" : "text-caption"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon icon={item.icon} sizeClass="size-6" />
                    <span>{item.label}</span>
                  </div>
                  <Icon
                    icon="solar--alt-arrow-left-outline"
                    sizeClass="size-5"
                    className={cn(
                      "transition-transform duration-300",
                      open ? "-rotate-90" : "rotate-0"
                    )}
                  />
                </div>
              </div>
            ) : (
              <Link
                href={item.link!}
                className={cn(
                  "flex items-center relative justify-between py-2.5 rounded-lg transition",
                  active ? "text-primary" : "text-caption"
                )}
              >
                {active && (
                  <div className="w-0.5 bg-primary rounded-full h-6 absolute -right-6"></div>
                )}
                <div className="flex items-center gap-2">
                  <Icon icon={item.icon} sizeClass="size-6" />
                  <span>{item.label}</span>
                </div>
              </Link>
            )}

            {item.children && (
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <ProfileMenu items={item.children} depth={depth + 1} />
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
};
