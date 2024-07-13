import VideoPlayer from "@/components/videoPlayer";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Bot, Code, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";
import { useEffect, useState, useCallback } from "react";
import {
  getCourseInfo,
  getIsWatched,
  postIsWatched,
  updateIsWatched,
} from "@/api";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CourseTitle from "@/components/coursetitle";
import debounce from "lodash/debounce";

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
      if (data === null) {
        setisWatched([]);
        return;
      }
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

  const handleCheck = async (id) => {
    if (isWatched.includes(id)) {
      setisWatched(isWatched.filter((item) => item !== id));
      await updateIsWatched({ clerkID: user.id, courseID, watched: id });
    } else {
      setisWatched([...isWatched, id]);
      await postIsWatched({ clerkID: user.id, courseID, watched: id });
    }
  };

  return (
    <>
      <div className="dashboard-wrapper w-screen h-screen bg-black">
        <ResizablePanelGroup direction="horizontal">
          <div className="flex min-h-screen w-full bg-muted/40">
            <ResizablePanel defaultSize={25} className={"hidden sm:block"}>
              <aside className="overflow-hidden h-full p-2 inset-y-0 left-0 z-10 hidden flex-col border-r bg-background sm:flex">
                <div className="flex w-full items-center">
                  <Link
                    to="/dashboard"
                    className="m-4 group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                  >
                    <img
                      src="/favicon.webp"
                      alt="WhileTrue"
                      className="h-5 w-5 transition-all group-hover:scale-110"
                    />
                    <span className="sr-only">WhileTrue</span>
                  </Link>
                  <span>WhileTrue</span>
                </div>
                <div className="max-h-[80%] overflow-y-scroll">
                  {courseInfo && (
                    <>
                      {courseInfo.map((course, i) => (
                        <div
                          key={i}
                          className="bg-muted/80 rounded-sm p-2 my-4 w-full flex justify-between items-center"
                        >
                          <span className="block max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">
                            <Link to={`${url}/${i}`}>{course.title}</Link>
                          </span>
                          {isWatched && (
                            <Checkbox
                              onClick={() => handleCheck(courseInfo[i]._id)}
                              checked={isWatched.includes(courseInfo[i]._id)}
                            />
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </aside>
            </ResizablePanel>
            <ResizableHandle withHandle className={"hidden sm:flex"} />
            <ResizablePanel>
              <div className="flex flex-col sm:gap-4 sm:py-4 h-screen overflow-scroll">
                <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                            src="/favicon.webp"
                            alt="WhileTrue"
                            className="h-5 w-5 transition-all group-hover:scale-110"
                          />
                          <span className="sr-only">WhileTrue</span>
                        </Link>
                        <span>WhileTrue</span>
                      </div>
                      <div className="max-h-[80%] overflow-y-scroll">
                        {courseInfo && (
                          <>
                            {courseInfo.map((course, i) => (
                              <div
                                key={i}
                                className="bg-muted/80 rounded-sm p-2 my-4 w-full flex justify-between items-center"
                              >
                                <span className="block max-w-48 whitespace-nowrap overflow-hidden overflow-ellipsis">
                                  <Link to={`${url}/${i}`}>{course.title}</Link>
                                </span>
                                {isWatched && (
                                  <Checkbox
                                    onClick={() =>
                                      handleCheck(courseInfo[i]._id)
                                    }
                                    checked={isWatched.includes(
                                      courseInfo[i]._id
                                    )}
                                  />
                                )}
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>

                  {courseInfo && (
                    <span className="text-sm sm:text-2xl font-medium">
                      L{`${+currI + 1}`} - {courseInfo[currI].title}
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

                  <div className="flex justify-center items-center w-full gap-6 flex-col-reverse sm:flex-row">
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
