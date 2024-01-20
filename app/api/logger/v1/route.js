import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req, res) => {
  return NextResponse.json(
    {
      message: "Hii, from logger",
      note: "Visit logger playground to get started with logger.",
      playground: "https://logger-mocha-six.vercel.app/playground",
    },
    { status: 200 }
  );
};
export const POST = async (req, res, context) => {
  try {
    const logs = JSON.parse(req.headers.get("x-logger-data"));
    const { clientSecret, applicationId } = await req.json();
    if (clientSecret && applicationId) {
      const { data: applicationDetails, error: applicationError } =
        await getApllication(applicationId, clientSecret);
      if (!applicationError && applicationDetails.length > 0) {
        const updatedCount = applicationDetails[0].count + 1;
        if (logs.ip === "127.0.0.1")
          return NextResponse.json(updatedCount, { status: 200 });
        const { data: newLog, error: logError } = await setLogs(
          logs,
          applicationId
        );
        const { error } = await updatecount(updatedCount, applicationId);
        if (!error && !logError) {
          return NextResponse.json(updatedCount, { status: 200 });
        } else {
          console.log(error, logError);
          return sendErrorResponse("Failed to update", 500);
        }
      } else {
        return sendErrorResponse("Invalid Credentials", 401);
      }
    } else {
      return sendErrorResponse("Missing Parameters", 401);
    }
  } catch (error) {
    return sendErrorResponse(error.message, 500);
  }
};

async function getApllication(applicationId, clientSecret) {
  const { data, error } = await supabase
    .from("projects")
    .select()
    .eq("id", applicationId)
    .eq("clientSecret", clientSecret);

  return { data, error };
}
async function setLogs(logs, applicationId) {
  const currentDate = new Date();

  const { data, error } = await supabase
    .from("logs")
    .insert({
      ip: logs.ip,
      applicationId: applicationId,
      latitude: logs.latitude,
      longitude: logs.longitude,
      country: logs.country,
      city: logs.city,
      region: logs.region,
      host: logs.host,
      userAgent: logs.userAgent,
      ua: logs.ua,
      referer: logs.referer,
      expires_at: getExpiryDate(),
    })
    .select();
  return { data, error };
}
async function updatecount(count, applicationId) {
  const { error } = await supabase
    .from("projects")
    .update({ count: count })
    .eq("id", applicationId);
  return { error };
}
function sendErrorResponse(error, status) {
  return NextResponse.json({ error: error }, { status: status });
}

function getExpiryDate() {
  const currentDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  const date = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  return date;
}

//
// try {
//  1- check if Credential exist
//  2- if(exist)
//     2.a- check if credentails are true or not
//     2.b if(true)
//        2.b.i add logs and update count
// } catch (error) {

// }
