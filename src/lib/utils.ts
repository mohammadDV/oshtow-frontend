import { FILE_URL } from "@/configs/global";
import { NotificationsModalType } from "@/types/notifications.type";
import { PathType } from "@/types/project.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isEmpty = (value: any): boolean => {
  return (
    value === undefined ||
    value === null ||
    value == "" ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
};

export const pathTypeGenerator = (value: PathType) => {
  switch (value) {
    case "air":
      return "هوایی";
    case "land":
      return "زمینی";
    case "sea":
      return "دریایی";
    default:
      return;
  }
};

export const putCommas = (value: number): string => {
  return new Intl.NumberFormat().format(Math.trunc(value));
};

export const createFileUrl = (url: string) => `${FILE_URL}/${url}`;

export const notificationLinkGenerator = (
  type: NotificationsModalType,
  id: number
) => {
  switch (type) {
    case "claim":
      return `/profile/claims/process?claimId=${id}`;
    case "passenger":
      return `/profile/projects/passenger`;
    case "sender":
      return `/profile/projects/sender`;
    default:
      return `/profile/notifications`;
  }
};
