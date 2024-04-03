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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { createTransaction } from "@/lib/transaction-actions";
import { CategorySelection } from "./CategorySelect";
import { BudgetSelection } from "./BudgetSelect";

type TransactionFormProps = {
  options: { id: string; name: string; userId?: string }[];
  budgetOptions: {
    id: string;
    name: string;
    userId: string;
    amount: number;
    startDate: Date;
    endDate: Date;
  }[];
};

const formSchema = z.object({
  type: z.enum(["Expense", "Income"]),
  title: z.string().min(1, "Title must be at least 1 character"),
  amount: z.coerce.number(),
  date: z.date(),
  category: z.string(),
  budget: z.string().optional(),
});

export const TransactionForm = ({
  options,
  budgetOptions,
}: TransactionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      amount: 0,
      date: new Date(),
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createTransaction({
        ...values,
        budget: values.budget || "",
      });
      toast.success("Transaction created");
      console.log(values);
      router.refresh();
    } catch {
      toast.error("Failed to create transaction");
    }
  };

  return (
    <div className="mt-4 border bg-slate-100 p-4 rounded-lg">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col space-y-8"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Type</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Expense">Expense</SelectItem>
                          <SelectItem value="Income">Income</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                      step="0.10"
                      disabled={isSubmitting}
                      placeholder="Add amount"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="Add title"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Category</FormLabel>
                  <FormControl>
                    <CategorySelection
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      options={options}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel className="text-base">Budget</FormLabel>
                  <FormControl>
                    <BudgetSelection
                      disabled={isSubmitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value || ""}
                      budgetOptions={budgetOptions}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-base">Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() ||
                          date < new Date("1900-01-01") ||
                          isSubmitting
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              );
            }}
          />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
};
