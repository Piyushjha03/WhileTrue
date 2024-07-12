import { Link, NavLink } from "react-router-dom";
import {
  Home,
  Settings,
  ShoppingCart,
  LibraryBig,
  UserRound,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Aside = () => {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-6 px-2 sm:py-4 mt-2">
        <Link
          to="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <img
            src="/favicon.png"
            alt="WhileTrue"
            className="h-5 w-5 transition-all group-hover:scale-110"
          />
          {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
          <span className="sr-only">WhileTrue</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/dashboard"
              className=" flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 "
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Dashboard</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Dashboard</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/allcourses"
              className=" flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 "
            >
              <LibraryBig className="h-5 w-5" />
              <span className="sr-only">Courses</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Courses</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/cart"
              className=" flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 "
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Cart</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              to="/profile"
              className=" flex h-9 w-9 items-center justify-center rounded-lg  text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 "
            >
              <UserRound className="h-5 w-5" />
              <span className="sr-only">Customers</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <NavLink
              href="#"
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <Settings className="h-5 w-5" />
              <span className="sr-only">Settings</span>
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Aside;
