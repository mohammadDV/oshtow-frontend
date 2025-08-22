"use server";

import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";

export interface GatewayRedirectResponse {
  status: number;
  url?: string;
}

export const gatewayRedirectAction = async (): Promise<GatewayRedirectResponse> => {
  try {
    const res = await getFetchAuth<GatewayRedirectResponse>(
      apiUrls.payment.redirectToGatewayForIdentity
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در دریافت لینک پرداخت`);
  }
};