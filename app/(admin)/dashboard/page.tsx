import { currentUser } from "@clerk/nextjs";

const DashboardPage = async () => {
  const user = await currentUser();
  return <main>This is the Dashboard. {user?.firstName}</main>;
};

export default DashboardPage;
