"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Warning } from "phosphor-react";
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const router = useRouter();
  async function handleReset(data) {
    setError("");
    if (data.password == data["confirm-password"]) {
      const { data: response, error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setError(error.message);
      } else {
        // successfully reset
        toast.success("Password reset successfull!");
        router.push("/login");
      }
    } else {
      setError("Passwords Mismatch");
    }
  }
  return (
    <div className="w-full min-h-[90vh]">
      <Toaster position="top-right" reverseOrder />
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 underline dark:text-white"
          >
            Logger
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <form
              onSubmit={handleSubmit(handleReset)}
              className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              action="#"
            >
              <div>
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  {errors.password && (
                    <span className="text-xs text-red-600 font-[450]">
                      Required* length (8-14)
                    </span>
                  )}
                </div>
                <input
                  type="password"
                  {...register("password", {
                    minLength: 6,
                    maxLength: 20,
                    required: true,
                  })}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="confirm-password"
                  {...register("confirm-password", {
                    minLength: 8,
                    maxLength: 20,
                  })}
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
              >
                Update passwod
              </button>
            </form>

            {error && (
              <div className="flex items-center gap-1 mt-4 text-red-500">
                <Warning size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
