// app/api/waitlist/count/route.ts

import { NextResponse } from "next/server";
import supabase from "@/lib/supabase";

export async function GET() {
  try {
    const { count, error } = await supabase
      .from("waitlist")
      .select("id", { count: "exact", head: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    const roundedCount = count !== null ? Math.ceil(count / 100) * 100 : 0;
    // console.log(roundedCount)
    return NextResponse.json({ count: roundedCount });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
