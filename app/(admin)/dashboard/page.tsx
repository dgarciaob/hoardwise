import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/admin/DatePicker";
import { HandCoins, PiggyBank, Scale, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransactionChart } from "@/components/admin/TransactionChart";
import { CategoryDonutChart } from "@/components/admin/CategoryDonutChart";
import { ProgressBar } from "@tremor/react";

const DashboardPage = async () => {
  const user = await currentUser();
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userDb = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!userDb) {
    return null;
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: userDb.id,
    },
  });

  const income = await db.transaction.findMany({
    where: {
      userId: userDb.id,
      type: "Income",
    },
  });

  const expense = await db.transaction.findMany({
    where: {
      userId: userDb.id,
      type: "Expense",
    },
  });

  const budgets = await db.budget.findMany({
    where: {
      userId: userDb.id,
    },
  });

  const transactionsWithBudgets = await db.transaction.findMany({
    where: {
      userId: userDb.id,
      budgetId: {
        not: null,
      },
    },
  });

  // Calculating total assigned to each budget
  const budgetTotals = budgets.map((budget) => {
    const transactionsForBudget = transactionsWithBudgets.filter(
      (transaction) => transaction.budgetId === budget.id
    );
    const totalAssigned = transactionsForBudget.reduce(
      (acc, curr) => acc + curr.amount,
      0
    );
    const remaining = budget.amount - totalAssigned;
    return { ...budget, totalAssigned, remaining };
  });

  // Calculating progress for each budget
  const budgetProgress = budgetTotals.map((budget) => {
    const budgetTotal = budget.amount;
    const progress = (budget.totalAssigned / budgetTotal) * 100;
    return { ...budget, progress };
  });

  // order expenses by amount
  const sortedExpense = expense.sort((a, b) => b.amount - a.amount);

  // get the biggest expense
  const biggestExpense = sortedExpense[0];

  // get total income and expense
  const totalIncome = income.reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = expense.reduce((acc, curr) => acc + curr.amount, 0);

  // get balance
  const balance = totalIncome - totalExpense;

  return (
    <main className="p-6">
      <div className="flex flex-col space-y-8 mb-12 md:flex md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl lg:text-3xl font-bold">
          Hi, {user?.firstName} 👋🏼
        </h1>
        <DatePickerWithRange />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Balance</CardTitle>
            <Scale size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ {balance}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <PiggyBank
              size={16}
              className={cn(
                totalIncome ? "text-emerald-600" : "text-muted-foreground"
              )}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalIncome ? `S/ ${totalIncome}` : "No Income"}
            </div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expense</CardTitle>
            <HandCoins
              size={16}
              className={cn(
                totalExpense ? "text-red-600" : "text-muted-foreground"
              )}
            />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpense ? `S/ ${totalExpense}` : "No Expense"}
            </div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Biggest Expense
            </CardTitle>
            <TrendingUp size={16} className="text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalExpense ? `S/ ${biggestExpense?.amount}` : "No Expense"}
            </div>
            <p className="text-xs text-muted-foreground">
              {biggestExpense?.title} - {biggestExpense?.categoryName}
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col space-y-8 md:flex md:flex-row md:space-x-8 md:space-y-0 mt-4">
        <TransactionChart transaction={transactions} />
        <CategoryDonutChart expenses={expense} />
      </div>
      <h2 className="text-2xl font-semibold leading-none tracking-tight mt-6">
        Budgets
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-3 overflow-auto">
        {budgetProgress &&
          budgetProgress.map((budget) => (
            <Card key={budget.id} className="p-4">
              <div className="flex flex-row justify-between items-center">
                <p className="text-base font-medium">{budget.name}</p>
                {budget.remaining > 0 ? (
                  <p className="text-muted-foreground text-xs">
                    S/{budget.remaining} left
                  </p>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    Budget complete
                  </p>
                )}
              </div>
              <ProgressBar
                value={budget.progress}
                color="teal"
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-1">
                S/{budget.totalAssigned} of S/{budget.amount}
              </p>
            </Card>
          ))}
      </div>
    </main>
  );
};

export default DashboardPage;
