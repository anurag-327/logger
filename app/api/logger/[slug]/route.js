import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export const GET = async (req, context) => {
  const userIP = req.headers["x-forwarded-for"];
  const detectedIp = requestIp.getClientIp(req);
  // console.log(userIP, detectedIp);
  const projectId = context.params.slug;
  if (projectId) {
    const { data, error } = await supabase
      .from("projects")
      .select("count")
      .eq("id", projectId);

    if (error) {
      return NextResponse.json(
        { message: "Failed to update" },
        { status: 500 }
      );
    } else {
      const count = data[0].count + 1;
      const { error2 } = await supabase
        .from("projects")
        .update({ count: count })
        .eq("id", projectId);
      if (error2)
        return NextResponse.json(
          { message: "Failed to update" },
          { status: 500 }
        );
      else
        return NextResponse.json(
          { message: "Success", count: count },
          { status: 200 }
        );
    }
    return NextResponse.json(
      { message: "Success", count: count },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Missing parameters" },
      { status: 401 }
    );
  }
};
