import { Link } from "react-router-dom";
import {
  Home,
  Search,
  Settings,
  ShoppingCart,
  LibraryBig,
  UserRound,
  Menu,
  MonitorPlay,
  LibraryBigIcon,
  Code,
  Bot,
  Command,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Progress } from "@/components/ui/progress";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MobileAside = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            to="/"
            className=" group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base "
          >
            <img
              src="/favicon.webp"
              alt="WhileTrue"
              className="h-5 w-5 transition-all group-hover:scale-110"
            />
            <span className="sr-only">While True</span>
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Home className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/allcourses"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <LibraryBig className="h-5 w-5" />
            Courses
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Shop
          </Link>
          <Link
            to="/playground"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Code className="h-5 w-5" />
            Playground
          </Link>
          <Link
            to="/doubt"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Bot className="h-5 w-5" />
            AI Bot
          </Link>
          <Link
            to="/admin"
            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
          >
            <Command className="h-5 w-5" />
            Admin
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileAside;
