const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Salary" },
        { name: "Home Food" },
        { name: "Home Services" },
        { name: "Mental Health" },
        { name: "Transportation" },
        { name: "Freelance" },
        { name: "Trips" },
        { name: "Subscriptions" },
        { name: "Personal Care" },
        { name: "Games" },
        { name: "Shopping" },
        { name: "Food" },
      ],
    });

    console.log("Categories seeded successfully for all users");
  } catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main();
