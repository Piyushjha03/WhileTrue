import { Search, MonitorPlay, LibraryBigIcon } from "lucide-react";

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

import { TooltipProvider } from "@/components/ui/tooltip";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import Example from "@/components/pieChart";
import LineChart from "@/components/linechart";
import Aside from "@/components/aside";
import MobileAside from "@/components/mobileaside";

import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Link } from "react-router-dom";

export function DashboardUI() {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <MobileAside />

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
          <div className="p-4 my-5 flex justify-center rounded-lg sm:px-6 sm:py-0 relative h-40 ">
            <NeonGradientCard className="max-w-[600px] items-center justify-center text-left ">
              <span className="p-3 pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-left text-2xl sm:text-3xl font-bold leading-none tracking-tighter text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                30% off on all courses
              </span>
              <img
                src="/bgimg-bg.png"
                className=" w-32 sm:w-48 absolute right-1 bottom-1 rounded-xl "
              />
              <br />
              <Link to="/allcourses">
                <span className="p-3 pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-5xl sm:text-6xl font-bold leading-none tracking-tighter text-transparent drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  Buy Now
                </span>
              </Link>
            </NeonGradientCard>
          </div>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Buy</CardDescription>
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
