import { ArrowArcRight, ArrowBendRightDown } from "phosphor-react";
const Home = () => {
  return (
    <div className="">
      <div className=" w-[95%] mx-auto sm:max-w-[500px]">
        <div className="px-4 py-1 mx-auto mb-6 transition duration-200 border border-green-300 rounded-full hover:border-green-500 w-fit">
          <p className="text-sm font-semibold text-gray-700">
            Track visitors, gain insights.
            <ArrowArcRight
              className="inline-block rotate-45"
              size={20}
              weight="fill"
            />
          </p>
        </div>
        <div className="w-full text-5xl font-extrabold text-center capitalize">
          <h2>Count your Visitors</h2>
          <h2 className="mt-2 text-orange-600">In realtime</h2>
        </div>
        <div className="mt-4 text-lg text-center text-gray-500 ">
          <p>
            Logger is your partner for counting visitors with ease, offering
            insights without intrusion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
