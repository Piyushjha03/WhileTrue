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
import { SignedIn, UserButton } from "@clerk/clerk-react";
import Example from "@/components/pieChart";
import LineChart from "@/components/linechart";

export function DashboardUI() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-6 px-2 sm:py-4 mt-2">
            <Link
              to="/dashboard"
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
                <Link
                  to="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/allcourses"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LibraryBig className="h-5 w-5" />
                  <span className="sr-only">Courses</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Courses</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/cart"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Cart</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/profile"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <UserRound className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                    to="/dashboard"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <img
                      src="/favicon.png"
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
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <LibraryBig className="h-5 w-5" />
                    Courses
                  </Link>
                  <Link
                    to="/cart"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Cart
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <UserRound className="h-5 w-5" />
                    Profile
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="relative ml-auto flex-1 md:grow-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
              />
            </div>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>

          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Go to</CardDescription>
                <CardTitle className="text-4xl underline cursor-pointer flex justify-between items-center">
                  All Courses
                  <LibraryBigIcon />
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="text-xs text-muted-foreground ">
                  Or Continue From Where You Left Off
                </div>
              </CardContent>
              <CardFooter>
                <MonitorPlay />
                <div className="text-xs text-muted-foreground underline cursor-pointer ml-2">
                  <strong>Next.js</strong> .L32
                </div>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">12 hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">26 hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  -12% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={15} aria-label="25% increase" />
              </CardFooter>
            </Card>
          </main>
          <div className="charts w-full h-64">
            <Example />
            <LineChart />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

const Dashboard = () => {
  return (
    <>
      <div className="dashboard-wrapper w-screen h-screen bg-black">
        <DashboardUI />
      </div>
    </>
  );
};

export default Dashboard;
