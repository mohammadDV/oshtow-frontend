import { ColumnDef } from "@tanstack/react-table";
import { Ticket } from "@/types/support.type";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { useCommonTranslation } from "@/hooks/useTranslation";
import Link from "next/link";
import { Icon } from "@/ui/icon";

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'active':
            return 'default';
        default:
            return 'outline';
    }
};

export const ticketsColumns = (): ColumnDef<Ticket>[] => {
    const t = useCommonTranslation();

    const getStatusLabel = (status: string) => {
        const statusLabels = {
            active: t("ticketStatus.active")
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
            accessorKey: "message",
            header: t("columns.message"),
            cell: () => (
                <span className="font-normal text-sm">پیام پشتیبانی</span>
            ),
        },
        {
            accessorKey: "subject",
            header: t("columns.subject"),
            cell: ({ row }) => {
                const subject = row.original.subject;
                return (
                    <span className="font-medium">
                        {subject?.title || "-"}
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
            accessorKey: "operation",
            header: t("columns.operation"),
            cell: ({ row }) => (
                <Link
                    href={`/profile/support/${row.id}`}
                    className="flex items-center gap-2 text-primary"
                >
                    <Icon icon="solar--eye-outline" sizeClass="size-5" />
                    {t("buttons.watch")}
                </Link>
            ),
        },
    ];
};