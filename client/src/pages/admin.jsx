import { getAllCourses } from "@/api";
import { useEffect, useState } from "react";

import {
  Search,
  MonitorPlay,
  LibraryBigIcon,
  Plus,
  ArrowUpRight,
} from "lucide-react";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCourse } from "@/components/addCourse";
import { Link } from "react-router-dom";

const Admin = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAllCourses();
      setCourse(data);
    }
    fetchData();
  }, []);
  return (
    <>
      <TooltipProvider>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 ">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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

            <main className=" flex flex-1 flex-col md:flex-row items-center md:items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
              <AddCourse />
              <div className="grid grid-cols-1 gap-4 w-[350px] sm:min-w-[350px] sm:w-full">
                {course.length > 0 &&
                  course.map((course, i) => (
                    <Card key={i}>
                      <CardHeader className="pb-2">
                        <CardDescription>
                          <Avatar>
                            <AvatarImage src={course.coverImage} />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                        </CardDescription>
                        <Link to={`/admin/course/${course._id}`}>
                          <CardTitle className="text-xl underline cursor-pointer flex justify-between items-center">
                            {course.title}
                            <ArrowUpRight />
                          </CardTitle>
                        </Link>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="text-xs text-muted-foreground ">
                          {course.chapters.length} Chapters has been uploaded
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="text-xs text-muted-foreground cursor-pointer ml-2">
                          <strong>RS.{course.price}</strong>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default Admin;
