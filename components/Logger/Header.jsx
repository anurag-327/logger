import { useStore } from "@/store/useStore";
import Image from "next/image";
import {
  CaretUp,
  CirclesThreePlus,
  Gear,
  Question,
  SignOut,
} from "phosphor-react";
import { useState } from "react";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";
const Header = () => {
  const { user, setUser, resetUser } = useStore();
  const router = useRouter();
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("error signing out");
    else {
      resetUser();
      router.push("/");
    }
  }
  const [dropDown, setDropDown] = useState(false);

  return (
    <nav className="sticky top-0 flex justify-between w-full px-2 py-4 bg-gray-400 sm:py-3 sm:px-10 md:px-10 lg:px-40 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div>
        <h3 className="text-xl font-extrabold ">
          logger
          <span className="text-sm font-normal sm:text-base">
            {" "}
            / {user.user_metadata.full_name}
          </span>
        </h3>
      </div>
      <div className="relative">
        <Image
          src="/github.png"
          className="rounded-full cursor-pointer"
          alt="profile-photo"
          width={35}
          height={35}
          onClick={() => setDropDown(!dropDown)}
        />
        <div className="absolute z-10 flex items-center justify-center w-4 h-4 bg-white rounded-full -right-1 top-4">
          <div className="relative w-3 h-3 bg-blue-700 rounded-full"></div>
        </div>
        {dropDown && (
          <div className="absolute  border flex flex-col top-10 w-[250px] min-h-[100px] right-2 bg-white px-4 py-6 rounded-md">
            <CaretUp
              className="absolute z-10 -right-1 -top-4 "
              size={30}
              color="#ffffff"
              weight="fill"
            />

            <div className="flex flex-col ">
              <span className="text-base font-[500] ">
                {user.user_metadata.full_name}
              </span>
              <span className="-mt-1 overflow-hidden text-xs text-gray-400">
                {user.email}
              </span>
            </div>
            {/* <hr className="w-full h-[1.5px] mt-4 bg-black rounded-full "></hr> */}
            <div className="flex flex-col gap-3">
              <a href="/settings" className="flex items-center gap-1 mt-4">
                <Gear size={18} weight="regular" />
                Setting
              </a>

              <a href="/projects" className="flex items-center gap-1">
                <CirclesThreePlus size={18} />
                Projects
              </a>
              <a href="/help" className="flex items-center gap-1">
                <Question size={18} weight="regular" />
                Help
              </a>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1"
              >
                <SignOut size={18} weight="regular" />
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
