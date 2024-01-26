export async function fetchVisitors() {
  const body = {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      clientSecret: process.env.NEXT_PUBLIC_LOGGER_CLIENTSECRET,
      applicationId: process.env.NEXT_PUBLIC_LOGGER_APPLICATIONID,
    }),
  };
  const res = await fetch(
    "https://logger-mocha-six.vercel.app/api/logger/v1",
    body
  );
  const json = await res.json();
  if (res.status === 200) return json || 0;
  else return 0;
}
