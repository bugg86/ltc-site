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
  player1: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
  player3: { type: mongoose.Schema.Types.ObjectId, ref: "Player", required: true },
});

if (!mongoose.models.Player) {
  mongoose.model("Player", PlayerSchema);
}

if (!mongoose.models.Team) {
  mongoose.model("Team", TeamSchema);
}

const Player = mongoose.models.Player || mongoose.model("Player", PlayerSchema);
const Team = mongoose.models.Team || mongoose.model("Team", TeamSchema);

interface PlayerRow {
  teamName: string;
  teamPicture: string;
  discordName: string;
  country: string;
  profilePicture: string;
  profileLink: string;
  rank: number;
  osuName?: string; // Optional, can be derived from profileLink if needed
}

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

async function insertPlayer(raw: PlayerRow) {
  // Extract osuName from profileLink if not provided
  // Profile link format: https://osu.ppy.sh/users/12345 or https://osu.ppy.sh/users/username
  let osuName = raw.osuName;
  if (!osuName && raw.profileLink) {
    const match = raw.profileLink.match(/\/users\/([^\/]+)/);
    osuName = match ? match[1] : raw.discordName; // Fallback to discord name
  }

  // Check if player already exists by osuName
  const existingPlayer = await Player.findOne({ osuName });

  if (existingPlayer) {
    // Update existing player with new data
    existingPlayer.discordName = raw.discordName;
    existingPlayer.country = raw.country;
    existingPlayer.profilePicture = raw.profilePicture;
    existingPlayer.profileLink = raw.profileLink;
    existingPlayer.rank = raw.rank;
    await existingPlayer.save();
    return existingPlayer;
  }

  // Create new player if doesn't exist
  return Player.create({
    osuName,
    discordName: raw.discordName,
    country: raw.country,
    profilePicture: raw.profilePicture,
    profileLink: raw.profileLink,
    rank: raw.rank,
  });
}

export async function OPTIONS(request: Request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const playerRows: PlayerRow[] = Array.isArray(body) ? body : body.players || [];

    if (!Array.isArray(playerRows) || playerRows.length === 0) {
      const errorResponse = NextResponse.json(
        { error: "Invalid data format. Expected an array of player rows." },
        { status: 400 }
      );
      errorResponse.headers.set('Access-Control-Allow-Origin', '*');
      return errorResponse;
    }

    // Group players by team
    const teamMap = new Map<string, PlayerRow[]>();

    for (const playerRow of playerRows) {
      if (!teamMap.has(playerRow.teamName)) {
        teamMap.set(playerRow.teamName, []);
      }
      teamMap.get(playerRow.teamName)!.push(playerRow);
    }

    const importedTeams = [];
    const updatedTeams = [];
    const errors: string[] = [];

    // Process each team
    for (const [teamName, players] of teamMap.entries()) {
      if (players.length !== 3) {
        errors.push(`Team "${teamName}" has ${players.length} players, expected 3. Skipping.`);
        continue;
      }

      try {
        // Insert all players for this team
        const p1 = await insertPlayer(players[0]);
        const p2 = await insertPlayer(players[1]);
        const p3 = await insertPlayer(players[2]);

        const teamPicture = players[0].teamPicture;

        // Check if team already exists by teamName
        const existingTeam = await Team.findOne({ teamName });

        if (existingTeam) {
          // Update existing team
          existingTeam.teamPicture = teamPicture;
          existingTeam.player1 = p1._id;
          existingTeam.player2 = p2._id;
          existingTeam.player3 = p3._id;
          await existingTeam.save();
          updatedTeams.push(existingTeam);
        } else {
          // Create new team
          const team = await Team.create({
            teamName,
            teamPicture,
            player1: p1._id,
            player2: p2._id,
            player3: p3._id,
          });
          importedTeams.push(team);
        }
      } catch (error) {
        errors.push(`Error processing team "${teamName}": ${error instanceof Error ? error.message : String(error)}`);
      }
    }

    const totalTeams = importedTeams.length + updatedTeams.length;
    const totalPlayers = totalTeams * 3;

    const response = NextResponse.json({
      success: true,
      message: `Processed ${totalTeams} teams (${importedTeams.length} new, ${updatedTeams.length} updated) and ${totalPlayers} players.`,
      teamsCreated: importedTeams.length,
      teamsUpdated: updatedTeams.length,
      totalTeamsProcessed: totalTeams,
      totalPlayersProcessed: totalPlayers,
      errors: errors.length > 0 ? errors : undefined,
    });

    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error("Error importing teams:", error);
    const errorResponse = NextResponse.json(
      { error: "Failed to import teams", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
    errorResponse.headers.set('Access-Control-Allow-Origin', '*');
    return errorResponse;
  }
}
