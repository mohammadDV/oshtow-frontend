import { headers } from "next/headers";

export const isMobileDevice = async () => {
  const device = (await headers()).get("x-device");
  return device === "mobile";
};
