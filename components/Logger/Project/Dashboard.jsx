import React, { useState } from "react";
import { CodesandboxLogo, Copy } from "phosphor-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import Header from "./Header";
import { supabase } from "@/supabase/config";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
const ApplicationDashboard = ({ credentials, setCredentials }) => {
  return (
    <div className="md:px-6 px-2 py-10  bg-white  mx-auto  overflow-hidden w-[98%] md:ml-4 mt-4  justify-center items-start flex-col gap-3">
      <Toaster position="top-right" reverseOrder />
      <ApplicationCredentials credentials={credentials} />
      <GeneralCredentials
        credentials={credentials}
        setCredentials={setCredentials}
      />
      <DeleteApplication credentials={credentials} />
    </div>
  );
};

export default ApplicationDashboard;

function ApplicationCredentials({ credentials }) {
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(credentials.clientSecret);
  async function updateClientSecret() {
    setLoading(true);
    const newclientSecret = uuidv4();
    const { error } = await supabase
      .from("projects")
      .update({ clientSecret: newclientSecret })
      .eq("id", credentials.id);

    if (error) {
      toast.error("Failed to Generate new secret");
      setLoading(false);
    } else {
      toast.success("Client Secret updated");
      setClientSecret(newclientSecret);
      setLoading(false);
    }
  }
  return (
    <div className="w-[100%]  overflow-hidden  sm:max-w-full mx-auto">
      <Toaster position="top-right" reverseOrder />
      <div className="flex flex-col gap-4 border border-gray-300 rounded-md shadow-md">
        <div className="w-full px-4 py-4 bg-gray-100">
          <h2 className="flex gap-4 my-2 text-2xl font-[450] text-start ">
            Application credentials
          </h2>
        </div>
        <div className="px-4 py-2 overflow-auto whitespace-pre-wrap rounded-lg ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-[450] ">Application Id</h3>
            <CopyToClipboard
              text={credentials.id}
              onCopy={() => toast.success("copied")}
            >
              <button>
                <Copy className="cursor-pointer " size={25} weight="light" />
              </button>
            </CopyToClipboard>
          </div>
          <div className="w-full px-3 py-2 overflow-visible text-sm border border-gray-300 rounded-md outline-none ">
            {credentials.id}
          </div>
        </div>
        <div className="px-4 py-2 overflow-auto whitespace-pre-wrap rounded-lg ">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-[450] ">Client Secret</h3>

            <CopyToClipboard
              text={clientSecret}
              onCopy={() => toast.success("copied")}
            >
              <button>
                <Copy className="cursor-pointer " size={25} weight="light" />
              </button>
            </CopyToClipboard>
          </div>
          <div className="w-full px-3 py-2 overflow-visible text-sm border border-gray-300 rounded-md outline-none ">
            {clientSecret}
          </div>
          <div className="flex flex-col items-end w-full gap-1 mt-2 sm:justify-between sm:items-center sm:flex-row">
            <span className="text-sm text-red-600 font-[450]">
              *Generating new secret will invalidate the existing secret
            </span>
            {loading ? (
              <div className="px-3 py-0.5 text-sm hover:bg-gray-200 border-2 rounded-md">
                Generating..
              </div>
            ) : (
              <button
                onClick={updateClientSecret}
                className="px-3 py-0.5 w-fit float-right text-sm hover:bg-gray-200 border-2 rounded-md"
              >
                Generate new key
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GeneralCredentials({ credentials, setCredentials }) {
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
      .update({ name: data.name, projectURL: data.credentialsURL })
      .eq("id", credentials.id);
    if (error) {
      setLoading(false);
      console.log(error);
    } else {
      setLoading(false);
      setCredentials({
        ...credentials,
        name: data.name,
        credentialsURL: data.credentialsURL,
      });
    }
  };
  return (
    <>
      <form
        id="Form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col overflow-hidden mt-10 pb-4 border  shadow-md rounded-md border-gray-300    w-[100%]  sm:max-w-full mx-auto "
      >
        <div className="w-full px-4 py-4 bg-gray-100">
          <h2 className="flex w-full gap-4 my-2 text-2xl font-[450] text-center ">
            Application Details
          </h2>
        </div>
        <div className="relative w-full px-4 mt-5 rounded-lg">
          <h3 className="font-[450] text-sm mb-1">
            Project Name <span className="text-sm text-red-500">*</span>
          </h3>
          <input
            type="text"
            className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
            id="name"
            {...register("name", { required: true })}
            defaultValue={credentials.name}
            name="name"
          />
          {errors.name && (
            <span className="w-full text-center text-red-400">
              This field is required !
            </span>
          )}
        </div>
        <div className="relative w-full px-4 mt-5 rounded-lg">
          <h3 className="text-sm font-[450] mb-1">
            Project URL <span className="text-sm text-red-500">*</span>
          </h3>
          <input
            type="url"
            className="w-full px-2 py-2 text-sm border border-gray-300 rounded-lg outline-green-700"
            id="credentialsURL"
            {...register("credentialsURL", {
              required: true,
              pattern:
                /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
            })}
            placeholder="https://quick-sign.vercel.app/"
            defaultValue={credentials.projectURL}
            name="credentialsURL"
          />
          {errors.homepageURL && (
            <span className="w-full text-center text-red-400">
              Not a valid URL !
            </span>
          )}
        </div>

        <div className="px-4 mt-4">
          <button
            disabled={loading}
            className={`w-full sm:w-fit float-right px-4 block border-none  py-1 cursor-pointer ${
              loading ? "bg-green-300" : "bg-blue-400 "
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

function DeleteApplication({ credentials }) {
  const router = useRouter();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  async function deleteAccount() {
    setDeleteLoading(true);
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", credentials.id);
    if (error) {
      console.log("Failed to delete credentials");
    } else {
      router.push("/projects");
    }
  }
  return (
    <div className="w-[100%] overflow-hidden sm:max-w-full mx-auto">
      <div className="w-full mt-10 overflow-auto whitespace-pre-wrap border border-gray-300 rounded-lg shadow-md ">
        <div className="w-full ">
          <div className="w-full px-4 py-4 bg-gray-100">
            <h3 className="mb-2 text-2xl font-[450] ">Delete Application</h3>
          </div>
          <div className="px-4 pb-4">
            <p className="my-4 text-sm text-center text-red-600 whitespace-pre-wrap">
              Note! This is a destructive action continuing will delete your
              credentials
            </p>
            <p className="text-sm">
              Prompt{" "}
              <span className="font-bold text-red-600 underline ">
                delete/{credentials.name}
              </span>{" "}
              to delete credentials
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
        </div>
        {deleteMessage === `delete/${credentials.name}` && (
          <button
            onClick={deleteAccount}
            className={` text-white my-2 rounded-md mr-4 float-right px-3 py-2 ${
              deleteLoading ? "bg-red-200" : "bg-red-600"
            }`}
          >
            Delete Credentials
          </button>
        )}
      </div>
    </div>
  );
}
