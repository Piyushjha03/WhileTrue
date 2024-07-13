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
        <iframe
          loading="lazy"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/Tn6-PIqc4UM?si=ohG_fN2EwPgWyWR3"
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

export function BentoGridDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? "md:col-span-2" : ""}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const items = [
  {
    title: "ShopEase Terminal",
    description:
      "Developed a seamless shopping experience using terminal commands.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/13119184/file/original-349c2f985ce3fc7411114778aa13fa44.png?resize=1200x900"
        alt="ShopEase Terminal"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Artify Gallery",
    description:
      "Created a virtual platform for exploring and purchasing artwork from various artists.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/2441799/file/original-e9e071ef0d40aa18bfa9ddf7ab2a2c02.png?resize=1200x900"
        alt="Artify Gallery"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "TuneExplorer",
    description:
      "Built an app for discovering new music from independent artists and bands across genres.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/3893923/file/original-7f0e80490df39e23da54c251f4dfea46.png?resize=1200x900"
        alt="TuneExplorer"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "CampusNavigator",
    description:
      "Designed an interactive virtual tour for universities, allowing prospective students to explore campus facilities remotely.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/14143096/file/original-269841bb7faa228dde6f7b405c2c0756.png?resize=2200x1000"
        alt="CampusNavigator"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "KnowledgeQuest",
    description:
      "Crafted an engaging platform for users to join the quest for understanding and enlightenment.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/3508703/file/original-840a23029ecd774bcc54dddb8722244d.png?resize=1200x900"
        alt="KnowledgeQuest"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "MindMapp",
    description:
      "Developed tools and applications to help users experience the thrill of bringing ideas to life.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/14551843/file/original-ac404d1974063fabcccc3e88300e5788.png?resize=2900x1436"
        alt="MindMapp"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "AdventureSpire",
    description:
      "Created applications that allow users to embark on exciting journeys and thrilling discoveries.",
    header: (
      <img
        loading="lazy"
        src="https://cdn.dribbble.com/userupload/12922948/file/original-8c10bc335a811ce28100c75eb07f054f.jpg?resize=2000x800"
        alt="KnowledgeQuest"
        className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"
      />
    ),
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

export const users = [
  {
    name: "Manu Arora",
    designation: "Founder, Algochurn",
    image: "https://picsum.photos/id/10/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Singh",
    designation: "Founder, Sarah's Kitchen",
    image: "https://picsum.photos/id/11/300/300",
    badge: "Mentor",
  },
  {
    name: "John Doe",
    designation: "Software Engineer, Tech Corp",
    image: "https://picsum.photos/id/12/300/300",
    badge: "Mentor",
  },
  {
    name: "Jane Smith",
    designation: "Product Manager, Innovate Inc",
    image: "https://picsum.photos/id/13/300/300",
    badge: "Mentor",
  },
  {
    name: "Robert Johnson",
    designation: "Data Scientist, DataWorks",
    image: "https://picsum.photos/id/14/300/300",
    badge: "Mentor",
  },
  {
    name: "Emily Davis",
    designation: "UX Designer, DesignHub",
    image: "https://picsum.photos/id/15/300/300",
    badge: "Mentor",
  },
  {
    name: "Michael Miller",
    designation: "CTO, FutureTech",
    image: "https://picsum.photos/id/16/300/300",
    badge: "Mentor",
  },
  {
    name: "Sarah Brown",
    designation: "CEO, StartUp",
    image: "https://picsum.photos/id/17/300/300",
  },
  {
    name: "James Wilson",
    designation: "DevOps Engineer, CloudNet",
    image: "https://picsum.photos/id/18/300/300",
    badge: "Something",
  },
  {
    name: "Patricia Moore",
    designation: "Marketing Manager, MarketGrowth",
    image: "https://picsum.photos/id/19/300/300",
    badge: "Mentor",
  },
  {
    name: "Richard Taylor",
    designation: "Frontend Developer, WebSolutions",
    image: "https://picsum.photos/id/20/300/300",
  },
  {
    name: "Linda Anderson",
    designation: "Backend Developer, ServerSecure",
    image: "https://picsum.photos/id/21/300/300",
  },
  {
    name: "William Thomas",
    designation: "Full Stack Developer, FullStack",
    image: "https://picsum.photos/id/22/300/300",
    badge: "Badger",
  },
  {
    name: "Elizabeth Jackson",
    designation: "Project Manager, ProManage",
    image: "https://picsum.photos/id/23/300/300",
    badge: "Mentor",
  },
  {
    name: "David White",
    designation: "Database Administrator, DataSafe",
    image: "https://picsum.photos/id/24/300/300",
    badge: "Advocate",
  },
  {
    name: "Jennifer Harris",
    designation: "Network Engineer, NetConnect",
    image: "https://picsum.photos/id/25/300/300",
  },
  {
    name: "Charles Clark",
    designation: "Security Analyst, SecureIT",
    image: "https://picsum.photos/id/26/300/300",
  },
  {
    name: "Susan Lewis",
    designation: "Systems Analyst, SysAnalyse",
    image: "https://picsum.photos/id/27/300/300",
  },
  {
    name: "Joseph Young",
    designation: "Mobile Developer, AppDev",
    image: "https://picsum.photos/id/28/300/300",
    badge: "Mentor",
  },
  {
    name: "Margaret Hall",
    designation: "Quality Assurance, BugFree",
    image: "https://picsum.photos/id/29/300/300",
    badge: "Developer",
  },
];

import { PinContainer } from "@/components/ui/course-link";
import { useEffect, useState } from "react";
import { getAllCourses } from "@/api";

export function AnimatedPinDemo(props) {
  return (
    <div className="h-[30rem] flex items-center justify-center ">
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
      <div className="landing wrapper w-screen h-full bg-black">
        <div className="landing-content">
          <SparklesPreview />
          <HeroScrollDemo />
          <div className="w-full mb-4 flex justify-center items-center">
            <h1 className="text-4xl font-semibold text-white text-center">
              See What others have
              <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none text-zinc-200">
                Build
              </span>
            </h1>
          </div>

          <BentoGridDemo />
          <div className="w-full mt-60 flex justify-center items-center">
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
