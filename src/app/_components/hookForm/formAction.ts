"use server";

import { apiUrls } from "@/constants/apiUrls";
import { postFormDataAuth } from "@/core/baseService";

export interface UploadResponse {
  status: number;
  message?: string;
  url?: string;
}

export const uploadImageAction = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const res = await postFormDataAuth<UploadResponse>(
      apiUrls.files.image,
      formData
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در آپلود تصویر`);
  }
};

export const uploadVideoAction = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const res = await postFormDataAuth<UploadResponse>(
      apiUrls.files.video,
      formData
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در آپلود ویدیو`);
  }
};

export const uploadFileAction = async (
  formData: FormData
): Promise<UploadResponse> => {
  try {
    const res = await postFormDataAuth<UploadResponse>(
      apiUrls.files.file,
      formData
    );
    return res;
  } catch (error) {
    throw new Error(`مشکل در آپلود فایل`);
  }
};
