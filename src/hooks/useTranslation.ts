import { useTranslations } from "next-intl";

export function useCommonTranslation() {
  return useTranslations("common");
}

export function usePagesTranslation() {
  return useTranslations("pages");
}

export function useT(namespace: string) {
  return useTranslations(namespace);
}
