import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ltcdb";

const ScheduleSchema = new mongoose.Schema({
  event: { type: String, required: true },
  date: { type: Date, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  // Add more fields as needed
});

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const schedule = await Schedule.find({}).populate("teams");
  return NextResponse.json(schedule);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const event = await Schedule.create(body);
  return NextResponse.json(event);
}
