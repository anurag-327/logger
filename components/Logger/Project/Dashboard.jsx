import React, { useState } from "react";
import { CodesandboxLogo, Copy } from "phosphor-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";

import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";

const ApplicationDashboard = ({ project, setProject }) => {
  return (
    <div className="sm:px-8 px-2 sm:shadow-md bg-white  mx-auto  border-none sm:border rounded-none sm:rounded-xl border-gray-300 overflow-hidden py-8 w-[100%] sm:max-w-5xl mt-10  justify-center items-start flex-col gap-3">
      <Toaster position="top-right" reverseOrder />
      <ApplicationCredentials project={project} />
      <GeneralCredentials project={project} setProject={setProject} />
      <DeleteApplication project={project} />
    </div>
  );
};

export default ApplicationDashboard;

function ApplicationCredentials({ project }) {
  return (
    <div className="w-[100%] mt-10   sm:max-w-[500px] mx-auto">
      <div className="flex flex-col gap-4 px-4 py-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="flex gap-4 my-2 text-2xl font-bold text-start ">
          # Application credentials
        </h2>
        <div className="px-2 py-2 overflow-auto whitespace-pre-wrap border border-gray-300 rounded-lg shadow-md ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-[600] ">Client ID</h3>
            <CopyToClipboard
              text={project.id}
              onCopy={() => toast.success("copied")}
            >
              <button>
                <Copy className="cursor-pointer " size={25} weight="light" />
              </button>
            </CopyToClipboard>
          </div>
          <input
            readOnly
            className="w-full px-3 py-2 overflow-visible text-sm border border-gray-300 rounded-md outline-none "
            defaultValue={project.id}
          />
        </div>
        <div className="px-2 py-2 overflow-auto whitespace-pre-wrap border border-gray-300 rounded-lg shadow-md ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-[600] ">Client Secret</h3>

            <CopyToClipboard
              text={project.clientSecret}
              onCopy={() => toast.success("copied")}
            >
              <button>
                <Copy className="cursor-pointer " size={25} weight="light" />
              </button>
            </CopyToClipboard>
          </div>
          <input
            readOnly
            className="w-full px-3 py-2 overflow-visible text-sm border border-gray-300 rounded-md outline-none "
            defaultValue={project.clientSecret}
          />
        </div>
      </div>
    </div>
  );
}

function GeneralCredentials({ project, setProject }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { error } = await supabase
      .from("projects")
      .update({ name: data.name, projectURL: data.projectURL })
      .eq("id", project.id);
    if (error) {
      setLoading(false);
      console.log(error);
    } else {
      setLoading(false);
      setProject({ ...project, name: data.name, projectURL: data.projectURL });
    }
  };
  return (
    <>
      <form
        id="Form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-10 border py-4 shadow-md rounded-md border-gray-300  px-3  w-[100%]  sm:max-w-[500px] mx-auto "
      >
        <h2 className="flex w-full gap-4 my-2 text-2xl font-bold text-center ">
          # Application Details
        </h2>
        <div className="relative w-full mt-5 rounded-lg">
          <h3 className="font-[700] text-sm mb-1">
            Project Name <span className="text-sm text-red-500">*</span>
          </h3>
          <input
            type="text"
            className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
            id="name"
            {...register("name", { required: true })}
            defaultValue={project.name}
            name="name"
          />
          {errors.name && (
            <span className="w-full text-center text-red-400">
              This field is required !
            </span>
          )}
        </div>
        <div className="relative w-full mt-5 rounded-lg">
          <h3 className="text-sm font-[700] mb-1">
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
            defaultValue={project.projectURL}
            name="projectURL"
          />
          {errors.homepageURL && (
            <span className="w-full text-center text-red-400">
              Not a valid URL !
            </span>
          )}
        </div>

        <div className="mt-4">
          <button
            disabled={loading}
            className={`w-[100%] block border-none px-2 py-3 cursor-pointer ${
              loading ? "bg-green-300" : "bg-green-600"
            } bg-blue-600 text-white text-lg font-semibold rounded-md`}
            type="Submit"
          >
            {loading ? "updating" : "update"}
          </button>
        </div>
      </form>
    </>
  );
}

function DeleteApplication({ project }) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  async function deleteAccount() {
    setDeleteLoading(true);
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", project.id);
    if (error) {
      console.log("Failed to delete project");
    } else {
      router.push("/projects");
    }
  }
  return (
    <div className="w-[100%] sm:max-w-[500px] mx-auto">
      <div className="w-full px-4 py-6 mt-10 overflow-auto whitespace-pre-wrap border border-gray-300 rounded-lg shadow-md ">
        <div className="w-full ">
          <h3 className="mb-2 text-2xl font-bold "># Delete Project</h3>
          <p className="my-4 text-sm text-center text-red-600 whitespace-pre-wrap">
            Note! This is a destructive action continuing will delete your
            project
          </p>
          <p className="text-sm">
            Prompt{" "}
            <span className="font-bold text-red-600 underline ">
              delete/{project.name}
            </span>{" "}
            to delete project
          </p>
          <input
            id="deleteBox"
            value={deleteMessage}
            type="text"
            autoCorrect="off"
            autoComplete="off"
            onChange={(e) => setDeleteMessage(e.target.value)}
            className="w-full px-3 py-2 mt-2 text-lg border border-gray-300 rounded-md outline-none"
          />
        </div>
        {deleteMessage === `delete/${project.name}` && (
          <button
            onClick={deleteAccount}
            className={` text-white mt-4 rounded-md mr-4 float-right px-3 py-2 ${
              deleteLoading ? "bg-red-200" : "bg-red-600"
            }`}
          >
            Delete Project
          </button>
        )}
      </div>
    </div>
  );
}
