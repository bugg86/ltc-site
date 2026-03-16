import mongoose from "mongoose";
import fs from "fs";
import path from "path";

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
  beatmapLink: { type: String, required: true },
  beatmapCover: { type: String, required: false },
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

async function importMaps() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const filePath = path.join(__dirname, "map_data.json");
  const rawData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Importing ${rawData.length} maps...`);

  for (const map of rawData) {
    await Map.create({
      round: map.round,
      slot: map.slot,
      name: map.name,
      difficulty: map.difficulty,
      mapper: map.mapper,
      starRating: String(map.starRating),
      circleSize: String(map.circleSize),
      bpm: String(map.bpm),
      approachRate: String(map.approachRate),
      length: map.length,
      overallDifficulty: String(map.overallDifficulty),
      beatmapId: String(map.beatmapId),
      beatmapLink: map.beatmapLink,
      beatmapCover: map.beatmapCover,
    });
    console.log(`  Imported [${map.round}] ${map.slot} - ${map.name}`);
  }

  console.log(`Done! Imported ${rawData.length} maps.`);
  await mongoose.disconnect();
}

importMaps().catch((err) => {
  console.error(err);
  process.exit(1);
});
