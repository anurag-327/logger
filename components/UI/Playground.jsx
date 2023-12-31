import React from "react";
import Editor from "@monaco-editor/react";
import Image from "next/image";
const Playground = () => {
  const code = `
  const body = {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          clientSecret: CLIENTSECRET,
          applicationId: APPLICATIONID,
        }),
      };
      const res = await fetch("https://logger-mocha-six.vercel.app/api/logger", body);
      const json = await res.json();
      if (res.status === 200) {
        visitors = json;
      } else {
        // error
        console.log(json);
      }`;
  const error = `response={
        message: "message",
        error:"error"
      }`;
  const badge = `<div className="flex items-center justify-center h-full gap-2 px-2 text-sm text-white rounded-l-md bg-zinc-700"><img
      className="rounded-full"
      src="https://logger-mocha-six.vercel.app/logo2.png"
      width={20}
      height={20}
      alt="logo"
    />
    <span className="flex items-center justify-center ">logger</span>
  </div>
  <span className="flex items-center justify-center h-full px-2 text-sm text-white bg-green-600 min-w-[40px] rounded-r-md">
    {count}
  </span></div>`;

  return (
    <div className="w-[95%]  sm:w-[70%] sm:min-w-[600px] rounded-md p-2 sm:p-4 border mt-20">
      <h2 className="text-2xl font-semibold">
        <span># </span>PlayGround
      </h2>
      <div className="mt-10 ">
        <p>You can setup logger by following simple steps:</p>
        <div className="mt-4 ">
          <ol className="ml-10 list-decimal">
            <li>
              <a className="text-blue-600 underline" href="/dashboard">
                Register your application to logger
              </a>
            </li>
            <li>Grab your credentials</li>
            <li>Drop a post request on API Endpoint with your credentials</li>
            <li>Api returns you the latest stats on your project</li>
          </ol>
          <div className="flex flex-col gap-2 mt-10">
            <span>
              API Endpoint:{" "}
              <span className="text-blue-800 underline">
                https://logger-mocha-six.vercel.app/api/logger
              </span>
            </span>
            <div>
              <span className="font-semibold">Sample Request: </span>
              <div className="relative flex flex-col w-full gap-1">
                <Editor
                  height={400}
                  defaultLanguage="javascript"
                  theme="light"
                  defaultValue={code}
                  className="py-2 overflow-hidden cursor-not-allowed"
                />
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">Response Schema: </span>
                  <div className="ml-6">
                    <span className="">Sucess: </span>
                    <div>
                      <Editor
                        height={20}
                        defaultLanguage="javascript"
                        theme="light"
                        defaultValue="count // visitors count"
                        className="overflow-hidden cursor-not-allowed "
                      />
                    </div>
                  </div>
                  <div className="ml-6">
                    <span className="">Bad Response: </span>
                    <div>
                      <Editor
                        height={100}
                        defaultLanguage="javascript"
                        theme="light"
                        defaultValue={error}
                        className="py-2 overflow-hidden cursor-not-allowed "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mt-2">
            <span className="font-semibold">Logger badge</span>
            <Image src="/badge.png" alt="badge" width={100} height={50} />
            <div className="flex flex-col gap-1 p-2 mt-4 bg-gray-100 rounded-md">
              <span className="font-semibold">Badge code:</span>
              <span>{badge}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
