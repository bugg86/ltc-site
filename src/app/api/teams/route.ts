import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const PlayerSchema = new mongoose.Schema({
  osuName: { type: String, required: true, unique: false },
  discordName: { type: String, required: true, unique: false },
  country: { type: String, required: true, unique: false },
  profilePicture: { type: String, required: true, unique: false },
  profileLink: { type: String, required: true, unique: false },
  rank: { type: Number, required: true, unique: false },
});

const TeamSchema = new mongoose.Schema({
  teamName: { type: String, required: true, unique: false },
  teamPicture: { type: String, required: true, unique: false },
  player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  player3: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
});


if (!mongoose.models.Player) {
  mongoose.model("Player", PlayerSchema);
}

if (!mongoose.models.Team) {
  mongoose.model("Team", TeamSchema);
}

const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const teams = await Team.find({}).populate("player1").populate("player2").populate("player3");
  return NextResponse.json(teams);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const team = await Team.create(body);
  return NextResponse.json(team);
}
