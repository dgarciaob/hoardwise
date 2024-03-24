"use client";

import {
  ArrowLeftRight,
  LayoutDashboard,
  PieChart,
  PiggyBank,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

const routes = [
  {
    icon: PieChart,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: ArrowLeftRight,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: LayoutDashboard,
    label: "Categories",
    href: "/categories",
  },
  {
    icon: PiggyBank,
    label: "Budgets",
    href: "/budgets",
  },
];

const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return <SidebarItem key={route.href} {...route} />;
      })}
    </div>
  );
};

export default SidebarRoutes;
