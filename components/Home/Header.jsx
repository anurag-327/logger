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
    <nav className="fixed top-0 flex justify-between w-full px-2 py-3 bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10">
      <div>
        <h3 className="text-2xl font-extrabold">dub</h3>
      </div>
      <div>
        {user ? (
          <button onClick={handleSignOut}>Signout</button>
        ) : (
          <div className="flex gap-4">
            <a
              className="px-3 py-1 transition duration-200 border border-green-400 rounded-full hover:border-green-600"
              href="/login"
            >
              Login
            </a>
            <a
              className="px-4 py-1 text-white bg-black rounded-full"
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
