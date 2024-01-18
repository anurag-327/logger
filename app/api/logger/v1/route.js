import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export const GET = async (req, res) => {
  return NextResponse.json(
    {
      url: req.url,
      country: req.country || "undefined",
      region: req.region || "undefined",
      city: req.city || "undefined",
    },
    { status: 200 }
  );
};
export const POST = async (req, res) => {
  console.log("Request recieved");
  console.log(req);
  return NextResponse.json({ message: "Hii, From logger" }, { status: 200 });
};
