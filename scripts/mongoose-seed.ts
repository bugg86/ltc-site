import mongoose from "mongoose";

// MongoDB connection URI (update as needed)
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://ltcuser:ltcpass@localhost:27017/ltcdb";

// Example schema definitions
const MapSchema = new mongoose.Schema({
  round: { type: String, required: true, unique: false },
  slot: { type: String, required: true, unique: false },
  name: { type: String, required: true, unique: false },
  difficulty: { type: String, required: true, unique: false },
  mapper: { type: String, required: true, unique: false },
  starRating: { type: String, required: true, unique: false },
  circleSize: { type: String, required: true, unique: false },
  bpm: { type: String, required: true, unique: false },
  approachRate: { type: String, required: true, unique: false },
  length: { type: String, required: true, unique: false },
  overallDifficulty: { type: String, required: true, unique: false },
  beatmapId: { type: String, required: true, unique: true },
  beatmapLink: { type: String, required: true, unique: true },
});

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
  player3: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: false },
});

const StaffSchema = new mongoose.Schema({
  osuName: { type: String, required: true, unique: false },
  position: { type: String, required: true, unique: false },
  discordName: { type: String, required: true, unique: false },
  role: { type: String, required: true, unique: false },
  country: { type: String, required: true, unique: false },
  profilePicture: { type: String, required: true, unique: false },
  profileLink: { type: String, required: false, unique: false },
});

const ScheduleSchema = new mongoose.Schema({
  round: { type: String, required: true, unique: false },
  lobbyId: { type: String, required: true, unique: true },
  date: { type: String, required: true, unique: false },
  time: { type: String, required: true, unique: false },
  referee: { type: String, required: true, unique: false },
  teams: { type: String, required: true, unique: false },
  mpLink: { type: String, required: true, unique: false }
});

// Example models
const Map = mongoose.model("Map", MapSchema);
const Staff = mongoose.model("Staff", StaffSchema);
const Player = mongoose.model("Player", PlayerSchema);
const Team = mongoose.model("Team", TeamSchema);
const Schedule = mongoose.model("Schedule", ScheduleSchema);

async function seed() {
  console.log("Seeding database...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  // Optional: Clear collections before seeding
  // await User.deleteMany({});
  // await Post.deleteMany({});

  // Example: Insert initial db values to generate collections
  await Map.create({
    round: "temp",
    slot: "NM1",
    name: "Harumachi Clover",
    difficulty: "Insane",
    mapper: "Sotarks",
    starRating: "5.5",
    circleSize: "3.0",
    bpm: "180",
    approachRate: "9.0",
    length: "90",
    overallDifficulty: "8.5",
    beatmapId: "4567089",
    beatmapLink: "temp",
  });

  await Player.create({
    osuName: "Convex",
    discordName: "convex",
    country: "US",
    profilePicture: "https://a.ppy.sh/11292327",
    rank: 25000,
  });

  await Player.create({
    osuName: "Accnome",
    discordName: "accnome",
    country: "US",
    profilePicture: "https://a.ppy.sh/10976433",
    rank: 4000,
  });

  await Player.create({
    osuName: "Valene",
    discordName: "valene",
    country: "US",
    profilePicture: "https://a.ppy.sh/8316080",
    rank: 10000,
  });

  await Team.create({
    teamName: "Example Team",
    teamPicture: "https://example.com/team.png",
    player1: await Player.findOne({ osuName: "Convex" }).then(p => p?._id),
    player2: await Player.findOne({ osuName: "Accnome" }).then(p => p?._id),
    player3: await Player.findOne({ osuName: "Valene" }).then(p => p?._id),
  });

  await Staff.create({
    osuName: "Convex",
    discordName: "convex",
    role: "Web Dev",
    position: "Website Developer",
    country: "https://osuflags.omkserver.nl/US.png",
    profilePicture: "https://a.ppy.sh/11292327",
    profileLink: "https://osu.ppy.sh/users/11292327"
  });

  await Schedule.create({});

  console.log("Database seeded!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
