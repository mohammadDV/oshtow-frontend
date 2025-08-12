import { TransactionStatus, TransactionType } from "@/types/transactions.type";
import { getTranslations } from "next-intl/server";
import { getTransactions } from "./_api/getTransactions";
import { TransactionList } from "./_components/transactionList";

interface TransactionsPageProps {
    searchParams: Promise<{
        page?: string;
        status?: TransactionStatus;
        type?: TransactionType;
    }>;
}

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
    const t = await getTranslations("pages");
    const resolvedSearchParams = await searchParams;

    const page = parseInt(resolvedSearchParams?.page || "1");
    const status = resolvedSearchParams?.status;
    const type = resolvedSearchParams?.type;

    const transactionsData = await getTransactions({
        status,
        type,
        page,
        count: 10
    });

    return (
        <div>
            <h1 className="text-title text-xl lg:text-2xl font-medium">
                {t("profile.transactions.title")}
            </h1>
            <TransactionList 
                transactionsData={transactionsData} 
                selectedStatus={status} 
                selectedType={type} 
            />
        </div>
    );
}