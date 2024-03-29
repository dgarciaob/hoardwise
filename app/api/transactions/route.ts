import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { type, title, amount, date } = body;

    if (!type || !title || !amount || !date) {
      return new NextResponse("Bad Request", { status: 400 });
    }

    // const transaction = await db.transaction.create({
    //   data: {
    //     type,
    //     title,
    //     amount,
    //     date,
    //     userId,
    //   },
    // });

    // return NextResponse.json(transaction);
  } catch (error) {
    console.log("TRANSACTIONS", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
