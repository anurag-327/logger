import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";
export const POST = async (req, res, context) => {
  try {
    const { clientSecret, applicationId } = await req.json();
    if (applicationId && clientSecret) {
      const { data, error } = await supabase
        .from("projects")
        .select()
        .eq("id", applicationId);
      if (error) {
        return NextResponse.json(
          { message: "Failed to update", error: error.message },
          { status: 500 }
        );
      } else {
        if (data.length > 0) {
          if (data[0].clientSecret == clientSecret) {
            const count = data[0].count + 1;
            const { error2 } = await supabase
              .from("projects")
              .update({ count: count })
              .eq("id", applicationId);
            if (error2)
              return NextResponse.json(
                { message: "Failed to update", error: error2.message },
                { status: 500 }
              );
            else return NextResponse.json(count, { status: 200 });
          } else {
            return NextResponse.json(
              { message: "Failed to update", error: "Invalid credential" },
              { status: 401 }
            );
          }
        } else {
          return NextResponse.json(
            { message: "Failed to update", error: "Invalid application id" },
            { status: 401 }
          );
        }
      }
    } else {
      return NextResponse.json(
        { message: "Missing parameters", error: "Missing Parameter" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
};
export const GET = async (req, res, context) => {
  console.log("Request recieved");
  return NextResponse.json({ message: "Hii, From logger" }, { status: 200 });
};
