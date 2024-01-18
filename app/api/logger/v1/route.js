import { supabase } from "@/supabase/config";
import { not } from "ip";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req, res) => {
  const data = JSON.parse(req.headers.get("x-logger-data"));
  return NextResponse.json(data, { status: 200 });
};
export const POST = async (req, response, context) => {
  try {
    const logs = JSON.parse(req.headers.get("x-logger-data"));
    const { clientSecret, applicationId } = await req.json();
    if (clientSecret && applicationId) {
      const { data: applicationDetails, error: applicationError } =
        await supabase
          .from("projects")
          .select()
          .eq("id", applicationId)
          .eq("clientSecret", clientSecret);
      if (!applicationError && applicationDetails.length > 0) {
        const count = applicationDetails[0].count + 1;
        const { data: logData, error: logdataError } = await supabase
          .from("logs")
          .select()
          .eq("ip", logs.ip)
          .eq("applicationId", applicationId);
        if (logData.length > 0) {
          // Already exists
          console.log("Visitors exist");
          const { error } = await supabase
            .from("projects")
            .update({ count: count })
            .eq("id", applicationId);
          if (!error) {
            return NextResponse.json(count, { status: 200 });
          } else {
            return NextResponse.json(
              { message: "Failed to update" },
              { status: 500 }
            );
          }
        } else {
          // new vistor
          console.log("new Visitor");
          const { data: newLog, error: logError } = await supabase
            .from("logs")
            .insert({
              ip: logs.ip,
              applicationId: applicationId,
              latitude: logs.latitude,
              longitude: logs.longitude,
              country: logs.country,
              city: logs.city,
              region: logs.region,
            })
            .select();
          const { error } = await supabase
            .from("projects")
            .update({ count: count })
            .eq("id", applicationId);
          if (!error) {
            return NextResponse.json(count, { status: 200 });
          } else {
            return NextResponse.json(
              { message: "Failed to update" },
              { status: 500 }
            );
          }
        }
      } else {
        return NextResponse.json(
          { message: "Invalid credentials" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Missing parameters" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};

//
// try {
//  1- check if Credential exist
//  2- if(exist)
//     2.a- check if credentails are true or not
//     2.b if(true)
//        2.b.i check if new visitor or old visitor
// } catch (error) {

// }
