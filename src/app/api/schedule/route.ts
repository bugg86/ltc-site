import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const ScheduleSchema = new mongoose.Schema({
  round: { type: String, required: true },
  matchId: { type: String, required: true },
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  referee: { type: String, default: "" },
  teams: { type: [String], default: [] },
  mp: { type: String, default: "" },
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

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const round = searchParams.get("round");
  const query = round ? { round } : {};
  const schedules = await Schedule.find(query);
  return NextResponse.json(schedules);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const entry = await Schedule.create(body);
  return NextResponse.json(entry);
}
