import { ColumnDef } from "@tanstack/react-table";
import { WithdrawRequest } from "@/types/wallet.type";
import { Badge } from "@/ui/badge";
import { useCommonTranslation } from "@/hooks/useTranslation";

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'completed':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'reject':
            return 'destructive';
        default:
            return 'outline';
    }
};

export const withdrawRequestsColumns = (): ColumnDef<WithdrawRequest>[] => {
    const t = useCommonTranslation();

    const getStatusLabel = (status: string) => {
        const statusLabels = {
            pending: t("withdrawStatus.pending"),
            completed: t("withdrawStatus.completed"),
            reject: t("withdrawStatus.reject")
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
            accessorKey: "amount",
            header: t("columns.amount"),
            cell: ({ getValue }) => {
                const amount = getValue() as string;
                return (
                    <span className="font-medium text-destructive">
                        {Number(amount).toLocaleString()} {t("unit.toman")}
                    </span>
                );
            },
        },
        // {
        //     accessorKey: "card",
        //     header: t("columns.cardNumber"),
        //     cell: ({ getValue }) => (
        //         <span className="font-normal text-sm">{getValue() as string}</span>
        //     ),
        // },
        // {
        //     accessorKey: "sheba",
        //     header: t("columns.shebaNumber"),
        //     cell: ({ getValue }) => (
        //         <span className="font-normal text-sm">{getValue() as string}</span>
        //     ),
        // },
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
            header: t("columns.description"),
            cell: ({ getValue }) => (
                <span className="text-sm text-caption">{getValue() as string}</span>
            ),
        },
        {
            accessorKey: "reason",
            header: t("columns.reason"),
            cell: ({ getValue }) => {
                const reason = getValue() as string;
                return reason ? (
                    <span className="text-sm text-destructive">{reason}</span>
                ) : (
                    <span className="text-sm text-caption">-</span>
                );
            },
        },
    ];
};