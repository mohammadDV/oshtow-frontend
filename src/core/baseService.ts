"use server";

import { API_URL } from "@/configs/global";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: any;
  headers?: Record<string, string>;
  isFormData?: boolean;
}

const baseFetchAuth = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T> => {
  const {
    method = "GET",
    body,
    headers: customHeaders = {},
    isFormData = false,
  } = options;

  const baseHeaders: Record<string, string> = {
    Accept: "application/json",
    ...customHeaders,
  };

  if (!isFormData) {
    baseHeaders["Content-Type"] = "application/json";
  }

  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    baseHeaders["Authorization"] = `Bearer ${decodeURIComponent(token.value)}`;
  }

  const requestBody = body && !isFormData ? JSON.stringify(body) : body;

  const res = await fetch(`${API_URL}${url}`, {
    cache: "no-store",
    method,
    headers: baseHeaders,
    ...(requestBody && { body: requestBody }),
  });

  if (res.status === 401) {
    redirect('/auth/logout');
  }

  return await res.json();
};

const getFetchAuth = async <T = any>(url: string): Promise<T> => {
  const res = await baseFetchAuth<T>(url, {
    method: "GET",
  });

  if (res) {
    return res;
  } else {
    throw new Error(`مشکل در دریافت اطلاعات`);
  }
};

const postFetchAuth = async <T = any>(url: string, body: any): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "POST",
    body,
  });
};

const putFetchAuth = async <T = any>(url: string, body: any): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "PUT",
    body,
  });
};

const patchFetchAuth = async <T = any>(url: string, body: any): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "PATCH",
    body,
  });
};

const deleteFetchAuth = async <T = any>(url: string): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "DELETE",
  });
};

const postFormDataAuth = async <T = any>(
  url: string,
  formData: FormData
): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "POST",
    body: formData,
    isFormData: true,
  });
};

const putFormDataAuth = async <T = any>(
  url: string,
  formData: FormData
): Promise<T> => {
  return baseFetchAuth<T>(url, {
    method: "PUT",
    body: formData,
    isFormData: true,
  });
};

export {
  baseFetchAuth, deleteFetchAuth, getFetchAuth, patchFetchAuth, postFetchAuth, postFormDataAuth, putFetchAuth, putFormDataAuth
};

