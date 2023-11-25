import { NextResponse, NextRequest } from "next/server";
import requestIp from "request-ip";

export const GET = async (req, res) => {
  console.log("api/logger");
  const userIP = req.headers["x-forwarded-for"];
  const detectedIp = requestIp.getClientIp(req);
  console.log(userIP, detectedIp);
  console.log(req);
  console.log(req.url);
  return NextResponse.json({ message: req }, { status: 200 });
};
