import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request, response) => {
  const url = new URL(request.url);
  const ip = request.ip || "undefined";
  const city = request.geo.city || "undefined";
  const country = (request.geo && request.geo.country) || "IN";
  const region = request.geo.region || "Asia";
  const latitude = request.geo.latitude || "undefined";
  const longitude = request.geo.longitude || "undefined";
  const details = {
    ip: ip,
    url: url,
    country: country,
    region: region,
    city: city,
    latitude: latitude,
    longitude: longitude,
  };
  return NextResponse.json(details, { status: 200 });
};
