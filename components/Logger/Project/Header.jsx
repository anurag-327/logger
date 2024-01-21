import {
  ChartLine,
  IdentificationBadge,
  List,
  Notebook,
  X,
} from "@phosphor-icons/react";
const Header = ({ credentials, section, setSection }) => {
  function toggleSlider() {
    document.getElementById("slider").classList.toggle("hidden");
    document.getElementById("X").classList.toggle("hidden");
    document.getElementById("list").classList.toggle("hidden");
  }
  return (
    <div className="bg-white">
      <div className="flex flex-row items-center justify-center w-full h-24 px-8 text-center bg-white sm:gap-0 sm:justify-center sm:items-center sm:flex-row ">
        <h3 className="text-4xl font-bold text-green-600">
          {credentials.name}
        </h3>
        <div className="flex justify-end w-full rounded-md lg:hidden ">
          <button
            onClick={toggleSlider}
            className="p-1 border rounded-md cursor-pointer"
          >
            <X id="X" className="hidden lg:hidden" size={25} />
            <List id="list" className="lg:hidden" size={25} />
          </button>
        </div>
      </div>
      <div className="flex gap-2 pl-4 text-sm md:text-lg ">
        <button
          onClick={() => setSection("logs")}
          className={`${
            section == "logs" && "border-b-[3px] border-black"
          } flex gap-1 py-1 px-3 `}
        >
          <Notebook size={20} />
          Logs
        </button>
        <button
          onClick={() => setSection("stats")}
          className={`${
            section == "stats" && "border-b-[3px] border-black"
          } flex gap-1 py-1 px-3`}
        >
          <ChartLine size={20} />
          Stats
        </button>
        <button
          onClick={() => setSection("credentials")}
          className={`${
            section == "credentials" && "border-b-[3px] border-black"
          } flex gap-1 py-1 px-3`}
        >
          <IdentificationBadge size={20} />
          Credentials
        </button>
      </div>
    </div>
  );
};

export default Header;
