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
  await connectDB();
  const rows = await request.json();

  if (!Array.isArray(rows)) {
    return NextResponse.json({ error: "Expected an array" }, { status: 400 });
  }

  const errors: string[] = [];
  let upserted = 0;

  for (const row of rows) {
    try {
      await BracketSchedule.findOneAndUpdate(
        { round: row.round, id: String(row.id) },
        row,
        { upsert: true, new: true }
      );
      upserted++;
    } catch (err) {
      errors.push(`Row ${row.id}: ${err}`);
    }
  }

  return NextResponse.json(
    { message: `Upserted ${upserted} entries.`, errors },
    {
      status: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
    }
  );
}
