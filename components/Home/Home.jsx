import { useStore } from "@/store/useStore";
import { ArrowArcRight, ArrowBendRightDown } from "phosphor-react";
import { Socicons } from "socicons";
const Home = () => {
  const { user } = useStore();
  return (
    <div className="mt-32 sm:mt-40">
      <div className=" w-full mx-auto sm:max-w-[500px]">
        <div className="px-4 py-1 mx-auto mb-6 transition duration-200 border border-green-300 rounded-full hover:border-green-500 w-fit">
          <p className="text-sm font-semibold text-gray-600">
            Track visitors, gain insights
            <ArrowArcRight
              className="inline-block ml-1 rotate-45"
              size={20}
              weight="fill"
            />
          </p>
        </div>
        <div className="w-full text-4xl font-extrabold text-center capitalize sm:text-5xl">
          <h2>Count your Visitors</h2>
          <h2 className="mt-2 text-orange-600">In realtime</h2>
        </div>
        <div className="my-4 text-sm text-center text-gray-600 sm:text-lg ">
          <p>
            Logger is your partner for counting visitors with ease, offering
            insights without intrusion.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="flex items-center justify-center gap-2 px-4 py-1 text-sm text-white bg-black rounded-full w-fit"
            href={user ? "/projects" : "/login"}
          >
            Configure your app
          </a>
          <a
            className="flex items-center justify-center gap-2 px-4 py-1 text-sm border border-green-500 rounded-full w-fit"
            href="https://www.github.com/anurag-327/logger"
            target="_blank"
          >
            <Socicons size={20} icon="github" />
            Star on github
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
