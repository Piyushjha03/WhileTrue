import { Link } from "react-router-dom";
import { Search } from "lucide-react";
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
import { SignedIn, UserButton, useUser } from "@clerk/clerk-react";

import { useEffect, useState } from "react";
import { getuserinfo } from "@/api";
import Aside from "@/components/aside";
import MobileAside from "@/components/mobileaside";

const AllCourses = () => {
  const { user } = useUser();

  const [course, setCourse] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (user) {
        const { courses } = await getuserinfo(user.id);
        setCourse(courses);
      }
    }
    fetchData();
  }, [user]);

  return (
    <>
      <div className="dashboard-wrapper w-screen h-screen bg-black">
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
              <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                {course.length > 0 && (
                  <>
                    {course.map((course) => (
                      <>
                        <Card>
                          <CardHeader className="pb-2">
                            <CardDescription>Go to</CardDescription>
                            <CardTitle className="text-4xl">
                              <Link to={`/watch/${encodeURI(course._id)}/0`}>
                                {course.title}
                              </Link>
                            </CardTitle>
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
                      </>
                    ))}
                  </>
                )}
              </main>
            </div>
          </div>
        </TooltipProvider>
      </div>
    </>
  );
};

export default AllCourses;
