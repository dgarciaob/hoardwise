import { BudgetForm } from "@/components/admin/BudgetForm";
import { Card, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs";

import { startOfMonth, endOfMonth, addMonths } from "date-fns";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const BudgetsPage = async () => {
  const user = await currentUser();

  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!dbUser) {
    return null;
  }

  const currentDate = new Date();
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);

  const budgets = await db.budget.findMany({
    where: {
      userId: dbUser.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  return (
    <main className="p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-12">
        {user?.firstName}&apos;s Budgets
      </h1>

      <div className="flex flex-col space-y-8 mt-4 md:flex md:flex-row md:space-x-8 md:space-y-0">
        <Card className="md:w-2/3 w-full p-4 overflow-auto max-h-72">
          <div>
            {budgets && (
              <DataTable
                columns={columns}
                data={budgets}
                className="overflow-auto max-h-72"
              />
            )}
          </div>
        </Card>
        <BudgetForm className="md:w-1/3 w-full" />
      </div>
    </main>
  );
};

export default BudgetsPage;
