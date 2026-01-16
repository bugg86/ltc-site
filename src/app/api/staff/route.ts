import mongoose from "mongoose";
import { NextResponse } from "next/server";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ltcdb";

const StaffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  // Add more fields as needed
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function GET(request: Request) {
  await connectDB();
  const staff = await Staff.find({});
  return NextResponse.json(staff);
}

export async function POST(request: Request) {
  await connectDB();
  const body = await request.json();
  const staffMember = await Staff.create(body);
  return NextResponse.json(staffMember);
}
