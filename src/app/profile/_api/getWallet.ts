import { apiUrls } from "@/constants/apiUrls";
import { StatusCode } from "@/constants/enums";
import { getFetchAuth } from "@/core/baseService";

export interface WalletService {
  status: StatusCode;
  data: {
    available_balance: number;
    balance: string;
    currency: string;
  };
}

export const getWallet = async (): Promise<WalletService> => {
  return await getFetchAuth<WalletService>(apiUrls.wallet.single);
};
