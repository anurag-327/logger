import { useState } from "react";
import { Socicons } from "socicons";
import { useForm } from "react-hook-form";
import { Warning, XCircle } from "phosphor-react";
import { supabase } from "@/supabase/config";
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";
const Overlay = ({ setOverlay }) => {
  const router = useRouter();
  const { user, addProject } = useStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (value) => {
    setLoading(true);
    let { data, error } = await supabase
      .from("projects")
      .insert({
        name: value.name,
        description: value.description || " ",
        metadata: { projectURL: value.projectURL },
        projectURL: value.projectURL,
      })
      .select();
    if (error) {
      setError(error.message);
      setLoading(false);
      console.log(error);
    } else {
      addProject(data[0]);
      setLoading(false);
      // setOverlay(false);
      router.push(`/project/${data[0].id}`);
    }
  };
  return (
    <div className="absolute z-50 flex items-center justify-center w-full min-h-screen bg-gray-100 overlay bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70">
      <div className=" relative m-auto w-[90%] py-4 bg-white h-fit rounded-2xl shadow-md border sm:w-[400px] ">
        <div className="flex flex-col items-center justify-between w-full pt-3 ">
          <Socicons icon="github" size={50} />
          <h2 className="font-[500] text-sm mt-2">Create a new project</h2>
          <hr className="h-[1.2px] mt-6 w-full bg-zinc-300"></hr>
        </div>
        <div className="box-border px-2 py-4 sm:px-8 bg-gray-50">
          <form
            id="Form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-4 w-[100%] gap-4"
          >
            <div className="relative w-full rounded-lg">
              <h3 className="font-[500] text-sm">
                Project Name <span className="text-sm text-red-500">*</span>
              </h3>
              <input
                type="text"
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
                id="name"
                {...register("name", { required: true })}
                placeholder="Ex-QuickSign"
                name="name"
              />
              {errors.name && (
                <span className="w-full text-sm text-center text-red-400">
                  This field is required !
                </span>
              )}
            </div>
            <div className="relative w-full rounded-lg">
              <h3 className="text-sm font-[500]">
                Project URL <span className="text-sm text-red-500">*</span>
              </h3>
              <input
                type="url"
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
                id="projectURL"
                {...register("projectURL", {
                  required: true,
                  pattern:
                    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
                })}
                placeholder="https://quick-sign.vercel.app/"
                name="projectURL"
              />
              {errors.projectURL && (
                <span className="w-full text-sm text-center text-red-400">
                  Not a valid URL !
                </span>
              )}
            </div>
            {/* <div className="relative w-full rounded-lg">
              <h3 className="text-sm font-[500]">Description</h3>
              <textarea
                type="text"
                rows={4}
                className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
                id="description"
                placeholder="QuickSign OAuth is a powerful and versatile OAuth 2.0 authentication and OAuth Provider designed to simplify user authentication process."
                {...register("description")}
                name="description"
              />
            </div> */}
            {error && (
              <div className="flex items-center justify-center gap-2 mt-4 text-sm text-center text-red-800 ">
                <Warning size={20} color="#7da239" weight="bold" />
                {error}
              </div>
            )}
            <div className="mt-4">
              <button
                disabled={loading}
                className={`w-[100%] block border-none px-2 py-2 cursor-pointer 
                bg-black text-white  rounded-md`}
                type="Submit"
              >
                {loading ? "creating..." : "create"}
              </button>
            </div>
          </form>
        </div>
        <button
          onClick={() => setOverlay(false)}
          className="absolute sm:top-2 sm:-right-10 top-2 right-2"
        >
          <XCircle size={32} />
        </button>
      </div>
    </div>
  );
};

export default Overlay;
