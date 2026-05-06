"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useRef, useState } from "react";

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
  player3?: Player;
}

function ScrollingDiscordName({ name }: { name: string }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const check = () => setOverflows(el.scrollWidth > el.clientWidth);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(el);
    return () => observer.disconnect();
  }, [name]);

  return (
    <span style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
      <span
        ref={textRef}
        className={`discord-name-text${overflows ? " discord-name-overflow" : ""}`}
      >
        {name}
      </span>
    </span>
  );
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
      <style>{`
        .discord-name-text {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .team-card:hover .discord-name-overflow {
          overflow: visible;
          text-overflow: clip;
          animation: discord-marquee 4s linear infinite;
        }
        @keyframes discord-marquee {
          0%, 15% { transform: translateX(0); }
          85%, 100% { transform: translateX(-130%); }
        }
        @media (max-width: 768px) {
          .teams-grid {
            grid-template-columns: repeat(1, 1fr) !important;
            gap: 4vw !important;
            padding: 3vw !important;
            border-radius: 4vw !important;
            border-width: 2px !important;
          }
          .team-card-name {
            font-size: 3.5vw !important;
            padding: 1.5vw 2vw 0 !important;
          }
          .team-player-list {
            gap: 3vw !important;
            padding: 1vw 2vw 2vw !important;
          }
          .team-player-link {
            font-size: 2.8vw !important;
            gap: 2vw !important;
          }
          .team-player-avatar {
            width: 12vw !important;
            height: 12vw !important;
            border-radius: 1.5vw !important;
          }
          .team-country-flag {
            height: 2.8vw !important;
          }
          .team-discord-icon {
            height: 3.5vw !important;
          }
          .team-no-teams-msg {
            font-size: 5vw !important;
          }
        }
      `}</style>
      {/* Mobile background */}
      <div
        className="md:hidden"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(/teams/bg.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "200% auto",
          opacity: 1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Desktop background */}
      <div
        className="hidden md:block"
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
        className="relative z-3 px-4 pt-[14vh] text-[10vw] md:absolute md:px-0 md:pt-0 md:top-[19vh] md:left-[4vw] md:text-[4vw]"
        style={{ color: "#FFF7C2", fontFamily: "var(--font-sunlight-dreams)", margin: 0 }}
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
      <div className="relative z-2 pt-[4vh] px-4 pb-[10vh] md:pt-[25vh] md:px-[4vw]">
        <div
          className="teams-grid"
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
            <p className="team-no-teams-msg" style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>No teams found...</p>
            <img src="/teams/noteams.png" alt="" style={{ marginTop: "2vh", maxWidth: "80vw" }} />
          </div>
        ) : teams.map((team) => (
          <div
            key={team._id}
            className="team-card"
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
            <h3 className="team-card-name" style={{ margin: 0, padding: "0.5vh 0.6vw 0", color: "#000000", fontSize: "1.2vw", fontWeight: 700, fontFamily: "var(--font-josefin-sans)" }}>
              {team.teamName}
            </h3>
            <ul className="team-player-list" style={{ margin: 0, padding: "0.3vh 0.6vw 0.6vw", listStyle: "none", display: "flex", flexDirection: "column", gap: "2vh" }}>
              {[team.player1, team.player2, team.player3].filter((p): p is Player => p !== undefined).flatMap((player, i, arr) => [
                <li key={player._id}>
                  <a
                    href={player.profileLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="team-player-link"
                    style={{ color: "#000000", fontSize: "0.85vw", display: "flex", alignItems: "center", gap: "0.4vw", textDecoration: "none" }}
                  >
                    {player.profilePicture && (
                      <img
                        src={player.profilePicture}
                        alt={player.osuName}
                        className="team-player-avatar"
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
                            className="team-country-flag"
                            style={{ height: "0.85vw" }}
                          />
                        )}
                      </div>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", opacity: 0.75 }}>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.15vw", flex: 1, minWidth: 0, overflow: "hidden" }}>
                          <img src="/teams/discord.png" alt="discord" className="team-discord-icon" style={{ height: "1vw", flexShrink: 0 }} />
                          <ScrollingDiscordName name={player.discordName} />
                        </span>
                        <span style={{ flexShrink: 0, marginLeft: "0.3vw" }}>#{player.rank}</span>
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
