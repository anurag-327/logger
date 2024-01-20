import { supabase } from "@/supabase/config";

export const GET = async (request, response) => {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }
  const { data, error } = await supabase
    .from("logs")
    .delete()
    .lt("expires_at", getDate());
  return Response.json({ success: true });
};

function getDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based
  const day = currentDate.getDate();
  const date = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  return date;
}

// ("0 0 * * *"); cron expression for 12 AM everday
