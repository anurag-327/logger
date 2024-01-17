import React from "react";
import Editor from "@monaco-editor/react";
import Image from "next/image";
import Code from "./Code";
const Playground = () => {
  const code = `const body = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          clientSecret: YOUR_CLIENT_SECRET,
          applicationId: YOUR_APPLICATION_ID,
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
  const response = `// success (200)
  visitors

  
  //Error
  {
        message: "message",
        error:"error"
  }`;
  const body = `{
    applicationId: YOUR_APPLICATION_ID,
    clientSecret: YOUR_CLIENT_SECRET,
}`;
  const badge = `<a
  href="https://logger-mocha-six.vercel.app/"
  target="blank"
  title="Powered by logger"
  className="fixed h-9 hidden no-underline  right-0 md:flex gap-1 items-center justify-center  text-sm text-white rotate-90 top-[35%] md:top-[20%]  rounded-l-md bg-zinc-700"
>
  <div className="flex items-center justify-center h-full pl-2">
    <img
      className="rounded-full"
      src="https://logger-mocha-six.vercel.app/logo2.png"
      width={20}
      height={20}
      alt="logo"
    />
  </div>
  <div className="flex h-full gap-1">
    <span className="flex items-center justify-center ">Visitors</span>
    <span className="flex items-center justify-center h-full px-1 text-sm text-white bg-green-600 min-w-[40px] ">
      {" "}
      {visitors}{" "}
    </span>
  </div>
</a>`;

  return (
    <div className="w-[95%] bg-white  sm:w-[70%] sm:min-w-[600px] rounded-md p-2 sm:p-4 border mt-20">
      <div>
        <h2 className="text-4xl font-bold md:text-5xl">Setting up logger</h2>
        <p className="mt-4">Welcome to logger</p>
        <hr className="h-[1.5px] mt-6 mb-4 bg-zinc-300 "></hr>
        <p>This blog will guide you setting up logger in your projects.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-3xl md:w-[60%] font-[500]">
          Step-by-Step Guide: Integrating Logger with Your Application
        </h2>
        <div className="mt-6">
          <h3 className="text-xl font-[450]">
            Step 1: Register Your Application
          </h3>
          <ol type="1" className="mt-6 ml-8 list-decimal md:ml-16">
            <li>
              Navigate to the Logger Dashboard by signing in to your account.
            </li>
            <li>Click on the "Add New Application" button.</li>
            <li>
              Fill in the required information for your application, including
              the name and application URL.
            </li>
            <li>Click "Create" to register your application.</li>
            <li>
              Once your application is created, you will be provided with an API
              key. This key will be essential for making API requests.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-[450]">Step 2: Grab your credentials</h3>
          <ol type="1" className="mt-6 ml-8 list-decimal md:ml-16">
            <li>
              After creating your application, go to the "Projects" section in
              the Logger Dashboard.
            </li>
            <li>
              Locate your newly created application and copy the applicationId
              and clientSecret associated with it.
            </li>
            <li>
              Ensure you securely store your API key, as it will be used to
              authenticate requests to the Logger API.
            </li>
          </ol>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-[450]">
            Step 3: Drop a post request from your apllication
          </h3>
          <div className="mt-4 ml-8 md:ml-16">
            <p className="mt-4">
              Now that you have registered your application and obtained your
              credentials, you can make a POST request to the Logger API
              endpoint to record visits and retrieve the latest statistics for
              your project.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-[450]">1 : API Endpoint</h3>
              <Code
                code="https://logger-mocha-six.vercel.app/api/logger"
                heading="Api"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-[450]">2 : Request Body</h3>
              <Code code={body} heading="JSON" />
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-[450]">
            Step 4: Api returns latest stats and records
          </h3>
          <Code code={response} heading="JSON" />
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-[450]">Example Usage</h3>
          <mark>Use method="POST" to avoid cors issues</mark>
          <Code code={code} heading="Javascript" />
        </div>
        <div className="mt-6">
          <h3 className="text-2xl font-[450]">Logger powered badge</h3>
          <Code code={badge} heading="HTML" />
        </div>
      </div>
    </div>
  );
};

export default Playground;
