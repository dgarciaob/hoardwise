"use client";

import { Transaction } from "@prisma/client";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteTransaction } from "@/lib/transaction-actions";

interface ActionCellProps {
  row: Row<Transaction>;
}

const ActionCell: React.FC<ActionCellProps> = ({ row }) => {
  const payment = row.original;
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await deleteTransaction(payment.id);
            toast.success("Transaction deleted");
            router.refresh();
          }}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type: string = row.getValue("type");
      return (
        <Badge variant={type === "Expense" ? "destructive" : "success"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    cell: ({ row }) => {
      const category = row.getValue("categoryName") as string;
      return <div>{category}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const formatted = new Intl.DateTimeFormat("en-PE", {
        dateStyle: "short",
      }).format(date);

      return <div>{formatted}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const type: string = row.getValue("type");
      const formatted = new Intl.NumberFormat("en-PE", {}).format(amount);

      return (
        <div className="text-right font-medium">
          {type === "Expense" ? "-S/" : "S/"}
          {formatted}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionCell,
  },
];
