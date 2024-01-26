"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/supabase/config";
import {
  CheckSquare,
  NotePencil,
  UserCircle,
  Warning,
} from "@phosphor-icons/react";
import { useStore } from "@/store/useStore";
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState("");
  const { user } = useStore();
  async function handleReset(data) {
    setError("");
    setSuccess(false);
    const { data: response, error } = await supabase.auth.resetPasswordForEmail(
      data.email,
      {
        redirectTo: `${window.location.href}/update-password`,
      }
    );

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setEmail(data.email);
    }
  }
  useEffect(() => {
    (async function () {
      const x = await supabase.auth.getSession();
      if (x.data.session) router.push("/projects");
    })();
  }, [user]);
  return (
    <div className="w-full flex justify-center items-center min-h-[90vh]">
      {success ? (
        <div className="w-full p-2 bg-white border rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-4">
          <div className="flex items-center justify-center w-full gap-1 p-1 overflow-hidden border rounded-full ">
            <UserCircle size={25} color="#808080" weight="bold" />
            <span className="text-sm w-[80%] dark:text-gray-100 overflow-hidden text-gray-500">
              {email}
            </span>
            <a href="/">
              <NotePencil size={25} color="#3944bc" weight="bold" />
            </a>
          </div>
          <p className="w-full font-[450] mt-4 text-center text-gray-800 dark:text-gray-300">
            Password recovery email has been sent!
          </p>
        </div>
      ) : (
        <section className="w-full bg-gray-50 dark:bg-gray-900">
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
                      htmlFor="email"
                      className="text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    {errors.email && (
                      <span className="text-xs text-red-600 font-[450]">
                        Required*
                      </span>
                    )}
                  </div>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    id="email"
                    className="bg-gray-50 border mt-1 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800"
                >
                  Send Mail
                </button>
                <div className="flex flex-col gap-1 font-[450] text-center">
                  {error && (
                    <div className="flex items-center gap-1">
                      <Warning size={20} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              </form>
              <div>
                <p className="text-sm text-center">
                  An email will be sent to you for password recovery
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default page;
