import { ArrowRight, CaretRight } from "@phosphor-icons/react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";

const Sidebar = () => {
  return (
    <aside
      id="sidebar-playground"
      className="p-4 hidden fixed mt-14 py-10 md:py-0 md:mt-0 bg-white md:bg-gray-50 md:bg-transparent w-[90%] z-40 max-w-[400px] md:fixed md:w-[280px] flex flex-col md:flex md:flex-col gap-3 h-screen border-r-2 md:border-r-4"
    >
      <a
        href="/playground"
        className="mt-4 text-lg text-gray-700 transition-all duration-500 group text-start hover:text-black"
      >
        Introduction{" "}
        <CaretRight
          className="inline-block transition-all duration-500 group-hover:ml-2"
          size={16}
        />
      </a>

      <a
        href="/playground/getting-started"
        className="text-lg text-gray-700 transition-all duration-500 group text-start hover:text-black"
      >
        Getting Started{" "}
        <CaretRight
          className="inline-block transition-all duration-500 group-hover:ml-2"
          size={16}
        />
      </a>
      <div>
        <a
          href="/playground/services"
          className="text-lg text-gray-700 transition-all duration-500 group text-start hover:text-black"
        >
          Services <CaretDown className="inline-block ml-8 " size={16} />
        </a>
        <div id="dropdown" className="mt-2 ml-4 text-base ">
          <ul>
            <li className="mt-1 text-gray-600 hover:text-gray-900">
              <a href="/playground/services/#visitors">Visitors Data</a>
            </li>
            <li className="mt-1 text-gray-600 hover:text-gray-900">
              <a href="/playground/services/#geography">Geographical Data</a>
            </li>
            <li className="mt-1 text-gray-600 hover:text-gray-900">
              <a href="/playground/services/#traffic">Traffic Logs</a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
