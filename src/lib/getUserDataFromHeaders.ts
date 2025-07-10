import { UserData } from "@/types/user.type";
import { headers } from "next/headers";

export const getUserData = async (): Promise<UserData> => {
  const userData = (await headers()).get("userData");
  return JSON.parse(userData || "{}");
};
