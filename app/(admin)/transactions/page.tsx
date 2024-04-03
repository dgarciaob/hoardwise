import { TransactionModal } from "@/components/admin/TransactionModal";
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { auth } from "@clerk/nextjs";

const TransactionPage = async () => {
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
    orderBy: { createdAt: "desc" },
  });

  const budgets = await db.budget.findMany({
    where: {
      userId: userDb.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  const userCategories = await db.userCategory.findMany({
    where: {
      userId: userDb.id,
    },
    orderBy: {
      name: "asc",
    },
  });

  const allCategories = [...categories, ...userCategories];

  return (
    <main className="p-6">
      <div className="flex flex-col space-y-8 mb-12 md:flex md:flex-row md:justify-between md:items-center md:space-y-0">
        <h1 className="text-2xl lg:text-3xl font-bold">Transactions</h1>
        <TransactionModal options={allCategories} budgetOptions={budgets} />
      </div>
      <div className="mt-8 flex flex-col space-y-4">
        <h2 className="text-xl lg:text-2xl font-medium">History</h2>
        <DataTable
          columns={columns}
          data={transactions}
          className="overflow-auto max-h-96"
        />
      </div>
    </main>
  );
};

export default TransactionPage;
