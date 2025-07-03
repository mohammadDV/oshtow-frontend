import { persianMonths } from "@/_mock/persianMonths";

export const formatToShamsi = (date: Date): string => {
  try {
    const shamsiDate = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-latn", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).formatToParts(date);

    const day = shamsiDate.find((part) => part.type === "day")?.value;
    const month = shamsiDate.find((part) => part.type === "month")?.value;

    if (day && month) {
      const monthIndex = parseInt(month) - 1;
      const monthName = persianMonths[monthIndex] || month;
      return `${day} ${monthName}`;
    }

    return date.toLocaleDateString("fa-IR");
  } catch (error) {
    return date.toLocaleDateString("fa-IR");
  }
};

export const formatShamsiRange = (from: Date, to?: Date): string => {
  const fromShamsi = formatToShamsi(from);
  if (!to) return fromShamsi;
  const toShamsi = formatToShamsi(to);
  return `${fromShamsi} - ${toShamsi}`;
};

export const formatDateToString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};
