"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useState } from "react";

const POOLS = [
  "Qualifiers",
  "Round of 32",
  "Round of 16",
  "Quarterfinals",
  "Semifinals",
  "Finals",
  "Grandfinals",
];

interface ScheduleEntry {
  _id: string;
  round: string;
  matchId: string;
  date: string;
  time: string;
  referee: string;
  teams: string[];
  mp: string;
}

const COL = {
  id:       { width: "5%",  label: "ID" },
  date:     { width: "18%", label: "DATE / TIME (UTC)" },
  referee:  { width: "15%", label: "REFEREE" },
  teams:    { width: "52%", label: "TEAMS" },
  mp:       { width: "10%", label: "MP" },
};

function QualifiersTable({ entries }: { entries: ScheduleEntry[] }) {
  // Group rows by matchId, preserving insertion order
  const groups: Map<string, ScheduleEntry[]> = new Map();
  for (let i = 0; i < entries.length; i += 4) {
    groups.set(String(i), entries.slice(i, i + 4));
  }

  const headerStyle: React.CSSProperties = {
    color: "#FFF7C2",
    fontFamily: "var(--font-josefin-sans)",
    fontSize: "0.85vw",
    letterSpacing: "0.08em",
    textAlign: "left" as const,
    padding: "0.8vh 0.8vw",
  };

  const cellStyle: React.CSSProperties = {
    padding: "0.9vh 0.8vw",
    fontFamily: "var(--font-josefin-sans)",
    fontSize: "0.9vw",
    color: "#374426",
    verticalAlign: "middle" as const,
  };

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "2vh" }}>
      {Array.from(groups.entries()).map(([matchId, rows]) => (
        <div key={matchId}>
          {/* Header — no border or radius */}
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ ...headerStyle, width: COL.id.width }}>{COL.id.label}</th>
                <th style={{ ...headerStyle, width: COL.date.width }}>{COL.date.label}</th>
                <th style={{ ...headerStyle, width: COL.referee.width }}>{COL.referee.label}</th>
                <th style={{ ...headerStyle, width: COL.teams.width }}>{COL.teams.label}</th>
                <th style={{ ...headerStyle, width: COL.mp.width, textAlign: "right" }}>{COL.mp.label}</th>
              </tr>
            </thead>
          </table>

          {/* Body — bordered and rounded */}
          <div style={{ borderRadius: "0.5vw", overflow: "hidden", border: "1px solid rgba(255, 247, 194, 0.3)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: COL.id.width }} />
              <col style={{ width: COL.date.width }} />
              <col style={{ width: COL.referee.width }} />
              <col style={{ width: COL.teams.width }} />
              <col style={{ width: COL.mp.width }} />
            </colgroup>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row._id}
                style={{
                  backgroundColor: "#9FB878",
                  borderBottom: "1px solid rgba(255, 247, 194, 0.15)",
                }}
              >
                <td style={{ ...cellStyle, color: "#FFF7C2", fontFamily: "var(--font-sunlight-dreams)", fontWeight: 700 }}>
                  {row.matchId}
                </td>
                <td style={cellStyle}>
                  <span style={{ opacity: 0.8 }}>{row.date}</span>
                  {"  "}
                  <span style={{ fontWeight: 600 }}>{row.time}</span>
                </td>
                <td style={cellStyle}>{row.referee}</td>
                <td style={{ ...cellStyle, whiteSpace: "normal", overflowWrap: "break-word" }}>
                  {row.teams.join(" ÷ ")}
                </td>
                <td style={{ ...cellStyle, textAlign: "right" }}>
                  {row.mp && (
                    <a
                      href={`https://osu.ppy.sh/mp/${row.mp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#B2EAF1", textDecoration: "none", fontSize: "0.8vw" }}
                    >
                      {row.mp}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SchedulePage() {
  const [activePool, setActivePool] = useState("Qualifiers");
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/schedule?round=${encodeURIComponent(activePool)}`)
      .then((res) => res.json())
      .then((data) => { setEntries(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activePool]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: "-25vh",
          backgroundImage: "url(/bg1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
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
        Schedule
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
          paddingTop: "22.5vh",
          paddingLeft: "4vw",
          paddingRight: "4vw",
          paddingBottom: "10vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5vh",
        }}
      >
        {/* Tab navbar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2vw",
            borderRadius: "9999px",
            paddingLeft: "3vw",
            paddingRight: "3vw",
            paddingTop: "0.4vh",
            paddingBottom: "0.4vh",
            background: "linear-gradient(270deg, rgba(55, 68, 38, 0.34) 0%, rgba(55, 98, 42, 0.34) 100%)",
            border: "1px solid #9FB878",
          }}
        >
          {POOLS.map((pool) => (
            <button
              key={pool}
              onClick={() => setActivePool(pool)}
              style={{
                background: "none",
                border: "none",
                color: activePool === pool ? "#B2EAF1" : "#FFFCEA",
                fontFamily: "var(--font-sunlight-dreams)",
                fontSize: "1.25vw",
                cursor: "pointer",
                whiteSpace: "nowrap",
                padding: "0.4vh 0.8vw",
                transition: "color 0.15s",
                textDecoration: activePool === pool ? "underline" : "none",
              }}
            >
              {pool}
            </button>
          ))}
        </div>

        {/* Content */}
        <div style={{ width: "100%" }}>
          {loading ? (
            <p style={{ color: "#FFF7C2", fontFamily: "var(--font-josefin-sans)", fontSize: "1.2vw" }}>
              Loading schedule...
            </p>
          ) : entries.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4vh 0" }}>
              <p style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>
                No schedule found...
              </p>
              <img src="/teams/noteams.png" alt="" style={{ marginTop: "2vh" }} />
            </div>
          ) : activePool === "Qualifiers" ? (
            <QualifiersTable entries={entries} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4vh 0" }}>
              <p style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>
                Bracket stage schedule coming soon...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
