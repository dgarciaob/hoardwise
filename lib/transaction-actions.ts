"use server";

import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { TransactionType } from "@prisma/client";

type TransactionProps = {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  category: string;
  budget: string;
};

export const createTransaction = async ({
  title,
  amount,
  type,
  date,
  category,
  budget,
}: TransactionProps) => {
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

  const categoryFromCategory = categories.find((c) => c.id === category);
  const categoryFromUserCategory = userCategories.find(
    (c) => c.id === category
  );

  let categoryId = null;
  let userCategoryId = null;
  let categoryName = "";

  if (categoryFromCategory) {
    categoryId = category;
    categoryName = categoryFromCategory.name;
  } else if (categoryFromUserCategory) {
    userCategoryId = category;
    categoryName = categoryFromUserCategory.name;
  }

  const budgets = await db.budget.findMany({
    where: {
      userId: userDb.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });

  const budgetFromDb = budgets.find((b) => b.id === budget);

  const transaction = await db.transaction.create({
    data: {
      title,
      amount,
      type,
      date,
      userId,
      categoryId,
      userCategoryId,
      categoryName,
      budgetId: budget || null,
      budgetName: budgetFromDb ? budgetFromDb.name : "",
    },
  });

  return transaction;
};

export const deleteTransaction = async (id: string) => {
  await db.transaction.delete({
    where: {
      id: id,
    },
  });
};

export const editTransaction = async (
  id: string,
  { title, amount, type, date }: TransactionProps
) => {
  await db.transaction.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      amount: amount,
      type: type,
      date: date,
    },
  });
};
