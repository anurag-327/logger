import { NextResponse } from "next/server";
export const config = {
  matcher: "/api/logger/v1",
};

export default function middleware(request, res, next) {
  const ip = request.ip || "127.0.0.1";
  const city = request.geo.city || "Delhi";
  const country = (request.geo && request.geo.country) || "IN";
  const region = request.geo.region || "Delhi";
  const latitude = request.geo.latitude || "28.64857000";
  const longitude = request.geo.longitude || "77.21895000";
  const url = request.url;
  const userAgent = request.userAgent || "undefined";
  const ua = request.ua || "undefined";
  const data = {
    ip: ip,
    url: url,
    country: country,
    region: region,
    city: city,
    latitude: latitude,
    longitude: longitude,
    userAgent: userAgent,
    ua: ua,
  };
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-logger-data", JSON.stringify(data));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return response;
}
