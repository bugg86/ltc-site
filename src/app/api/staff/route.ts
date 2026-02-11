import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@ltc-mongo:27017/ltcdb?authSource=ltcdb";

const StaffSchema = new mongoose.Schema({
  osuName: { type: String, required: true },
  position: { type: String, required: true },
  discordName: { type: String, required: true },
  role: { type: String },
  country: { type: String, required: true },
  profilePicture: { type: String, required: true },
  profileLink: { type: String },
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const position = searchParams.get("position");
  const filter = position ? { position } : {};
  const staff = await Staff.find(filter);
  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const staffMember = await Staff.create(body);
  return NextResponse.json(staffMember);
}
