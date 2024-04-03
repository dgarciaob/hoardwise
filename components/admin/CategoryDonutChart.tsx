"use client";

import { DonutChart, Legend } from "@tremor/react";
import { Card, CardContent, CardTitle } from "../ui/card";

import { cn } from "@/lib/utils";
import { TransactionType } from "@prisma/client";

type CategoryDonutChartProps = {
  className?: string;
  expenses: {
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
};

const colorList = [
  "blue",
  "cyan",
  "indigo",
  "violet",
  "fuchsia",
  "pink",
  "red",
  "orange",
  "yellow",
  "green",
  "sky",
  "purple",
  "lime",
  "teal",
  "amber",
];

export function CategoryDonutChart({
  className,
  expenses,
}: CategoryDonutChartProps) {
  const groupedExpenses: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    if (!groupedExpenses[expense.categoryName]) {
      groupedExpenses[expense.categoryName] = 0;
    }

    groupedExpenses[expense.categoryName] += expense.amount;
  });

  const expensesByCategory = Object.keys(groupedExpenses).map(
    (categoryName) => ({
      name: categoryName,
      amount: groupedExpenses[categoryName],
    })
  );

  const sortedCategories = [...expensesByCategory].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const colors = sortedCategories.map(
    (_, index) => colorList[index % colorList.length]
  );

  const dataFormatter = (number: number) =>
    `S/${Intl.NumberFormat("pe").format(number).toString()}`;

  return (
    <Card className={cn("w-full p-4 md:w-1/3", className)}>
      <CardTitle>Expenses by Category</CardTitle>
      <CardContent className="flex flex-col items-center justify-center h-full md:p-0">
        <DonutChart
          className="mt-8 md:mt-0"
          data={expensesByCategory}
          category="amount"
          index="name"
          valueFormatter={dataFormatter}
          colors={colors}
        />
        <div className="flex justify-center items-center">
          <Legend
            categories={expensesByCategory.map((category) => category.name)}
            colors={colors}
            className="mt-6 items-center justify-center"
          />
        </div>
      </CardContent>
    </Card>
  );
}
