import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export const dynamic = 'force-dynamic';
import { subDays, startOfDay, format } from "date-fns";

export async function GET(request: Request) {
  try {
    const now = new Date();
    const trends = [];

    // Generate 30 days of realistic synthetic data
    for (let i = 29; i >= 0; i--) {
      const date = format(subDays(now, i), "yyyy-MM-dd");

      // Base random counts with some "spikiness"
      const base = Math.floor(Math.random() * 10) + 5;
      const critical = Math.random() > 0.7 ? Math.floor(Math.random() * 3) : 0;
      const warning = Math.floor(Math.random() * 5) + 2;
      const info = base - critical - warning;

      trends.push({
        date,
        count: base,
        critical,
        warning: Math.max(0, warning),
        info: Math.max(0, info)
      });
    }

    return NextResponse.json(trends);
  } catch (error) {
    console.error("Failed to fetch trends:", error);
    return NextResponse.json({ error: "Failed to fetch trends" }, { status: 500 });
  }
}
