import { ArrowArcRight } from "@phosphor-icons/react/dist/ssr";
import Navigator from "./Navigator";
const Home = () => {
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
        <Navigator />
      </div>
    </div>
  );
};

export default Home;
