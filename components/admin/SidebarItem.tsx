"use client";

import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/dashboard" && href === "/dashboard") ||
    pathname === href ||
    pathname.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "text-indigo-700 bg-indigo-200/20 hover:bg-indigo-200/20 hover:text-indigo-700"
      )}
    >
      <div className="flex items-center gap-x-3 py-4">
        <Icon
          size={20}
          className={cn(
            "text-slate-500 hover:text-slate-600 transition-all",
            isActive && "text-indigo-700"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-indigo-700 h-[52px] transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};

export default SidebarItem;
