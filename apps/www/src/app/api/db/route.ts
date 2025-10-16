import { PrismaClient } from "@next16/db";
import { NextRequest, NextResponse } from "next/server";

const db = new PrismaClient();
export async function GET(req: NextRequest) {
  // get search params
  const q = req.nextUrl.searchParams.get("q");
  if (!q)
    return NextResponse.json({
      data: {},
      error: "No query provided",
    });
  const data = await db.user.count({});
  return NextResponse.json({
    data,
    error: null,
  });
}
