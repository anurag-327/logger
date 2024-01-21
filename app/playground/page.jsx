import Pagination from "@/components/Playground/Pagination";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
const Page = () => {
  return (
    <div className=" md:ml-[300px]  md:w-[calc(100%-340px)] w-full bg-white py-6">
      <div className="xl:w-[80%]  px-2">
        <Heading />
        <AboutLogger />
        <Features />
        <Pagination prev="" next="/playground/getting-started" />
      </div>
    </div>
  );
};

function Heading() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-10 mt-16 border-b-2 border-gray-200 ">
      <h1 className="text-3xl md:text-5xl font-[600]">Logger Documentation</h1>
      <p className="px-4 md:px-10 text-xl text-center text-gray-700 font-[400]">
        Logger: Effortless real-time tracking, insightful analytics, and
        customizable badges for seamless integration and user engagement.
      </p>
      <a
        href="/playground/getting-started"
        className="flex items-center justify-center px-6 py-2 text-lg text-white bg-black rounded-md group"
      >
        Get Started
        <CaretRight
          className="inline-block ml-2 transition-all duration-500 group-hover:ml-4"
          size={16}
        />
      </a>
    </div>
  );
}

function AboutLogger() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 mt-10">
      <div>
        <span className="text-gray-500">About logger</span>
        <h2 className="text-4xl text-gray-800 font-[450]">What is Logger</h2>
      </div>
      <ul className="ml-8 text-gray-700 list-disc">
        <li>
          Logger is your partner for counting visitors with ease, offering
          insights without intrusion.
        </li>
        <li className="mt-2">
          It is a versatile and user-friendly tool designed for seamless
          tracking and analysis of visitor data across diverse platforms. It
          provides real-time insights into website visits while prioritizing
          user privacy.
        </li>
        <li className="mt-2">
          Its user-friendly API simplifies integration, catering to developers
          of all levels. Additionally, Logger offers a customizable "Powered by
          Logger" badge, enhancing user engagement by showcasing visitor counts
          in an interactive manner.
        </li>
      </ul>
    </div>
  );
}

function Features() {
  const features = [
    {
      title: "Real-Time Visitor Tracking",
      description:
        "Monitor website visits in real-time to gain instant insights into user engagement",
    },
    {
      title: "Easy Integration",
      description:
        "Seamlessly integrate Logger into your projects with a straightforward registration process and API key generation",
    },
    {
      title: "Visitor Statistics",
      description:
        "Retrieve comprehensive statistics on visitor behavior, including page views, unique visits, and more",
    },
    {
      title: "User-Friendly Dashboard",
      description:
        "Utilize the Logger Dashboard to manage your applications, view historical data, and make informed decisions based on visitor trends.",
    },
  ];
  return (
    <div className="flex flex-col gap-4 px-4 py-6 mt-5">
      <div>
        <span className="text-gray-500">why logger</span>
        <h2 className="text-4xl text-gray-800 font-[450]">Features</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-5">
        {features.map((data, index) => (
          <FeatureCard key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

function FeatureCard({ data }) {
  return (
    <div className="w-[100%] flex gap-4 flex-col border-2 shadow-lg p-6 rounded-lg sm:w-[48%]">
      <h3 className="text-2xl font-[450] text-gray-700">{data.title}</h3>
      <p className="text-sm text-gray-500">{data.description}</p>
    </div>
  );
}
export default Page;
