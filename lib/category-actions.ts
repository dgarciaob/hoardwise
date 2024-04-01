// "use server";

// import { auth } from "@clerk/nextjs";
// import { db } from "./db";

// export const createCategory = async (name: string) => {
//   const { userId } = auth();

//   if (!userId) {
//     return null;
//   }

//   const category = await db.category.create({
//     data: {
//       name,
//       userId,
//     },
//   });

//   return category;
// };
