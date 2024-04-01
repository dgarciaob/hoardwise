import { currentUser } from "@clerk/nextjs";

const DashboardPage = async () => {
  const user = await currentUser();
  return (
    <main className="p-6">
      <h1 className="text-2xl lg:text-3xl font-bold mb-12">
        Hi, {user?.firstName} 👋🏼
      </h1>
    </main>
  );
};

export default DashboardPage;
