import { TooltipProvider } from "@/components/ui/tooltip";
import { getCourseInfo } from "@/api";
import { useEffect, useState } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import { SignedIn, UserButton } from "@clerk/clerk-react";

import { useParams } from "react-router-dom";
import { TableDemo } from "@/components/table";
import { AddChapter } from "@/components/addChapter";
import { Separator } from "@/components/ui/separator";

const AdminCourse = () => {
  const [courseInfo, setCourseInfo] = useState();
  const courseID = useParams().id;

  useEffect(() => {
    async function fetchData() {
      const data = await getCourseInfo(courseID);
      setCourseInfo(data);
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
            <Separator className="my-4" />
            <div className="w-full flex justify-center items-center">
              <AddChapter courseID={courseID} />
            </div>
            <Separator className="my-4" />
            <main className=" flex flex-1 flex-col md:flex-row items-center md:items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 ">
              {courseInfo && <TableDemo courseInfo={courseInfo} />}
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  );
};

export default AdminCourse;
