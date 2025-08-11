import { apiUrls } from "@/constants/apiUrls";
import { getFetchAuth } from "@/core/baseService";
import { TransactionsResponse, TransactionStatus, TransactionType } from "@/types/transactions.type";

interface GetTransactionsParams {
  page?: number;
  count?: number;
  status?: TransactionStatus;
  type?: TransactionType;
}

export const getTransactions = async ({
  page = 1,
  count = 10,
  status,
  type,
}: GetTransactionsParams = {}): Promise<TransactionsResponse> => {
  const searchParams = new URLSearchParams();

  searchParams.append("page", page.toString());
  searchParams.append("count", count.toString());

  if (status) {
    searchParams.append("status", status);
  }

  if (type) {
    searchParams.append("type", type);
  }

  const url = `${apiUrls.payment.transactions}?${searchParams.toString()}`;

  return getFetchAuth(url);
};