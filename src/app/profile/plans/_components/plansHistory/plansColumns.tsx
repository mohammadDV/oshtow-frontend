import { ColumnDef } from "@tanstack/react-table";
import { SubscriptionPlan } from "@/types/plan.type";
import { Badge } from "@/ui/badge";
import { useCommonTranslation } from "@/hooks/useTranslation";

export const plansColumns = (): ColumnDef<SubscriptionPlan>[] => {
  const t = useCommonTranslation();

  return [
    {
      accessorKey: "index",
      header: t("columns.row"),
      cell: ({ row }) => row.index + 1,
    },
    {
      accessorKey: "plan.title",
      header: t("columns.planTitle"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.plan.title}</span>
      ),
    },
    {
      accessorKey: "plan.amount",
      header: t("columns.amount"),
      cell: ({ row }) => (
        <span className="font-medium text-success">
          {Number(row.original.plan.amount).toLocaleString()} {t("unit.toman")}
        </span>
      ),
    },
    {
      accessorKey: "active",
      header: t("columns.status"),
      cell: ({ getValue }) => {
        const isActive = getValue() as boolean;
        return (
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? t("status.active") : t("status.inactive")}
          </Badge>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: t("columns.orderDate"),
      cell: ({ getValue }) => {
        const date = new Date(getValue() as string);
        return (
          <span className="text-sm">{date.toLocaleDateString("fa-IR")}</span>
        );
      },
    },
    {
      accessorKey: "ends_at",
      header: t("columns.endsAt"),
      cell: ({ getValue }) => {
        const date = getValue() as string;
        return <span className="text-sm">{date}</span>;
      },
    },
  ];
};
