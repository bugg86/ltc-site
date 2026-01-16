import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ltcdb";

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  // Add more fields as needed
});

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const teams = await Team.find({}).populate("members");
  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const team = await Team.create(body);
  return NextResponse.json(team);
}
