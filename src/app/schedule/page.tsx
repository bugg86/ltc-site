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
  "Grand Finals",
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

interface BracketEntry {
  _id: string;
  round: string;
  id: string;
  date: string;
  time: string;
  referee: string;
  team1: string;
  team1Score: string;
  team2Score: string;
  team2: string;
  commentators: string;
  vod: string;
  vodLink: string;
  mpLink: string;
  mpId: string;
}

const COL = {
  id:       { width: "5%",  label: "ID" },
  date:     { width: "18%", label: "DATE / TIME (UTC)" },
  referee:  { width: "15%", label: "REFEREE" },
  teams:    { width: "52%", label: "TEAMS" },
  mp:       { width: "10%", label: "MP" },
};

function QualifiersTable({ entries }: { entries: ScheduleEntry[] }) {
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
      {Array.from(groups.entries()).map(([matchId, rows], index) => (
        <div key={matchId}>
        <div className="sched-scroll-wrap">
          <div className="sched-inner-wrap">
            {/* Header */}
            <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
              <thead>
                <tr>
                  <th className="sched-header" style={{ ...headerStyle, width: COL.id.width }}>{COL.id.label}</th>
                  <th className="sched-header" style={{ ...headerStyle, width: COL.date.width }}>{COL.date.label}</th>
                  <th className="sched-header" style={{ ...headerStyle, width: COL.referee.width }}>{COL.referee.label}</th>
                  <th className="sched-header" style={{ ...headerStyle, width: COL.teams.width }}>{COL.teams.label}</th>
                  <th className="sched-header" style={{ ...headerStyle, width: COL.mp.width, textAlign: "center" }}>{COL.mp.label}</th>
                </tr>
              </thead>
            </table>

            {/* Body */}
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
                    <tr key={row._id} style={{ backgroundColor: "#9FB878", borderBottom: "1px solid rgba(255, 247, 194, 0.15)" }}>
                      <td className="sched-cell" style={{ ...cellStyle, color: "#FFF7C2", fontFamily: "var(--font-sunlight-dreams)", fontWeight: 700 }}>
                        {row.matchId}
                      </td>
                      <td className="sched-cell" style={cellStyle}>
                        <span style={{ opacity: 0.8 }}>{row.date}</span>
                        {"  "}
                        <span style={{ fontWeight: 600 }}>{row.time}</span>
                      </td>
                      <td className="sched-cell" style={{ ...cellStyle, overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{row.referee}</td>
                      <td className="sched-cell" style={{ ...cellStyle, whiteSpace: "normal", overflowWrap: "break-word", wordBreak: "break-word" }}>
                        {row.teams.join(" ÷ ")}
                      </td>
                      <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>
                        {row.mp && (
                          <a href={row.mp} target="_blank" rel="noopener noreferrer" className="mp-link" style={{ color: "inherit" }}>
                            {row.mp.split("/").pop()}
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {index === 0 && (
          <p className="sched-scroll-hint">swipe to scroll →</p>
        )}
        </div>
      ))}
    </div>
  );
}

const BRACKET_COL = {
  id:          { width: "4%",  label: "ID" },
  date:        { width: "12%", label: "DATE / TIME (UTC)" },
  referee:     { width: "9%",  label: "REFEREE" },
  team1:       { width: "14%", label: "TEAM 1" },
  score:       { width: "8%",  label: "SCORE" },
  team2:       { width: "14%", label: "TEAM 2" },
  commentators:{ width: "14%", label: "COMMENTATORS" },
  vod:         { width: "8%",  label: "VOD" },
  mp:          { width: "8%",  label: "MP" },
};

function BracketTable({ entries }: { entries: BracketEntry[] }) {
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
    <div className="sched-scroll-wrap" style={{ width: "100%" }}>
      <div className="bracket-inner-wrap" style={{ display: "flex", flexDirection: "column", gap: "2vh" }}>
        {/* Header */}
        <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
          <thead>
            <tr>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.id.width, textAlign: "center" }}>{BRACKET_COL.id.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.date.width, textAlign: "center" }}>{BRACKET_COL.date.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.referee.width, textAlign: "center" }}>{BRACKET_COL.referee.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.team1.width, textAlign: "center" }}>{BRACKET_COL.team1.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.score.width, textAlign: "center" }}>{BRACKET_COL.score.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.team2.width, textAlign: "center" }}>{BRACKET_COL.team2.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.commentators.width, textAlign: "center" }}>{BRACKET_COL.commentators.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.vod.width, textAlign: "center" }}>{BRACKET_COL.vod.label}</th>
              <th className="sched-header" style={{ ...headerStyle, width: BRACKET_COL.mp.width, textAlign: "center" }}>{BRACKET_COL.mp.label}</th>
            </tr>
          </thead>
        </table>

        {/* Body */}
        <div style={{ borderRadius: "0.5vw", overflow: "hidden", border: "1px solid rgba(255, 247, 194, 0.3)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            <colgroup>
              <col style={{ width: BRACKET_COL.id.width }} />
              <col style={{ width: BRACKET_COL.date.width }} />
              <col style={{ width: BRACKET_COL.referee.width }} />
              <col style={{ width: BRACKET_COL.team1.width }} />
              <col style={{ width: BRACKET_COL.score.width }} />
              <col style={{ width: BRACKET_COL.team2.width }} />
              <col style={{ width: BRACKET_COL.commentators.width }} />
              <col style={{ width: BRACKET_COL.vod.width }} />
              <col style={{ width: BRACKET_COL.mp.width }} />
            </colgroup>
            <tbody>
              {entries.map((row) => (
                <tr key={row._id} style={{ backgroundColor: "#9FB878", borderBottom: "1px solid rgba(255, 247, 194, 0.15)" }}>
                  <td className="sched-cell" style={{ ...cellStyle, color: "#FFF7C2", fontFamily: "var(--font-sunlight-dreams)", fontWeight: 700, textAlign: "center" }}>
                    {row.id}
                  </td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>
                    <span style={{ opacity: 0.8 }}>{row.date}</span>
                    {"  "}
                    <span style={{ fontWeight: 600 }}>{row.time}</span>
                  </td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>{row.referee}</td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>{row.team1}</td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>
                    {row.team1Score || row.team2Score ? (() => {
                      const s1 = Number(row.team1Score);
                      const s2 = Number(row.team2Score);
                      const t1Color = row.team2Score === "FF" || s1 > s2 ? "#F94F52" : "inherit";
                      const t2Color = row.team1Score === "FF" || s2 > s1 ? "#F94F52" : "inherit";
                      return (
                        <>
                          <span style={{ color: t1Color }}>{row.team1Score}</span>
                          {" - "}
                          <span style={{ color: t2Color }}>{row.team2Score}</span>
                        </>
                      );
                    })() : ""}
                  </td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>{row.team2}</td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>{row.commentators}</td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>
                    {row.vod === "FALSE" ? (
                      <span>✗</span>
                    ) : row.vodLink ? (
                      <a href={row.vodLink} target="_blank" rel="noopener noreferrer" className="mp-link" style={{ color: "inherit" }}>✓</a>
                    ) : null}
                  </td>
                  <td className="sched-cell" style={{ ...cellStyle, textAlign: "center" }}>
                    {row.mpId ? (
                      <a href={row.mpId} target="_blank" rel="noopener noreferrer" className="mp-link" style={{ color: "inherit" }}>
                        {row.mpLink}
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function SchedulePage() {
  const [activePool, setActivePool] = useState("Qualifiers");
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [bracketEntries, setBracketEntries] = useState<BracketEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (activePool === "Qualifiers") {
      fetch(`/api/schedule?round=${encodeURIComponent(activePool)}`)
        .then((res) => res.json())
        .then((data) => { setEntries(data); setLoading(false); })
        .catch(() => setLoading(false));
    } else {
      fetch(`/api/bracket?round=${encodeURIComponent(activePool)}`)
        .then((res) => res.json())
        .then((data) => { setBracketEntries(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, [activePool]);

  return (
    <div style={{ width: "100%", minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <style>{`
        .sched-scroll-hint {
          display: none;
        }
        @media (max-width: 768px) {
          .pool-tab-bar {
            gap: 0 !important;
            padding-left: 2vw !important;
            padding-right: 2vw !important;
            overflow-x: auto !important;
            width: 100% !important;
            box-sizing: border-box !important;
            justify-content: flex-start !important;
          }
          .pool-tab-btn {
            font-size: 3.5vw !important;
            padding: 0.4vh 3vw !important;
            flex-shrink: 0 !important;
          }
          .sched-scroll-wrap {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
          }
          .sched-inner-wrap {
            min-width: 580px;
          }
          .bracket-inner-wrap {
            min-width: 740px;
          }
          .sched-header {
            font-size: 3vw !important;
            padding: 1.5vw 2vw !important;
          }
          .sched-cell {
            font-size: 3vw !important;
            padding: 1.5vw 2vw !important;
          }
          .sched-scroll-hint {
            display: block;
            text-align: right;
            font-size: 3vw;
            color: #FFF7C2;
            opacity: 0.7;
            font-family: var(--font-josefin-sans);
            margin-top: 1vw;
          }
          .no-sched-msg {
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
          backgroundImage: "url(/bg1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "200% auto",
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
          backgroundImage: "url(/bg1.webp)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% auto",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <DesktopNavbar />

      <h1
        className="relative z-3 px-4 pt-[14vh] text-[10vw] md:absolute md:px-0 md:pt-0 md:top-[19vh] md:left-[4vw] md:text-[4vw]"
        style={{ color: "#FFF7C2", fontFamily: "var(--font-sunlight-dreams)", margin: 0 }}
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
        className="relative z-2 pt-[4vh] px-4 pb-[10vh] md:pt-[22.5vh] md:px-[4vw]"
        style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5vh" }}
      >
        {/* Tab navbar */}
        <div
          className="pool-tab-bar"
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
              className="pool-tab-btn"
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
              <p className="no-sched-msg" style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>
                No schedule found...
              </p>
              <img src="/teams/noteams.png" alt="" style={{ marginTop: "2vh", maxWidth: "80vw" }} />
            </div>
          ) : activePool === "Qualifiers" ? (
            <QualifiersTable entries={entries} />
          ) : bracketEntries.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4vh 0" }}>
              <p className="no-sched-msg" style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>
                No schedule found...
              </p>
              <img src="/teams/noteams.png" alt="" style={{ marginTop: "2vh", maxWidth: "80vw" }} />
            </div>
          ) : (
            <BracketTable entries={bracketEntries} />
          )}
        </div>
      </div>
    </div>
  );
}
