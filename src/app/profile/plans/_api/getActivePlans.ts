import { apiUrls } from "@/constants/apiUrls";
import { getFetch } from "@/core/publicService";

export const getActivePlans = async () => {
    return await getFetch(apiUrls.plans.active);
}