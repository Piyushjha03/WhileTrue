import { SparklesCore } from "@/components/ui/sparkle";
("use client");

export function SparklesPreview() {
  return (
    <div className="h-[40rem] w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1 className="md:text-7xl text-3xl lg:text-9xl font-bold text-center text-white relative z-20 font-primary ">
        <TypewriterEffectSmoothDemo />
      </h1>
      <div className="w-[40rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}

import { TypewriterEffectSmooth } from "@/components/ui/typerwriter";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "While ",
      className: "text-white dark:text-white text-5xl sm:text-7xl",
    },
    {
      text: "True",
      className: "text-white dark:text-white text-5xl sm:text-7xl",
    },
    {
      text: ":",
      className: "text-white dark:text-blue-500 text-5xl sm:text-7xl",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center  ">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

import { ContainerScroll } from "@/components/ui/container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-white">
              Get the best <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-zinc-200">
                Educators
              </span>
            </h1>
          </>
        }
      >
        {/* <img
          src={`https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        /> */}
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/39MArMcq5Oc?si=sNAOPjDZ-54b1ST_"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </ContainerScroll>
    </div>
  );
}

import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";

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

const Landing = () => {
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
        <div className=" landing-content">
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

export default Landing;
