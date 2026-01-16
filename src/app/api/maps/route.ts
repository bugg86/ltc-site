import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ltcdb";

const MapSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: String },
  // Add more fields as needed
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const maps = await Map.find({});
  return NextResponse.json(maps);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const map = await Map.create(body);
  return NextResponse.json(map);
}
