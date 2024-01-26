import { useRouter } from "next/navigation";
const Header = () => {
  return (
    <nav className="fixed top-0 z-20 flex justify-between w-full px-2 py-3 bg-gray-400 sm:px-8 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div>
        <a href="/" className="text-2xl font-extrabold">
          logger
        </a>
      </div>
      <div>
        <div className="flex gap-2 sm:gap-4">
          <a
            className="flex items-center px-4 py-1 text-sm text-white bg-black rounded-full"
            href="/"
          >
            Home
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
