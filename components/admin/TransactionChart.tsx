"use client";

import { AreaChart } from "@tremor/react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { TransactionType } from "@prisma/client";

import { cn } from "@/lib/utils";

type TransactionChartProps = {
  transaction: {
    id: string;
    userId: string;
    categoryName: string;
    categoryId: string | null;
    userCategoryId: string | null;
    type: TransactionType;
    title: string;
    amount: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
  }[];
  className?: string;
};

export const TransactionChart = ({
  transaction,
  className,
}: TransactionChartProps) => {
  const groupedTransactions: {
    [key: string]: { Income: number; Expense: number };
  } = {};

  transaction.forEach((item) => {
    const dateKey = item.date.toLocaleDateString("en-PE", {
      month: "long",
      day: "numeric",
    });

    if (!groupedTransactions[dateKey]) {
      groupedTransactions[dateKey] = { Income: 0, Expense: 0 };
    }

    if (item.type === "Income") {
      groupedTransactions[dateKey].Income += item.amount;
    } else if (item.type === "Expense") {
      groupedTransactions[dateKey].Expense += item.amount;
    }
  });

  const chartData = Object.keys(groupedTransactions).map((dateKey) => ({
    date: dateKey,
    ...groupedTransactions[dateKey],
  }));

  chartData.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dataFormatter = (number: number) =>
    `S/${Intl.NumberFormat("pe").format(number).toString()}`;

  return (
    <Card className={cn("w-full p-4 md:w-2/3", className)}>
      <CardTitle>Income vs Expense</CardTitle>
      <CardContent className="p-0">
        <AreaChart
          className="mt-6 h-80"
          data={chartData}
          categories={["Income", "Expense"]}
          valueFormatter={dataFormatter}
          index="date"
          colors={["emerald", "rose"]}
          yAxisWidth={60}
        />
      </CardContent>
    </Card>
  );
};
