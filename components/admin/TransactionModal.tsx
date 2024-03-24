"use client";

import React, { useState } from "react";

import { TransactionForm } from "./TransactionForm";

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

export const TransactionModal = () => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="rounded-full">
            Create new transaction
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">Add a transaction</DialogTitle>
            <DialogDescription>
              Fill in the form below to add a new transaction.
            </DialogDescription>
          </DialogHeader>
          <TransactionForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button size="lg" className="rounded-full">
          Create new transaction
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl">Add a transaction</DrawerTitle>
          <DrawerDescription>
            Fill in the form below to add a new transaction.
          </DrawerDescription>
        </DrawerHeader>
        <TransactionForm />
      </DrawerContent>
    </Drawer>
  );
};
