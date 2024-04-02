import { CategoryForm } from "@/components/admin/CategoryForm";
import { Card, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

const CategoriesPage = async () => {
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
      <h1 className="text-2xl lg:text-3xl font-bold mb-12">Categories</h1>
      <h2 className="text-xl lg:text-2xl font-medium">History</h2>

      <div className="flex flex-col space-y-8 mt-4 md:flex md:flex-row md:space-x-8 md:space-y-0">
        <CategoryForm className="w-1/3" />
        <Card className="w-2/3 p-4 overflow-auto">
          <CardTitle>Categories</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-4 overflow-auto h-28">
            {allCategories.map((category) => (
              <div key={category.id}>{category.name}</div>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
};

export default CategoriesPage;
