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
    title: "Terminal Based E-commerce",
    description: "Buy Stuff using terminal commands",
    header: <Skeleton />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Virtual Art Gallery",
    description:
      "Explore and purchase artwork from emerging and established artists.",
    header: <Skeleton />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Music Discovery",
    description:
      "Explore new music from independent artists and bands across different genres.",
    header: <Skeleton />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Virtual Campus Tour",
    description:
      "Experience for universities and colleges, allowing prospective students to explore campus facilities, dormitories, classrooms, and recreational areas from the comfort of their own homes.",
    header: <Skeleton />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Pursuit of Knowledge",
    description: "Join the quest for understanding and enlightenment.",
    header: <Skeleton />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Joy of Creation",
    description: "Experience the thrill of bringing ideas to life.",
    header: <Skeleton />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "The Spirit of Adventure",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <Skeleton />,
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

export function AnimatedPinDemo() {
  return (
    <div className="h-[30rem] flex items-center justify-center ">
      <PinContainer title="/wt.courses/next.js" href="/courseinfo">
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Next.js : full stack
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">$399</span>
          </div>
          <img
            src="https://media.licdn.com/dms/image/D4D12AQHSAGB9SeqS0w/article-cover_image-shrink_720_1280/0/1687040213111?e=2147483647&v=beta&t=a2mca5HZCKdpLXUpqyQThElHrI6j-nYSog4D-DcGyRo"
            alt="nextjs"
            className="flex flex-1 w-full rounded-lg mt-4 object-cover "
          />
        </div>
      </PinContainer>
    </div>
  );
}

const Landing = () => {
  return (
    <>
      <div className="landing wrapper w-screen h-full bg-black">
        <div className="landing-content">
          <SparklesPreview />
          <HeroScrollDemo />
          <BentoGridDemo />
          <div className="grid grid-cols-1 sm:grid-cols-2	">
            {" "}
            <AnimatedPinDemo />
            <AnimatedPinDemo />
            <AnimatedPinDemo />
            <AnimatedPinDemo />
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;

// cal.com(will do later)
{
  /* <div className="h-screen w-screen bg-[var(--bg-color)] px-12">
        <header className="sticky top-0 z-50 p-6 bg-inherit">
          <div className="header-content flex items-center justify-between">
            <div className="title">
              <p className="text-primary-700 font-[600] text-3xl tracking-wide font-hand ">
                WhileTrue:
              </p>
            </div>
            <div className="login-btn ">
              <button className="bg-[var(--bg-color-dark)] font-primary tracking-wide rounded-3xl h-[54px] items-center justify-center px-8 py-4 font-semibold uppercase leading-none  transition-all duration-[250ms] ease-in-out hover:rounded-xl text-white ">
                Login
              </button>
            </div>
          </div>
        </header>
        <div className="hero-content p-6">
          <div className="hero-intro-part flex flex-col relative">
            <div className="flex items-center justify-between flex-col md:flex-row">
              <div className="hero-intro-text flex flex-col">
                <pre className="text-3xl font-primary font-normal tracking-wider">
                  While(True):{"\n  "} Keep learning
                </pre>
              </div>
              <div className="hero-intro-image h-[40%] w-[40%] ">
                <img
                  src="/3dLaptop.png"
                  alt="3dLaptop"
                  className="h-full w-full object-cover"
                />
                <div className="tagline-text absolute -bottom-12 left-0 ">
                  <pre>
                    <span
                      className="font-cal leading-[100%]  text-[40px] tracking-[-0.002em] md:text-[75px] lg:text-[79px] xl:text-[114px] text-shadow-gray  display: inline-block; vertical-align: top; text-decoration: inherit; text-wrap: balance;"
                      style={{ textShadow: " 2px 2px gray" }}
                    >
                      Become{"\n"}the top 1%{" "}
                    </span>
                    <span
                      className="text-gray-50 font-cal leading-[100%]  text-[40px] tracking-[-0.002em] md:text-[75px] lg:text-[79px] xl:text-[114px] text-shadow-gray  display: inline-block; vertical-align: top; text-decoration: inherit; text-wrap: balance;"
                      style={{
                        "-webkit-text-fill-color": "#fff",
                        "-webkit-text-stroke-width": "2px",
                        "-webkit-text-stroke-color": "#000",
                        "text-shadow": "0  4px  0  #141414",
                      }}
                    >
                      developer
                    </span>
                  </pre>
                </div>z
              </div>
            </div>
            {/* <div className="flex">
              <div className="hero-intro-username-btn">Your Name:</div>
            </div> 
          </div>
        </div>
      </div> */
}
