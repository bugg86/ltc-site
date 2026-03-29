import mongoose from "mongoose";
import fs from "fs";
import path from "path";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb?authSource=ltcdb";

const BracketScheduleSchema = new mongoose.Schema({
  round: { type: String, default: "" },
  id: { type: String, default: "" },
  date: { type: String, default: "" },
  time: { type: String, default: "" },
  referee: { type: String, default: "" },
  team1: { type: String, default: "" },
  team1Score: { type: String, default: "" },
  team2Score: { type: String, default: "" },
  team2: { type: String, default: "" },
  commentators: { type: String, default: "" },
  vod: { type: String, default: "" },
  vodLink: { type: String, default: "" },
  mpLink: { type: String, default: "" },
  mpId: { type: String, default: "" },
});

const BracketSchedule = mongoose.models.BracketSchedule || mongoose.model("BracketSchedule", BracketScheduleSchema);

async function importBracket() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const filePath = path.join(__dirname, "bracket_data.json");
  const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Importing ${rawData.length} bracket entries...`);

  for (const entry of rawData) {
    await BracketSchedule.findOneAndUpdate(
      { round: entry.round, id: String(entry.id) },
      {
        round: entry.round,
        id: String(entry.id),
        date: entry.date || "",
        time: entry.time || "",
        referee: entry.referee || "",
        team1: entry.team1 || "",
        team1Score: String(entry.team1Score ?? ""),
        team2Score: String(entry.team2Score ?? ""),
        team2: entry.team2 || "",
        commentators: entry.commentators || "",
        vod: entry.vod || "",
        vodLink: entry.vodLink || "",
        mpLink: entry.mpLink || "",
        mpId: String(entry.mpId ?? ""),
      },
      { upsert: true, new: true }
    );
    console.log(`  Upserted [${entry.round}] #${entry.id} - ${entry.team1} vs ${entry.team2}`);
  }

  console.log(`Done! Imported ${rawData.length} entries.`);
  await mongoose.disconnect();
}

importBracket().catch((err) => {
  console.error(err);
  process.exit(1);
});
