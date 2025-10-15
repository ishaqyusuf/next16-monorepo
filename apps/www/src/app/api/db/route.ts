import { prisma } from "@next16/db";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await prisma.user.count({});
  return NextResponse.json({
    data,
    error: null,
  });
}
