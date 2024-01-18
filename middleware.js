import { NextResponse } from "next/server";
export const config = {
  matcher: "/api/logger/v1",
};

export default function middleware(request, res, next) {
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
  // return NextResponse.json(details, { status: 200 });
}
