"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye } from "phosphor-react";
import { supabase } from "@/supabase/config";
import GoogleOauth from "@/components/Auth/GoogleOauth";
import GithubOauth from "@/components/Auth/GithubOauth";
import { useStore } from "@/store/useStore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Login() {
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url");
  const router = useRouter();
  const [toggleEye, setToggleEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const { user, setUser } = useStore();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  async function handleSignup(value) {
    setError();
    setLoading(true);
    try {
      const email = value.email;
      const { data, error } = await supabase.auth.signUp({
        email: value.email,
        password: value.password,
        options: {
          data: {
            full_name: value.name,
            userName: email.slice(0, email.indexOf("@")),
          },
        },
      });
      if (error) {
        setLoading(false);
        setError(error.message);
        console.log("error", error.message);
      } else {
        setLoading(false);
        setUser(data.user);
        if (callback_url)
          router.push(
            `signup/verify-email-address?callback_url=${callback_url}`
          );
        else router.push(`signup/verify-email-address`);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }
  useEffect(() => {
    (async function () {
      const x = await supabase.auth.getSession();
      if (x.data.session) router.push("/projects");
    })();
  }, []);
  return (
    <main className="box-content flex flex-col items-center justify-center min-h-screen text-black font-poppins ">
      <div
        className={`p-4 ${
          loading && "pointer-events-none opacity-50"
        } bg-white w-[90%] max-w-[430px]  flex flex-col gap-4 md:w-[400px] shadow-md rounded-2xl`}
      >
        <div>
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <span className="text-sm text-gray-600 ">to continue to BugsB</span>
        </div>
        <div className="flex flex-col gap-3 mt-4 oAuthContainer">
          <GoogleOauth />
          <GithubOauth />
        </div>
        <div className="flex items-center justify-center gap-2 separator">
          <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
          <p>OR</p>
          <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
        </div>
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="mt-">
            <label className="text-sm text-gray-600 " htmlFor="name">
              Name{" "}
              {errors.name && (
                <span className="font-semibold text-red-800"> Required*</span>
              )}
            </label>
            <input
              id="name"
              {...register("name", { required: true })}
              className="w-full p-2 border-2 rounded-md outline-none resize-none focus:border-2 focus:rounded-md focus:border-purple-700"
              type="text"
            ></input>
          </div>
          <div className="mt-2">
            <label className="text-sm text-gray-600 " htmlFor="email">
              Email Address{" "}
              {errors.email && (
                <span className="font-semibold text-red-800">Required*</span>
              )}
            </label>
            <input
              id="email"
              {...register("email", { required: true })}
              className="w-full p-2 border-2 rounded-md outline-none resize-none focus:border-2 focus:rounded-md focus:border-purple-400"
              type="email"
            ></input>
          </div>
          <div className="relative mt-2">
            <label className="text-sm text-gray-600 " htmlFor="password">
              Password{" "}
            </label>
            <input
              id="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 20,
              })}
              type={toggleEye ? "text" : "password"}
              className="w-full p-2 border-2 rounded-md outline-none resize-none focus:border-2 focus:rounded-md focus:border-red-300 "
            ></input>
            <Eye
              size={20}
              onClick={() => setToggleEye(!toggleEye)}
              className="absolute cursor-pointer right-3 top-[50%] bottom-[50%]"
              color="#17141a"
              weight="bold"
            />
            {errors.password && (
              <span className="font-semibold text-red-800">
                Your Password must contain 8 or more characters
              </span>
            )}
          </div>
          {error && (
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-center text-red-800 ">
              {/* <Warning size={20} color="#7da239" weight="bold" /> */}
              {error}
            </div>
          )}
          <div className="flex justify-center mt-5 ">
            <button
              type="submit"
              disabled={loading}
              className={`w-full  text-white bg-blue-600 p-2 rounded-md`}
            >
              {!loading ? "Continue" : "Signing Up"}
            </button>
          </div>
          <div className="mt-5 text-center ">
            <p className="text-sm">
              Already have an account?{" "}
              <a href="/login" className="text-blue-800 underline ">
                Sign In
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
