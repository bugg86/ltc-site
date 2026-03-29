import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const BracketScheduleSchema = new mongoose.Schema({
  round: { type: String, default: "" },
  id: { type: String, default: "" },
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  referee: { type: String, default: "" },
  team1: { type: String, default: "" },
  team1Score: { type: String, default: "" },
  team2Score: { type: String, default: "" },
  team2: { type: String, default: "" },
  commentators: { type: String, default: "" },
  vod: { type: String, default: "" },
  vodLink: { type: String, default: "" },
  mpLink: { type: String, default: "" },
  mpId: { type: String, default: "" },
});

const BracketSchedule = mongoose.models.BracketSchedule || mongoose.model("BracketSchedule", BracketScheduleSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
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
    const rows = Array.isArray(body) ? body : [];

    if (rows.length === 0) {
      const res = NextResponse.json({ error: "Expected a non-empty array." }, { status: 400 });
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }

    let inserted = 0;
    let updated = 0;

    for (const row of rows) {
      const existing = await BracketSchedule.findOne({ round: row.round, id: String(row.id) });
      if (existing) {
        await BracketSchedule.findOneAndUpdate({ round: row.round, id: String(row.id) }, row);
        updated++;
      } else {
        await BracketSchedule.create(row);
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
      { error: "Failed to import bracket", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
}
