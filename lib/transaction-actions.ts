"use server";

import { auth } from "@clerk/nextjs";
import { db } from "./db";
import { TransactionType } from "@prisma/client";

type TransactionProps = {
  title: string;
  amount: number;
  type: TransactionType;
  date: Date;
};

export const createTransaction = async ({
  title,
  amount,
  type,
  date,
}: TransactionProps) => {
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
    },
  });
  return transaction;
};
