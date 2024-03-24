"use client";

import React, { useState } from "react";

import { TransactionForm } from "@/components/admin/TransactionForm";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useMediaQuery } from "usehooks-ts";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const TransactionId = async ({
  params,
}: {
  params: { transactionId: number };
}) => {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const transaction = await db.transaction.findUnique({
    where: {
      id: params.transactionId,
    },
  });

  console.log(transaction);

  return <div></div>;
};
