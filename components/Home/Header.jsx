import { useStore } from "@/store/useStore";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const { user, setUser, resetUser } = useStore();
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log("error signing out");
    else {
      resetUser();
      router.push("/");
    }
  }

  return (
    <nav className="fixed top-0 flex justify-between w-full px-2 py-3 bg-gray-400 sm:px-8 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div>
        <h3 className="text-2xl font-extrabold">logger</h3>
      </div>
      <div>
        {user ? (
          <div className="flex gap-2 sm:gap-4">
            <a
              className="flex items-center px-4 text-sm text-white bg-black rounded-full py"
              href="/projects"
            >
              Dashboard
            </a>
            <button
              className="flex px-3 py-1 text-sm transition duration-200 border border-green-400 rounded-full hover:border-green-600"
              onClick={handleSignOut}
            >
              Signout
            </button>
          </div>
        ) : (
          <div className="flex gap-2 sm:gap-4">
            <a
              className="flex items-center px-3 text-sm transition duration-200 border border-green-400 rounded-full hover:border-green-600"
              href="/login"
            >
              Login
            </a>
            <a
              className="flex items-center px-4 py-1 text-sm text-white bg-black rounded-full"
              href="/signup"
            >
              Signup
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
