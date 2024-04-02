"use server";

import { auth } from "@clerk/nextjs";
import { db } from "./db";

export const createCategory = async (name: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userCategory = await db.userCategory.create({
    data: {
      name: name,
      userId: userId,
    },
  });

  return userCategory;
};

export const deleteCategory = async (id: string) => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userCategory = await db.userCategory.delete({
    where: {
      id: id,
    },
  });

  return userCategory;
};
