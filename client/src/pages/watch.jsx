import VideoPlayer from "@/components/videoPlayer";

import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Bot, Code, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { getCourseInfo, getIsWatched } from "@/api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CourseTitle from "@/components/coursetitle";
import Aside from "@/components/aside";
import MobileAside from "@/components/mobileaside";

export function Watch() {
  const { user } = useUser();
  const courseID = useLocation().pathname.split("/")[2];
  const [courseInfo, setcourseInfo] = useState(undefined);
  const [isWatched, setisWatched] = useState(undefined);

  const [videoJsOptions, setVideoJsOptions] = useState(undefined);

  const currI = useLocation().pathname.split("/")[3];

  const url = useLocation().pathname.slice(0, -2);

  useEffect(() => {
    async function fetchData() {
      const data = await getCourseInfo(courseID);
      setcourseInfo(data.chapters);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;

    async function check() {
      const data = await getIsWatched({ courseID, clerkID: user.id });
      setisWatched(data.watched);
    }
    check();
  }, [user]);

  useEffect(() => {
    if (!courseInfo) return;

    setVideoJsOptions(() => {
      return {
        controls: true,
        responsive: true,
        fluid: true,
        experimentalSvgIcons: true,
        userActions: { hotkeys: true },
        controlBar: {
          skipButtons: {
            backward: 5,
            forward: 5,
          },
        },
        playbackRates: [0.5, 1, 1.5, 2],
        enableSmoothSeeking: true,
        sources: [
          {
            src:
              "https://d23kd7w596xmq4.cloudfront.net/" +
              courseInfo[currI].videoLink,
            type: "application/x-mpegURL",
          },
        ],
      };
    });
  }, [courseInfo, url, currI]);

  console.log("====================================");
  console.log(isWatched);
  console.log("====================================");

  return (
    <>
      <div className="dashboard-wrapper w-screen h-screen bg-black">
        <ResizablePanelGroup direction="horizontal">
          <div className="flex min-h-screen w-full  bg-muted/40">
            <ResizablePanel defaultSize={25} className={"hidden sm:block"}>
              <Aside />
            </ResizablePanel>
            <ResizableHandle withHandle className={"hidden sm:flex"} />
            <ResizablePanel>
              <div className="flex flex-col sm:gap-4 sm:py-4 ">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                  <MobileAside />

                  {courseInfo && (
                    <span className=" text-sm sm:text-2xl font-medium">
                      L{`${+currI + 1}`}
                      {` - ${courseInfo[currI].title}`}
                    </span>
                  )}
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </header>
                <main className="grid flex-1 items-start gap-24 p-4">
                  <div>
                    {videoJsOptions && (
                      <VideoPlayer
                        options={videoJsOptions}
                        onReady={() =>
                          console.log("The video is ready to play")
                        }
                      />
                    )}
                  </div>

                  <div className="flex justify-center items-center w-full gap-6 flex-col-reverse  sm:flex-row  ">
                    <Link to="/playground">
                      <Button variant="secondary">
                        Try it yourself!
                        <Code className="mx-2" />
                      </Button>
                    </Link>
                    <Link
                      to={`/doubt?cid=${courseInfo && courseInfo[currI]._id}`}
                    >
                      <Button variant="secondary">
                        Ai Doubt assistant
                        <Bot className="mx-2" />
                      </Button>
                    </Link>
                    {courseInfo && (
                      <Link to={`${url}/${(+currI + 1) % courseInfo.length}`}>
                        <Button variant="secondary" className="max-w-fit">
                          Next Video
                          <ArrowRight className="mx-2" />
                        </Button>
                      </Link>
                    )}
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
