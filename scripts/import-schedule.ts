import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const ScheduleSchema = new mongoose.Schema({
  round: { type: String, required: true },
  matchId: { type: String, required: true },
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  referee: { type: String, default: "" },
  teams: { type: [String], default: [] },
  mp: { type: String, default: "" },
});

const Schedule = mongoose.models.Schedule || mongoose.model("Schedule", ScheduleSchema);

interface RawEntry {
  round: string;
  lobbyId: string;
  date: string;
  time: string;
  referee: string;
  teams: string;
  mpLink: string;
}

async function importSchedule() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const filePath = path.join(__dirname, "schedule_data.json");
  const raw: RawEntry[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Importing ${raw.length} entries...`);

  for (const entry of raw) {
    await Schedule.create({
      round: entry.round,
      matchId: entry.lobbyId,
      date: entry.date,
      time: entry.time,
      referee: entry.referee,
      teams: entry.teams ? entry.teams.split("+").map((t) => t.trim()).filter(Boolean) : [],
      mp: entry.mpLink,
    });
  }

  console.log(`Done! Imported ${raw.length} schedule entries.`);
  await mongoose.disconnect();
}

importSchedule().catch((err) => {
  console.error(err);
  process.exit(1);
});
