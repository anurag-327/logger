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
  const requestHeaders = new Headers(request.headers);
  const userAgent = requestHeaders.get("user-agent");
  const host = requestHeaders.get("host");
  const referrer = request.referer || request.referrer;
  const parsedUA = parseUserAgent(userAgent);
  const data = {
    ip: ip,
    url: url,
    country: country,
    region: region,
    city: city,
    latitude: latitude,
    longitude: longitude,
    userAgent: parsedUA,
    ua: userAgent,
    host: host,
    referer: requestHeaders.get("referer"),
  };

  requestHeaders.set("x-logger-data", JSON.stringify(data));

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  return response;
}

function parseUserAgent(uaString) {
  const result = {
    browser: {
      name: null,
      version: null,
    },
    os: {
      name: null,
      version: null,
    },
    device: null,
  };

  // Regular expressions to match browser, version, and operating system
  const browserRegex = /(Chrome|Firefox|Safari|Edge)\/([0-9.]+)/i;
  const osRegex = /(Windows NT|Mac OS X|Linux|iOS|Android) ([0-9._]+)/i;
  const mobileRegex = /(Mobile|Tablet)/i;

  // Extract browser information
  const browserMatch = uaString.match(browserRegex);
  if (browserMatch) {
    result.browser.name = browserMatch[1];
    result.browser.version = browserMatch[2];
  }

  // Extract operating system information
  const osMatch = uaString.match(osRegex);
  if (osMatch) {
    result.os.name = osMatch[1];
    result.os.version = osMatch[2];
  }

  // Check for mobile or tablet device
  if (uaString.match(mobileRegex)) {
    result.device = "Mobile/Tablet";
  }

  return result;
}

// Example usage
