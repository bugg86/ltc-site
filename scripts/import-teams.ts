import mongoose from "mongoose";
import fs from "fs";
import path from "path";

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
  player1: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  player3: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
});

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);
const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

interface RawPlayer {
  "User ID": number;
  Username: string;
  Discord: string;
  Country: string;
  profilePicture: string;
  profileLink: string;
  rank: number;
}

interface RawTeam {
  teamName: string;
  teamPicture: string;
  player1: RawPlayer;
  player2: RawPlayer;
  player3: RawPlayer;
}

async function insertPlayer(raw: RawPlayer) {
  return Player.create({
    osuName: raw.Username,
    discordName: raw.Discord,
    country: raw.Country,
    profilePicture: raw.profilePicture,
    profileLink: raw.profileLink,
    rank: raw.rank,
  });
}

async function importTeams() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected.");

  const filePath = path.join(__dirname, "team_data.json");
  const rawData: RawTeam[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  console.log(`Importing ${rawData.length} teams...`);

  for (const rawTeam of rawData) {
    const p1 = await insertPlayer(rawTeam.player1);
    const p2 = await insertPlayer(rawTeam.player2);
    const p3 = await insertPlayer(rawTeam.player3);

    await Team.create({
      teamName: rawTeam.teamName,
      teamPicture: rawTeam.teamPicture,
      player1: p1._id,
      player2: p2._id,
      player3: p3._id,
    });

    console.log(`  Imported "${rawTeam.teamName}" with 3 players`);
  }

  console.log(`Done! Imported ${rawData.length} teams and ${rawData.length * 3} players.`);
  await mongoose.disconnect();
}

importTeams().catch((err) => {
  console.error(err);
  process.exit(1);
});
