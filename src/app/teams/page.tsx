"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useState } from "react";

interface Player {
  _id: string;
  osuName: string;
  discordName: string;
  country: string;
  profilePicture: string;
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
          backgroundImage: "url(/teams/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "100% auto",
          opacity: 0.7,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <DesktopNavbar />
      <div
        style={{
          position: "absolute",
          top: "30vh",
          left: "-10vw",
          width: "120vw",
          bottom: 0,
          backgroundColor: "#374426",
          border: "6px solid #FFF7C2",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          paddingTop: "35vh",
          paddingLeft: "4vw",
          paddingRight: "4vw",
          paddingBottom: "10vh",
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gap: "1.5vw",
        }}
      >
        {loading ? (
          <p style={{ fontSize: "24px", color: "#FFF7C2", gridColumn: "1 / -1" }}>Loading teams...</p>
        ) : teams.map((team) => (
          <div
            key={team._id}
            style={{
              backgroundColor: "rgba(255, 247, 194, 0.9)",
              borderRadius: "0.833vw",
              padding: "1.2vw",
              display: "flex",
              flexDirection: "column",
              gap: "0.5vh",
            }}
          >
            <h3 style={{ margin: 0, color: "#374426", fontSize: "1.1vw", fontWeight: 700 }}>
              {team.teamName}
            </h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {[team.player1, team.player2, team.player3].map((player) => (
                <li key={player._id} style={{ color: "#374426", fontSize: "0.85vw" }}>
                  {player.osuName} ({player.country}) #{player.rank}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </div>
    </div>
  );
}
