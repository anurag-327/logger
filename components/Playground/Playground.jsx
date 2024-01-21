import Code from "./Code";
import Pagination from "./Pagination";
const Playground = () => {
  return (
    <div className="py-16 mt-10 text-gray-800">
      <div>
        <h2 className="mb-6 text-4xl font-bold text-gray-700 md:text-5xl">
          Setting up logger
        </h2>
        <p>This tutorial will guide you setting up logger in your projects.</p>
        <hr className="h-[1.5px] w-[98%] mt-4 mb-4 bg-zinc-300 "></hr>
      </div>
      <div className="mt-8">
        <Register />
        <Credentials />
        <Integration />
        <Response />
      </div>
      <Pagination next="/playground/services" prev="/playground" />
    </div>
  );
};

export default Playground;

function Register() {
  return (
    <div className="mt-6">
      <div>
        <span className="text-gray-500">register</span>
        <h2 className="text-3xl text-gray-800 font-[450]">
          Register Your Application
        </h2>
      </div>
      <ol type="1" className="mt-6 ml-8 list-decimal md:ml-16">
        <li>Navigate to the Logger Dashboard by signing in to your account.</li>
        <li>Click on the "Add New Application" button.</li>
        <li>
          Fill in the required information for your application, including the
          name and application URL.
        </li>
        <li>Click "Create" to register your application.</li>
        <li>
          Once your application is created, you will be redirected to your
          application dashboard.
        </li>
      </ol>
    </div>
  );
}

function Credentials() {
  return (
    <div className="mt-8">
      <div>
        <span className="text-gray-500">credentials</span>
        <h2 className="text-3xl text-gray-800 font-[450]">
          Grab your credentials
        </h2>
      </div>
      <ol type="1" className="mt-6 ml-8 text-gray-800 list-decimal md:ml-16">
        <li>
          After creating your application, go to the "Projects" section in the
          Logger Dashboard.
        </li>
        <li>
          Locate your newly created application and copy the applicationId and
          clientSecret associated with it.
        </li>
        <li>
          Ensure you securely store your API key, as it will be used to
          authenticate requests to the Logger API.
        </li>
      </ol>
    </div>
  );
}

function Integration() {
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
  const res = await fetch("https://logger-mocha-six.vercel.app/api/logger/v1", body);
  const json = await res.json();
  if (res.status === 200) {
    visitors = json;
  } else {
    // error
    console.log(json);
  }`;

  const body = `{
applicationId: YOUR_APPLICATION_ID,
clientSecret: YOUR_CLIENT_SECRET,
}`;
  const response = `// success (200)
total_visitors


//Error
{
    error:"error"
}`;
  return (
    <div className="mt-8">
      <div>
        <span className="text-gray-500">integration</span>
        <h2 className="text-3xl text-gray-800 font-[450]">
          Integrating with your application
        </h2>
      </div>
      <div className="mt-8 ml-8 md:ml-16">
        <p className="mt-4">
          Now that you have registered your application and obtained your
          credentials, you can make a POST request to the Logger API endpoint to
          record visits and retrieve the latest statistics for your project.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-[450]">API Endpoint</h3>
          <Code
            code="https://logger-mocha-six.vercel.app/api/logger/v1"
            heading="Api"
          />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-[450]">Request Body</h3>
          <Code code={body} heading="JSON" />
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-[450]">Sample Request</h3>
          <mark>Use method="POST" to avoid cors issues</mark>
          <Code code={code} heading="Javascript" />
        </div>
      </div>
    </div>
  );
}

function Response() {
  const response = `// success (200)
total_visitors


//Error
{
    error:"error"
}`;
  return (
    <div className="mt-12">
      <div>
        <span className="text-gray-500">display</span>
        <h2 className="text-3xl text-gray-800 font-[450]">API Response</h2>
      </div>
      <Code code={response} heading="JSON" />
    </div>
  );
}
