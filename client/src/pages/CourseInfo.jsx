import { checkOutPayment } from "@/api";
import { InfiniteMovingCards } from "@/components/ui/moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
  );
}

const testimonials = [
  {
    quote:
      "Enrolling in the Next.js course was a game-changer for me. The course structure was well-designed, covering everything from basics to advanced topics like static site generation and deployment. The instructors' expertise and clear explanations made learning a breeze. I highly recommend this course to anyone looking to master Next.js.",
    name: "Alexandra Chen",
    title: "Full Stack Developer",
  },
  {
    quote:
      "I can't recommend the Next.js course enough! As someone new to web development, I found the course incredibly beginner-friendly. The hands-on projects and practical exercises helped solidify my understanding of Next.js concepts. Plus, the support from the course community and instructors made the learning journey enjoyable and rewarding.",
    name: "Daniel Ramirez",
    title: "Software Engineer",
  },
  {
    quote:
      "The Next.js course exceeded my expectations in every way. Not only did I learn how to build fast and scalable applications with Next.js, but I also gained valuable insights into best practices and optimization techniques. Whether you're a seasoned developer or just starting out, this course is a must-have in your learning arsenal.",
    name: "Emily Wong",
    title: "Frontend Developer",
  },
  {
    quote:
      "Next.js course is hands down the best investment I've made in my career. The curriculum is comprehensive, covering topics like dynamic routing, data fetching, and authentication. What sets this course apart is its focus on real-world applications and industry trends, making it incredibly relevant in today's tech landscape.",
    name: "Michael Patel",
    title: "Software Architect",
  },
  {
    quote:
      "After completing the Next.js course, I feel confident tackling any project with Next.js. The course not only provided in-depth tutorials but also encouraged experimentation and exploration. The practical knowledge gained from building multiple projects gave me the skills I needed to excel in my professional endeavors. Thank you for such an enriching learning experience!",
    name: "Sophia Lee",
    title: "Web Developer",
  },
  {
    quote:
      "As someone with prior experience in frontend development, I found the Next.js course to be incredibly valuable. It helped me bridge the gap between frontend and backend development by teaching me server-side rendering and API routes. The course materials were well-organized, and the instructors were responsive to questions and feedback. I'm grateful for the skills I've gained from this course.",
    name: "Thomas Johnson",
    title: "UI/UX Designer",
  },
  {
    quote:
      "Next.js course is a must-have for anyone serious about mastering modern web development. The course content is comprehensive, covering both the fundamentals and advanced concepts in Next.js. What I appreciated most was the emphasis on best practices and performance optimization, which are crucial in today's competitive landscape. I'm excited to apply what I've learned to my future projects.",
    name: "Victoria Smith",
    title: "Full Stack Developer",
  },
  {
    quote:
      "I've taken several online courses, but the Next.js course stands out as one of the best. The instructors' expertise and passion for teaching were evident throughout the course. The hands-on projects and real-world examples helped solidify my understanding of Next.js concepts. Whether you're a beginner or an experienced developer, this course has something valuable to offer.",
    name: "William Brown",
    title: "Software Engineer",
  },
];

const CourseInfo = () => {
  return (
    <>
      <div className="w-screen h-full bg-black p-8">
        <div className="intructortext text-gray-200 font-primary font-extrabold text-2xl md:text-6xl sm:text-4xl text-center">
          Next.Js : Full Stack Course
        </div>{" "}
        <div className="intro-video flex flex-col justify-center items-center border border-gray-800 bg-gray-900/95 bg-opacity-50 px-8  shadow backdrop-blur-3xl  mt-12 p-2 max-w-[711px] mx-auto rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/XItIKkbvh-A?si=5x8f9qMPX9OGOAsx"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            style={{
              aspectRatio: "16 / 9",
              maxHeight: "400px",
              borderRadius: "12px",
            }}
          ></iframe>
          <div className="instructor-info mt-8">
            <div className="intructortext text-[#D0DFFF] font-primary mb-4">
              Meet your instructors...
            </div>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
              {/* <AnimatedTooltip items={people} /> */}
            </div>
          </div>
        </div>
        <div className="testimonials mt-24">
          <div className="intructortext text-[#D0DFFF] font-primary mt-28 mb-16 text-2xl md:text-6xl sm:text-4xl text-center">
            See What Our Students Say...
          </div>
          <InfiniteMovingCardsDemo />
        </div>
        <div className="intructortext text-[#D0DFFF] font-primary mt-28 text-2xl md:text-6xl sm:text-4xl text-center">
          What You&#39;ll Learn...
        </div>
        <div className="all-syllabus mt-28 grid w-full grid-cols-1 gap-14 md:grid-cols-2 md:[&>*:nth-child(even)]:mt-24">
          <div className="syllabus flex h-fit flex-col rounded-2xl border border-gray-800 bg-gray-900/95 bg-opacity-50 px-8 py-12 shadow backdrop-blur-3xl">
            <div className="syllabus-text text-[#D0DFFF] font-primary mb-4 text-2xl">
              Getting Started
            </div>
            <div className="syllabus-content text-[#D0DFFF] font-primary text-xl">
              <ul>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    01
                  </span>{" "}
                  Introduction to Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    02
                  </span>{" "}
                  Setting up your development environment
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    03
                  </span>{" "}
                  Creating your first Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    04
                  </span>{" "}
                  Routing and navigation in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    05
                  </span>{" "}
                  Fetching data in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    06
                  </span>{" "}
                  Styling your Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    07
                  </span>{" "}
                  Deploying your Next.js app
                </li>
              </ul>
            </div>
          </div>
          <div className="syllabus flex h-fit flex-col rounded-2xl border border-gray-800 bg-gray-900/95 bg-opacity-50 px-8 py-12 shadow backdrop-blur-3xl">
            <div className="syllabus-text text-[#D0DFFF] font-primary mb-4 text-2xl">
              Getting Started
            </div>
            <div className="syllabus-content text-[#D0DFFF] font-primary text-xl">
              <ul>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    01
                  </span>{" "}
                  Introduction to Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    02
                  </span>{" "}
                  Setting up your development environment
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    03
                  </span>{" "}
                  Creating your first Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    04
                  </span>{" "}
                  Routing and navigation in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    05
                  </span>{" "}
                  Fetching data in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    06
                  </span>{" "}
                  Styling your Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    07
                  </span>{" "}
                  Deploying your Next.js app
                </li>
              </ul>
            </div>
          </div>
          <div className="syllabus flex h-fit flex-col rounded-2xl border border-gray-800 bg-gray-900/95 bg-opacity-50 px-8 py-12 shadow backdrop-blur-3xl">
            <div className="syllabus-text text-[#D0DFFF] font-primary mb-4 text-2xl">
              Getting Started
            </div>
            <div className="syllabus-content text-[#D0DFFF] font-primary text-xl">
              <ul>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    01
                  </span>{" "}
                  Introduction to Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    02
                  </span>{" "}
                  Setting up your development environment
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    03
                  </span>{" "}
                  Creating your first Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    04
                  </span>{" "}
                  Routing and navigation in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    05
                  </span>{" "}
                  Fetching data in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    06
                  </span>{" "}
                  Styling your Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    07
                  </span>{" "}
                  Deploying your Next.js app
                </li>
              </ul>
            </div>
          </div>
          <div className="syllabus flex h-fit flex-col rounded-2xl border border-gray-800 bg-gray-900/95 bg-opacity-50 px-8 py-12 shadow backdrop-blur-3xl">
            <div className="syllabus-text text-[#D0DFFF] font-primary mb-4 text-2xl">
              Getting Started
            </div>
            <div className="syllabus-content text-[#D0DFFF] font-primary text-xl">
              <ul>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    01
                  </span>{" "}
                  Introduction to Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    02
                  </span>{" "}
                  Setting up your development environment
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    03
                  </span>{" "}
                  Creating your first Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    04
                  </span>{" "}
                  Routing and navigation in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    05
                  </span>{" "}
                  Fetching data in Next.js
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    06
                  </span>{" "}
                  Styling your Next.js app
                </li>
                <li className="my-4">
                  <span className="bg-gradient-to-r from-[#ff7170] to-[#ffe57f] inline-block text-transparent bg-clip-text">
                    07
                  </span>{" "}
                  Deploying your Next.js app
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="buytext my-[100px] text-[#D0DFFF] font-primary mt-28 text-2xl md:text-6xl sm:text-4xl text-center">
          500+ students have already enrolled!
        </div>
        <div className="price-wrapper flex justify-center items-center w-full">
          <div className="price-card flex justify-center items-center relative size-full max-w-[428px] flex-col rounded-[20px] border-[#242c38]  lg:self-start border bg-[rgba(22,27,34,0.50)] pb-4 pt-10 text-white shadow-md shadow-blue-500/50 font-primary">
            <div className="course_name rounded-md bg-[#161b22] max-w-fit p-4">
              <span className="text-[#8c7cff] py-[20px] px-[20px] text-center text-xl font-bold">
                Next.Js Course
              </span>
            </div>
            <div className="price font-sans my-12">
              <span className="text-white text-6xl font-bold">$99</span>
              <span className="text-white  text-xl font-bold">/month</span>
              <br></br>
              <div className="text-white text-sm font-normal text-right mt-2">
                including Tax
              </div>
            </div>
            <div
              className="buy-now w-[90%] cursor-pointer flex items-center justify-center text-lg font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 px-4  bg-gradient-to-r from-[#854cff] to-[#b573f8] mt-7 h-[45px] rounded-md py-[18px] sm:h-fit"
              onClick={() => {
                checkOutPayment({ amount: 99, currency: "INR" });
              }}
            >
              Pay now
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseInfo;
