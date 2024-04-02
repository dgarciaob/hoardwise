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

import { createCategory } from "@/lib/category-actions";

type CategoryFormProps = {
  className?: string;
};

const formSchema = z.object({
  name: z.string().min(1, "Category name must be at least 1 character"),
});

export const CategoryForm = ({ className }: CategoryFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      createCategory(values.name);
      toast.success("Category created successfully");
      router.refresh();
    } catch {
      toast.error("Error creating category");
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
                      placeholder="Add Category Name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Create Category
          </Button>
        </form>
      </Form>
    </div>
  );
};
