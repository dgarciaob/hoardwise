"use client";

import React from "react";

import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { createMonthlyBudget } from "@/lib/budget-actions";

type BudgetFormProps = {
  className?: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Budget name must be at least 1 character"),
  amount: z.coerce.number(),
});

export const BudgetForm = ({ className }: BudgetFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createMonthlyBudget(values);
      toast.success("Budget created successfully");
      router.refresh();
    } catch {
      toast.error("Error creating budget");
    }
  };

  return (
    <div className={cn("border bg-slate-100 p-4 rounded-lg", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Add Budget Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="10"
                      disabled={isSubmitting}
                      placeholder="Add Budget amount"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Create Budget
          </Button>
        </form>
      </Form>
    </div>
  );
};
