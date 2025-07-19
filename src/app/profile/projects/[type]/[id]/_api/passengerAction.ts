"use server";

import { apiUrls } from "@/constants/apiUrls";
import { postFetchAuth } from "@/core/baseService";

export interface PassengerService {
  status: number;
  message?: string;
  errors?: { [key: string]: string[] };
}

export const passengerAction = async (
  _state: any,
  formData: FormData
): Promise<PassengerService> => {
  const title = formData.get("title");
  const description = formData.get("description");
  const address = formData.get("address");
  const image = formData.get("image");
  const o_country_id = formData.get("o_country_id");
  const o_province_id = formData.get("o_province_id");
  const o_city_id = formData.get("o_city_id");
  const d_country_id = formData.get("d_country_id");
  const d_province_id = formData.get("d_province_id");
  const d_city_id = formData.get("d_city_id");
  const path_type = formData.get("path_type");
  const send_date = formData.get("send_date");
  const weight = formData.get("weight");
  const amount = formData.get("amount");

  try {
    const res = await postFetchAuth<PassengerService>(
      apiUrls.projects.profile,
      {
        title,
        description,
        address,
        image,
        o_country_id,
        o_province_id,
        o_city_id,
        d_country_id,
        d_province_id,
        d_city_id,
        path_type,
        send_date,
        weight,
        amount,
        type: "passenger",
      }
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در ثبت آگهی`);
  }
};
