import { PinContainer } from "@/components/ui/course-link";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/api";
import Aside from "@/components/aside";
import MobileAside from "@/components/mobileaside";
import { TooltipProvider } from "@/components/ui/tooltip";

export function AnimatedPinDemo(props) {
  return (
    <>
      <div className="h-[30rem]  flex items-center justify-center ">
        <PinContainer title="See details" course={props.course}>
          <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
            <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
              {props.course.title}
            </h3>
            <div className="text-base !m-0 !p-0 font-normal">
              <span className="text-slate-500 ">₹{props.course.price}</span>
            </div>
            <img
              loading="lazy"
              src={props.course.coverImage}
              alt={props.course.title}
              className="flex flex-1 w-full rounded-lg mt-4 object-cover "
            />
          </div>
        </PinContainer>
      </div>
    </>
  );
}

const Cart = () => {
  const [allCourses, setAllCourses] = useState([]);
  useEffect(() => {
    async function fetchapi() {
      const res = await getAllCourses();
      setAllCourses(res);
    }
    fetchapi();
  }, []);
  return (
    <>
      <div className="landing wrapper w-screen h-full p-8">
        <TooltipProvider>
          <Aside />
          <MobileAside />
        </TooltipProvider>
        <div className=" ml-0 sm:ml-8 landing-content">
          <div className="w-full mt-0 sm:mt-11 flex justify-center items-center">
            <h1 className="text-4xl font-semibold text-white text-center">
              Get lifetime access to our
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-zinc-200">
                Courses
              </span>
            </h1>
          </div>
          <div className="w-full grid grid-cols-1 px-0 md:grid-cols-2	">
            {" "}
            {allCourses.length > 0 && (
              <>
                {allCourses.map((course, i) => (
                  <AnimatedPinDemo key={i} course={course} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
