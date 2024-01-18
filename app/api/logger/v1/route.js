import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export const GET = async (request, res) => {
  const url = new URL(request.url);
  const ip = request.ip;
  const city = request.geo.city;
  const country = (request.geo && request.geo.country) || "US";
  const region = request.geo.region;
  return NextResponse.json(
    {
      ip: ip,
      url: url,
      country: country,
      region: region,
      city: city,
    },
    { status: 200 }
  );
};
export const POST = async (req, res) => {
  console.log("Request recieved");
  console.log(req);
  return NextResponse.json({ message: "Hii, From logger" }, { status: 200 });
};
