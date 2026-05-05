import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const StaffSchema = new mongoose.Schema({
  position: { type: String, required: true },
  osuName: { type: String, required: true },
  role: { type: String, default: "" },
  discordName: { type: String, default: "" },
  profileLink: { type: String, default: "" },
  profilePicture: { type: String, default: "" },
  country: { type: String, default: "" },
});

const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);

interface RawEntry {
  position: string;
  osuName: string;
  role: string;
  discordName: string;
  profileLink: string;
  profilePicture: string;
  country: string;
}

async function importStaff() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const filePath = path.join(__dirname, "staff_data.json");
  const raw: RawEntry[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Importing ${raw.length} entries...`);

  for (const entry of raw) {
    await Staff.create({
      position: entry.position,
      osuName: entry.osuName,
      role: entry.role,
      discordName: entry.discordName,
      profileLink: entry.profileLink,
      profilePicture: entry.profilePicture,
      country: entry.country,
    });
  }

  console.log(`Done! Imported ${raw.length} staff entries.`);
  await mongoose.disconnect();
}

importStaff().catch((err) => {
  console.error(err);
  process.exit(1);
});
