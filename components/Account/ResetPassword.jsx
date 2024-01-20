"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import { Warning } from "phosphor-react";
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const formRef = useRef(null);
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
        formRef.current.reset();
      }
    } else {
      setError("Passwords Mismatch");
    }
  }
  return (
    <div className=" w-[100%] sm:w-[450px] p-6 border-t-2 border-gray-300  md:mt-0 sm:p-8">
      <Toaster position="top-right" reverseOrder />
      <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        Change Password
      </h2>
      <form
        ref={formRef}
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
  );
};

export default ResetPassword;
