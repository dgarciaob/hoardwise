import { auth, currentUser } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/admin/DatePicker";
import { HandCoins, PiggyBank, Scale, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TransactionChart } from "@/components/admin/TransactionChart";
import { CategoryDonutChart } from "@/components/admin/CategoryDonutChart";

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
      <div className="flex flex-col space-y-8 md:flex md:flex-row md:space-x-8 md:space-y-0 md:mt-4">
        <TransactionChart transaction={transactions} />
        <CategoryDonutChart expenses={expense} />
      </div>
    </main>
  );
};

export default DashboardPage;
