import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const MapSchema = new mongoose.Schema({
  round: { type: String, required: true },
  slot: { type: String, required: true },
  name: { type: String, required: true },
  difficulty: { type: String, required: true },
  mapper: { type: String, required: true },
  starRating: { type: String, required: true },
  circleSize: { type: String, required: true },
  bpm: { type: String, required: true },
  approachRate: { type: String, required: true },
  length: { type: String, required: true },
  overallDifficulty: { type: String, required: true },
  beatmapId: { type: String, required: true, unique: true },
  beatmapLink: { type: String, required: true, unique: true },
  beatmapCover: { type: String, required: false },
});

if (!mongoose.models.Map) {
  mongoose.model("Map", MapSchema);
}

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

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
  const maps = await Map.find(query);
  return NextResponse.json(maps);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const map = await Map.create(body);
  return NextResponse.json(map);
}
