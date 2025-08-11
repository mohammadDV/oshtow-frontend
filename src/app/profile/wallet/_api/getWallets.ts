import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { WalletsResponse } from "@/types/wallet.type";

export const getWallets = async (): Promise<WalletsResponse> => {
  return await getFetchAuth<WalletsResponse>(apiUrls.wallet.all);
};
