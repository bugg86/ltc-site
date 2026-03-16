import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const ScheduleSchema = new mongoose.Schema({
  round:    { type: String, required: true },
  matchId:  { type: String, required: true },
  date:     { type: String, default: "" },
  time:     { type: String, default: "" },
  referee:  { type: String, default: "" },
  teams:    { type: [String], default: [] },
  mp:       { type: String, default: "" },
});

if (!mongoose.models.Schedule) {
  mongoose.model("Schedule", ScheduleSchema);
}

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

interface ScheduleRow {
  round: string;
  matchId: string;
  date: string;
  time: string;
  referee: string;
  teams: string[];
  mp: string;
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const rows: ScheduleRow[] = Array.isArray(body) ? body : [];

    if (rows.length === 0) {
      const res = NextResponse.json({ error: "Expected a non-empty array." }, { status: 400 });
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    let inserted = 0;
    let updated = 0;

    for (const row of rows) {
      const existing = await Schedule.findOne({ matchId: row.matchId });
      if (existing) {
        existing.round    = row.round;
        existing.date     = row.date;
        existing.time     = row.time;
        existing.referee  = row.referee;
        existing.teams    = row.teams;
        existing.mp       = row.mp;
        await existing.save();
        updated++;
      } else {
        await Schedule.create(row);
        inserted++;
      }
    }

    const res = NextResponse.json({
      success: true,
      message: `Processed ${rows.length} entries (${inserted} inserted, ${updated} updated).`,
      inserted,
      updated,
    });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error) {
    const res = NextResponse.json(
      { error: "Failed to import schedule", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}
