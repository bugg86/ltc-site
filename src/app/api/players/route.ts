import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ltcdb";

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  rank: { type: Number },
  // Add more fields as needed
});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const players = await Player.find({}).populate("team");
  return NextResponse.json(players);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const player = await Player.create(body);
  return NextResponse.json(player);
}
