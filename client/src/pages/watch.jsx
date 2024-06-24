import VideoPlayer from "@/components/videoPlayer";

import { Link, useLocation } from "react-router-dom";
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
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getCourseInfo } from "@/api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const videoJsOptions = {
  controls: true,
  responsive: true,
  fluid: true,
  experimentalSvgIcons: true,
  sources: [
    {
      src: "http://localhost:3000/course/72583452-15ad-42b1-8c8b-a21c6bdcc008/index.m3u8",
      type: "application/x-mpegURL",
    },
  ],
};

export function Watch() {
  const courseID = useLocation().pathname.split("/")[2];
  const [courseInfo, setcourseInfo] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await getCourseInfo(courseID);
      setcourseInfo(data.chapters);
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="dashboard-wrapper w-screen h-screen bg-black">
        <ResizablePanelGroup direction="horizontal">
          <div className="flex min-h-screen w-full  bg-muted/40">
            <ResizablePanel defaultSize={25} className={"hidden sm:block"}>
              <aside className="overflow-hidden h-full p-2 inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex ">
                <div className="flex w-full items-center">
                  <Link
                    to="/dashboard"
                    className="m-4 group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <img
                      src="/favicon.png"
                      alt="WhileTrue"
                      className="h-5 w-5 transition-all group-hover:scale-110"
                    />
                    {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
                    <span className="sr-only">WhileTrue</span>
                  </Link>
                  <span>WhileTrue</span>
                </div>
                <div className="max-h-[80%] overflow-y-scroll">
                  {courseInfo && (
                    <>
                      {courseInfo.map((course, i) => (
                        <>
                          <div
                            key={i}
                            className="bg-muted/80 rounded-sm p-2 my-4 w-full flex justify-between items-center "
                          >
                            <span className="block max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">
                              {course.title}
                            </span>
                            <Checkbox />
                          </div>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </aside>
            </ResizablePanel>
            <ResizableHandle withHandle className={"hidden sm:flex"} />
            <ResizablePanel>
              <div className="flex flex-col sm:gap-4 sm:py-4 ">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="sm:hidden"
                      >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="sm:max-w-xs">
                      <div className="flex w-full items-center">
                        <Link
                          to="/dashboard"
                          className="m-4 group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                          <img
                            src="/favicon.png"
                            alt="WhileTrue"
                            className="h-5 w-5 transition-all group-hover:scale-110"
                          />
                          {/* <Package2 className="h-4 w-4 transition-all group-hover:scale-110" /> */}
                          <span className="sr-only">WhileTrue</span>
                        </Link>
                        <span>WhileTrue</span>
                      </div>
                      <div className="max-h-[80%] overflow-y-scroll">
                        {courseInfo && (
                          <>
                            {courseInfo.map((course, i) => (
                              <>
                                <div
                                  key={i}
                                  className="bg-muted/80 rounded-sm p-2 my-4 w-full flex justify-between items-center "
                                >
                                  <span className="block max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                    {course.title}
                                  </span>
                                  <Checkbox />
                                </div>
                              </>
                            ))}
                          </>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="relative ml-auto flex-1 md:grow-1">
                    <span className="underline text-xl">
                      {courseInfo && courseInfo[0].title}
                    </span>
                  </div>
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
                <main className="grid flex-1 items-start gap-24 p-4 ">
                  <div>
                    <VideoPlayer
                      options={videoJsOptions}
                      onReady={() => console.log("The video is ready to play")}
                    />
                  </div>
                  <div className="flex w-full gap-6 flex-col  sm:flex-row  justify-between ">
                    <Button variant="secondary">Try it yourself!</Button>
                    <Button variant="secondary">Take a quiz</Button>
                    <Button variant="secondary">Ai Doubt assistant</Button>
                  </div>
                </main>
              </div>
            </ResizablePanel>
          </div>
        </ResizablePanelGroup>
      </div>
    </>
  );
}
