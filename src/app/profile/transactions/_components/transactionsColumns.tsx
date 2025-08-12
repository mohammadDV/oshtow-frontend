import { useCommonTranslation } from "@/hooks/useTranslation";
import { Transaction } from "@/types/transactions.type";
import { Badge } from "@/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

const getStatusVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "outline";
    case "failed":
    case "cancelled":
      return "destructive";
    default:
      return "outline";
  }
};

const getTypeVariant = (type: string) => {
  switch (type) {
    case "wallet":
      return "default";
    case "plan":
      return "secondary";
    case "identity":
      return "outline";
    case "secure":
      return "destructive";
    default:
      return "outline";
  }
};

export const transactionsColumns = (): ColumnDef<Transaction>[] => {
  const t = useCommonTranslation();

  const getStatusLabel = (status: string) => {
    const statusLabels = {
      pending: t("transactionStatus.pending"),
      completed: t("transactionStatus.completed"),
      cancelled: t("transactionStatus.cancelled"),
      failed: t("transactionStatus.failed"),
    };
    return statusLabels[status as keyof typeof statusLabels] || status;
  };

  const getTypeLabel = (type: string) => {
    const typeLabels = {
      wallet: t("transactionType.wallet"),
      plan: t("transactionType.plan"),
      identity: t("transactionType.identity"),
      secure: t("transactionType.secure"),
    };
    return typeLabels[type as keyof typeof typeLabels] || type;
  };

  return [
    {
      accessorKey: "index",
      header: t("columns.row"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "amount",
      header: t("columns.amount"),
      cell: ({ getValue }) => {
        const amount = getValue() as number;
        return (
          <span className="font-medium">
            {amount.toLocaleString("fa-IR")} {t("unit.toman")}
          </span>
        );
      },
    },
    {
      accessorKey: "type",
      header: t("columns.type"),
      cell: ({ getValue }) => {
        const type = getValue() as string;
        return (
          <Badge variant={getTypeVariant(type)}>
            {getTypeLabel(type)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "status",
      header: t("columns.status"),
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge variant={getStatusVariant(status)}>
            {getStatusLabel(status)}
          </Badge>
        );
      },
    },
    {
      accessorKey: "bank_transaction_id",
      header: t("columns.transactionId"),
      cell: ({ getValue }) => {
        const id = getValue() as string;
        return (
          <span className="font-mono text-sm">
            {id || "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "message",
      header: t("columns.message"),
      cell: ({ getValue }) => {
        const message = getValue() as string;
        return (
          <span className="text-sm line-clamp-1 max-w-52">
            {message || "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: t("columns.date"),
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return (
          <span className="text-sm">{date}</span>
        );
      },
    },
  ];
};