import { ArrowRight, CaretRight } from "@phosphor-icons/react/dist/ssr";
const Showcase = () => {
  return (
    <div className="p-4 hidden fixed right-0 bg-gray-200 md:bg-gray-50 md:bg-transparent  w-[260px] border-l-2  xl:flex flex-col gap-3 min-h-screen  ">
      <span className="text-xl font-[400] text-center">Badges</span>
      <div className="mt-5">
        <span className="text-center text-yellow-600">Coming Soon!</span>
      </div>
    </div>
  );
};

export default Showcase;
