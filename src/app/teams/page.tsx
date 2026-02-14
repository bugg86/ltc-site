"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useState } from "react";

interface Player {
  _id: string;
  osuName: string;
  discordName: string;
  country: string;
  profilePicture: string;
  profileLink: string;
  rank: number;
}

interface Team {
  _id: string;
  teamName: string;
  teamPicture: string;
  player1: Player;
  player2: Player;
  player3: Player;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/teams")
      .then((res) => res.json())
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "-25vh",
          backgroundImage: "url(/teams/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "",
          backgroundSize: "100% auto",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <DesktopNavbar />
      <h1
        style={{
          position: "absolute",
          top: "19vh",
          left: "4vw",
          zIndex: 3,
          color: "#FFF7C2",
          fontFamily: "var(--font-sunlight-dreams)",
          fontSize: "4vw",
          margin: 0,
        }}
      >
        Teams
      </h1>
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "-10vw",
          width: "120vw",
          bottom: 0,
          background: "linear-gradient(0deg, #374426 0%, #37622A 50%, #9FB878 100%)",
          border: "6px solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "25vh",
          paddingLeft: "4vw",
          paddingRight: "4vw",
          paddingBottom: "10vh",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(159, 184, 120, 1)",
            border: "0.417vw solid rgba(255, 247, 194, 1)",
            borderRadius: "0.833vw",
            padding: "1.5vw",
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridAutoRows: "min-content",
            alignItems: "start",
            gap: "1.5vw",
          }}
        >
        {loading ? (
          <p style={{ fontSize: "24px", color: "#FFF7C2", gridColumn: "1 / -1" }}>Loading teams...</p>
        ) : teams.length === 0 ? (
          <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", alignItems: "center", padding: "4vh 0" }}>
            <p style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>No teams found...</p>
            <img src="/teams/noteams.png" alt="" style={{ marginTop: "2vh" }} />
          </div>
        ) : teams.map((team) => (
          <div
            key={team._id}
            style={{
              backgroundColor: "rgba(209, 223, 213, 1)",
              borderRadius: "0 0.833vw 0.833vw 0.833vw",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              alignSelf: "start",
              fontFamily: "var(--font-josefin-sans)",
            }}
          >
            {team.teamPicture && (
              <img
                src={team.teamPicture}
                alt={team.teamName}
                style={{
                  width: "100%",
                  display: "block",
                  objectFit: "cover",
                }}
              />
            )}
            <h3 style={{ margin: 0, padding: "0.5vh 0.6vw 0", color: "#000000", fontSize: "1.2vw", fontWeight: 700, fontFamily: "var(--font-josefin-sans)" }}>
              {team.teamName}
            </h3>
            <ul style={{ margin: 0, padding: "0.3vh 0.6vw 0.6vw", listStyle: "none", display: "flex", flexDirection: "column", gap: "2vh" }}>
              {[team.player1, team.player2, team.player3].flatMap((player, i, arr) => [
                <li key={player._id}>
                  <a
                    href={player.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#000000", fontSize: "0.85vw", display: "flex", alignItems: "center", gap: "0.4vw", textDecoration: "none" }}
                  >
                    {player.profilePicture && (
                      <img
                        src={player.profilePicture}
                        alt={player.osuName}
                        style={{
                          width: "3.8vw",
                          height: "3.8vw",
                          borderRadius: "0.5vw",
                          objectFit: "cover",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.2vh", flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>{player.osuName}</span>
                        {player.country && (
                          <img
                            src={player.country}
                            alt="country"
                            style={{ height: "0.85vw" }}
                          />
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.75 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.15vw" }}>
                          <img src="/teams/discord.png" alt="discord" style={{ height: "1vw" }} />
                          {player.discordName}
                        </span>
                        <span>#{player.rank}</span>
                      </div>
                    </div>
                  </a>
                </li>,
                ...(i < arr.length - 1 ? [<li key={`sep-${player._id}`} style={{ display: "flex", justifyContent: "center", margin: "-0.8vh 0" }}>
                  <img src="/teams/design.png" alt="" style={{ width: "10%" }} />
                </li>] : []),
              ])}
            </ul>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}
