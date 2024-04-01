const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    const users = await database.user.findMany(); // Fetch all users

    for (const user of users) {
      await database.category.createMany({
        data: [
          { name: "Salary", userId: user.id },
          { name: "Home Services", userId: user.id },
          { name: "Mental Health", userId: user.id },
          { name: "House Food", userId: user.id },
          { name: "Subscriptions", userId: user.id },
          { name: "Personal Care", userId: user.id },
          { name: "Transportation ", userId: user.id },
          { name: "Trips ", userId: user.id },
        ],
      });
    }

    console.log("Categories seeded successfully for all users");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
