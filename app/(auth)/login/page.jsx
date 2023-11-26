"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, Warning } from "phosphor-react";
import { supabase } from "@/supabase/config";
import GoogleOauth from "@/components/Auth/GoogleOauth";
import GithubOauth from "@/components/Auth/GithubOauth";
import { useStore } from "@/store/useStore";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback_url = searchParams.get("callback_url") || null;
  const [toggleEye, setToggleEye] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const { user, setUser } = useStore();
  async function handleSignin(value) {
    setError();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });
      if (error) {
        setLoading(false);
        setError(error.message);
        console.log("Error", error);
      } else {
        setUser(data.user);
        setLoading(false);
        if (callback_url) router.push(callback_url);
        else router.push("/projects");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  }
  useEffect(() => {
    if (user != null) {
      if (callback_url) router.push(callback_url);
      else router.push("/projects");
    }
  }, []);
  return (
    <main className="box-content flex flex-col items-center justify-center min-h-screen text-black font-poppins">
      <div
        className={`p-4 ${
          loading && "pointer-events-none opacity-60"
        } bg-white w-[90%] max-w-[400px] text-black dark:bg-black dark:shadow-lg dark:shadow-gray-100 dark:border flex flex-col gap-4 md:w-[400px] shadow-md rounded-2xl`}
      >
        <header>
          <h2 className="text-2xl font-semibold text-center">
            Sign in to Logger
          </h2>
          <p className="text-sm text-center text-gray-500">
            create log of your site visitors...
          </p>
        </header>
        <div className="flex flex-col gap-3 mt-4 oAuthContainer">
          <GoogleOauth callback_url={callback_url} />
          <GithubOauth callback_url={callback_url} />
        </div>
        <div className="flex items-center justify-center gap-2 separator">
          <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
          <p>OR</p>
          <hr className="h-[1px] rounded-md border-none bg-gray-400 w-[45%]"></hr>
        </div>
        <form onSubmit={handleSubmit(handleSignin)}>
          <div className="mt-2">
            <label className="text-sm " htmlFor="email">
              Email Address{" "}
              {errors.email && (
                <span className="text-sm font-semibold text-red-500">
                  Required*
                </span>
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
            <label className="text-sm " htmlFor="password">
              Password{" "}
              {errors.password && (
                <span className="text-sm font-semibold text-red-500 ">
                  Required *
                </span>
              )}
            </label>
            <input
              id="password"
              {...register("password", { required: true })}
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
              <Warning size={20} color="#7da239" weight="bold" />
              {error}
            </div>
          )}
          <div className="flex justify-center mt-5 ">
            <button
              type="submit"
              disabled={loading}
              className={`w-full  text-white bg-blue-600 p-2 rounded-md`}
            >
              {!loading ? "Continue" : "Logging In"}
            </button>
          </div>
          <div className="mt-5 text-sm text-center ">
            <p>
              Didn't have any account?{" "}
              <a href="/signup" className="text-blue-800 underline ">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
