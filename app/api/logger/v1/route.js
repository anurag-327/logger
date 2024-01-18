import { supabase } from "@/supabase/config";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req, res) => {
  const data = JSON.parse(req.headers.get("x-logger-data"));

  return NextResponse.json(data, { status: 200 });
};
export const POST = async (req, response, context) => {
  const data = JSON.parse(req.headers.get("x-logger-data"));
  const { clientSecret, applicationId } = await req.json();
  console.log(clientSecret, applicationId);
  return NextResponse.json(data, { status: 200 });
};
