import { UserButton } from "@clerk/nextjs";
import Logo from "../Logo";
import SidebarRoutes from "./SidebarRoutes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="h-full border-r flex flex-col justify-between overflow-y-auto bg-white shadow-sm pb-6">
      <div>
        <div className="flex flex-row space-x-2 p-6">
          <Logo />
          <p className="text-xl font-bold">HoardWise</p>
        </div>
        <div className="flex flex-col w-full">
          <SidebarRoutes />
        </div>
      </div>
      <div className="px-6 flex flex-col space-y-8">
        <UserButton afterSignOutUrl="/" />
        <Card>
          <CardHeader className="p-4">
            <CardTitle>Upgrade to Pro</CardTitle>
            <CardDescription>
              Unlock all features and get unlimited access to our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:pt-0">
            <Button size="sm" className="w-full">
              <Zap className="mr-2" size={16} fill="#FFFFFF" />
              Upgrade
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Sidebar;
