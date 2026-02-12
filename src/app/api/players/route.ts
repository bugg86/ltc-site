import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const PlayerSchema = new mongoose.Schema({
  osuName: { type: String, required: true },
  discordName: { type: String, required: true },
  country: { type: String, required: true },
  profilePicture: { type: String, required: true },
  rank: { type: Number, required: true },
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
