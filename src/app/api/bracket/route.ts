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

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const round = searchParams.get("round");
  const query: Record<string, unknown> = { date: { $ne: "" } };
  if (round) query.round = round;
  const entries = await BracketSchedule.find(query);
  return NextResponse.json(entries);
}
