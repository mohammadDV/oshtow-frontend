import { headers } from "next/headers";

export const getUserData = async () => {
    const userData = (await headers()).get("userData");
    return JSON.parse(userData || "{}");
};
