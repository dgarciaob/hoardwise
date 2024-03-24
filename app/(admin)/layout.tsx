import { MobileSidebar } from "@/components/admin/MobileSidebar";
import Sidebar from "@/components/admin/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Finance - HoardWise",
  description: "Keep track of your expenses and budgets",
};

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <section className="hidden md:flex h-full w-60 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </section>
      <section className="flex md:hidden p-8">
        <MobileSidebar />
      </section>
      <main className="md:pl-60 h-full">{children}</main>
    </div>
  );
};

export default AdminLayout;
