import { supabase } from "@/supabase/config";
export default function GoogleOauth({ callback_url }) {
  if (!callback_url) callback_url = window.location.href;
  async function handleGoogleOauth() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callback_url,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <button
      onClick={handleGoogleOauth}
      className="flex items-center gap-2 p-1 text-black bg-white border border-gray-300 rounded-md"
    >
      <img
        src="./google.jpg"
        alt="google"
        width={40}
        height={40}
        className="ml-4"
      />
      <span>Continue with Google</span>
    </button>
  );
}
