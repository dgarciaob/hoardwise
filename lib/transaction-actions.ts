"use server";

import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { TransactionType } from "@prisma/client";

type TransactionProps = {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
  // category: string;
};

export const createTransaction = async ({
  title,
  amount,
  type,
  date,
}: // category,
TransactionProps) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const transaction = await db.transaction.create({
    data: {
      title,
      amount,
      type,
      date,
      userId,
      // categoryName: category,
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
