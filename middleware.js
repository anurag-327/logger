import { NextResponse } from "next/server";

const BLOCKED_COUNTRY = "SE";

export const config = {
  matcher: "/api/logger/v1",
};

export default function middleware(request) {
  const url = new URL(request.url);
  const ip = request.ip;
  const city = request.geo.city;
  const country = (request.geo && request.geo.country) || "US";
  const region = request.geo.region;
  // console.log(url, city, country, region);
  // request.geo.latitude
  // request.geo.longitude

  // console.log(`Visitor from ${country}`, request.ip);

  // if (country === BLOCKED_COUNTRY) {
  //   console.log("Bhaag bhootni ke");
  // } else {
  //   console.log("Aaja bete");
  // }

  // Rewrite to URL
  // return NextResponse.json(
  //   {
  //     ip: ip,
  //     url: url,
  //     country: country,
  //     region: region,
  //     city: city,
  //   },
  //   { status: 200 }
  // );
}
