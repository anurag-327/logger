import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (request, response) => {
  const url = new URL(request.url);
  const ip = request.ip;
  const city = request.geo.city;
  const country = (request.geo && request.geo.country) || "IN";
  const region = request.geo.region;
  const latitude = request.geo.latitude;
  const longitude = request.geo.longitude;
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
