"use server";

import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import { db } from "./db";
import { auth } from "@clerk/nextjs";

type MonthlyBudgetProps = {
  name: string;
  amount: number;
};

export const createMonthlyBudget = async ({
  name,
  amount,
}: MonthlyBudgetProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  // Calculate start and end dates for the current month
  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  // Create the budget with calculated start and end dates
  const budget = await db.budget.create({
    data: {
      userId,
      name,
      amount,
      startDate,
      endDate,
    },
  });

  return budget;
};

// const calculateBudgetProgress = async (budgetId: string) => {
//   // Calculate start and end dates for the current month
//   const currentDate = new Date();
//   const startDate = startOfMonth(currentDate);
//   const endDate = endOfMonth(currentDate);

//   const budget = await db.budget.findUnique({
//     where: { id: budgetId },
//     include: {
//       transactions: {
//         where: {
//           date: {
//             gte: startDate,
//             lte: endDate,
//           },
//         },
//       },
//     },
//   });

//   if (!budget) {
//     return null;
//   }

//   const totalSpent = budget.transactions.reduce(
//     (acc, transaction) => acc + transaction.amount,
//     0
//   );
//   const progress = (totalSpent / budget.amount) * 100;

//   return progress;
// };
