import { ColumnDef } from "@tanstack/react-table";
import { WalletTransaction } from "@/types/wallet.type";
import { Badge } from "@/ui/badge";
import { cn } from "@/lib/utils";
import { useCommonTranslation } from "@/hooks/useTranslation";

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'completed':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'failed':
            return 'destructive';
        default:
            return 'outline';
    }
};

export const transactionsColumns = (): ColumnDef<WalletTransaction>[] => {
    const t = useCommonTranslation();

    const getTypeLabel = (type: string) => {
        const typeLabels = {
            deposit: t("transactionTypes.deposit"),
            withdrawal: t("transactionTypes.withdrawal"),
            refund: t("transactionTypes.refund"),
            transfer: t("transactionTypes.transfer"),
            purchase: t("transactionTypes.purchase")
        };
        return typeLabels[type as keyof typeof typeLabels] || type;
    };

    const getStatusLabel = (status: string) => {
        const statusLabels = {
            pending: t("transactionStatus.pending"),
            completed: t("transactionStatus.completed"),
            failed: t("transactionStatus.failed")
        };
        return statusLabels[status as keyof typeof statusLabels] || status;
    };

    return [
        {
            accessorKey: "index",
            header: t("columns.row"),
            cell: ({ row }) => row.index + 1,
        },
        {
            accessorKey: "reference",
            header: t("columns.trackingNumber"),
            cell: ({ getValue }) => (
                <span className="font-normal text-sm">{getValue() as string}</span>
            ),
        },
        {
            accessorKey: "type",
            header: t("columns.transactionType"),
            cell: ({ getValue }) => {
                const type = getValue() as string;
                return (
                    <span className="font-medium">
                        {getTypeLabel(type)}
                    </span>
                );
            },
        },
        {
            accessorKey: "amount",
            header: t("columns.amount"),
            cell: ({ getValue, row }) => {
                const amount = getValue() as string;
                const type = row.original.type;
                const isNegative = type === 'withdrawal' || type === 'purchase';
                return (
                    <span className={cn(
                        "font-medium",
                        isNegative ? "text-destructive" : "text-success"
                    )}>
                        {Number(amount).toLocaleString()} {t("unit.toman")}
                    </span>
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
            accessorKey: "created_at",
            header: t("columns.date"),
            cell: ({ getValue }) => {
                const date = new Date(getValue() as string);
                return (
                    <span className="text-sm">
                        {date.toLocaleDateString('fa-IR')}
                    </span>
                );
            },
        },
        {
            accessorKey: "description",
            header: t("columns.transactionType"),
            cell: ({ getValue }) => (
                <span className="text-sm text-caption">{getValue() as string}</span>
            ),
        },
    ];
};