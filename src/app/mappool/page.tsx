"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useEffect, useRef, useState } from "react";

const SLOT_ORDER = ["NM", "HD", "HR", "DT", "EX", "TB"];

function sortMaps(maps: MapEntry[]): MapEntry[] {
  return [...maps].sort((a, b) => {
    const aPre = SLOT_ORDER.findIndex((p) => a.slot.startsWith(p));
    const bPre = SLOT_ORDER.findIndex((p) => b.slot.startsWith(p));
    if (aPre !== bPre) return aPre - bPre;
    const aNum = parseInt(a.slot.replace(/\D/g, ""), 10) || 0;
    const bNum = parseInt(b.slot.replace(/\D/g, ""), 10) || 0;
    return aNum - bNum;
  });
}

const POOLS = [
  "Qualifiers",
  "Round of 32",
  "Round of 16",
  "Quarterfinals",
  "Semifinals",
  "Finals",
  "Grand Finals",
];

interface MapEntry {
  _id: string;
  round: string;
  slot: string;
  name: string;
  difficulty: string;
  mapper: string;
  starRating: string;
  circleSize: string;
  bpm: string;
  approachRate: string;
  length: string;
  overallDifficulty: string;
  beatmapId: string;
  beatmapLink: string;
  beatmapCover?: string;
}

function slotColor(slot: string): string {
  if (slot.includes("NM")) return "#D1DFD5";
  if (slot.includes("HD")) return "#FFF7C2";
  if (slot.includes("HR")) return "#FFA3A5";
  if (slot.includes("DT")) return "#D1C3E9";
  if (slot.includes("EX")) return "#F6B180";
  if (slot.includes("TB")) return "#BABABA";
  return "#D1DFD5";
}

function MapCard({ map }: { map: MapEntry }) {
  const [expanded, setExpanded] = useState(false);
  const lastPointerType = useRef("");

  return (
    <div
      className="map-card"
      style={{
        backgroundColor: slotColor(map.slot),
        borderRadius: "0 0.833vw 0.833vw 0.833vw",
        overflow: "hidden",
        boxShadow: expanded ? "0 8px 20px rgba(0,0,0,0.4)" : "0 4px 12px rgba(0,0,0,0.3)",
        fontFamily: "var(--font-josefin-sans)",
        transition: "box-shadow 0.2s",
      }}
      onPointerDown={(e) => { lastPointerType.current = e.pointerType; }}
      onMouseEnter={() => { if (lastPointerType.current !== "touch") setExpanded(true); }}
      onMouseLeave={() => { if (lastPointerType.current !== "touch") setExpanded(false); }}
    >
      {/* Cover image — clickable */}
      <a
        href={map.beatmapLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "block", position: "relative" }}
      >
        {map.beatmapCover && (
          <img
            src={map.beatmapCover}
            alt={map.name}
            className="map-cover-img"
            style={{ width: "100%", display: "block", objectFit: "cover", height: "5vw", cursor: "pointer" }}
          />
        )}
        {/* Slot badge */}
        <div
          className="map-slot-badge"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: slotColor(map.slot),
            color: "#000",
            fontSize: "0.75vw",
            fontWeight: 700,
            fontFamily: "var(--font-sunlight-dreams)",
            letterSpacing: "0.05em",
            padding: "0.15vw 0.4vw",
            borderRadius: "0 0 0.3vw 0",
          }}
        >
          {map.slot}
        </div>
      </a>

      {/* Always visible body — tap to expand on mobile */}
      <div
        className="map-card-body"
        onClick={() => { if (lastPointerType.current === "touch") setExpanded((prev) => !prev); }}
        style={{
          padding: "0.6vw 0.7vw",
          display: "flex",
          flexDirection: "column",
          gap: "0.3vw",
          cursor: "default",
        }}
      >
        <div className="map-card-name" style={{ color: "#000", fontSize: "1vw", fontWeight: 700, lineHeight: 1.2 }}>{map.name}</div>
        <div className="map-card-diff" style={{ color: "#000", fontSize: "0.8vw", fontWeight: 600 }}>[{map.difficulty}]</div>
        <div className="map-card-mapper" style={{ color: "#000", fontSize: "0.75vw" }}>mapped by {map.mapper}</div>
        <div className="map-expand-hint" style={{ color: "#000", fontSize: "0.75vw", opacity: 0.5, marginTop: "0.2vw" }}>
          {expanded ? "▲ tap to collapse" : "▼ tap for details"}
        </div>
      </div>

      {/* Expanded content */}
      <div
        style={{
          maxHeight: expanded ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.25s ease",
        }}
      >
        <div className="map-card-expanded" style={{ padding: "0 0.7vw 0.6vw", display: "flex", flexDirection: "column", gap: "0.4vw" }}>
          <div className="map-stats-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.3vw 0.5vw" }}>
            {[
              { label: "SR", value: map.starRating },
              { label: "BPM", value: map.bpm },
              { label: "Length", value: map.length },
              { label: "CS", value: map.circleSize },
              { label: "AR", value: map.approachRate },
              { label: "OD", value: map.overallDifficulty },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column" }}>
                <span className="map-stat-label" style={{ color: "#000", fontSize: "0.6vw", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</span>
                <span className="map-stat-value" style={{ color: "#000", fontSize: "0.8vw", fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
          <div className="map-beatmap-id" style={{ color: "#000", fontSize: "0.65vw", opacity: 0.6, marginTop: "0.2vw" }}>
            ID: {map.beatmapId}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MappoolPage() {
  const [activePool, setActivePool] = useState("Qualifiers");
  const [maps, setMaps] = useState<MapEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/maps?round=${encodeURIComponent(activePool)}`)
      .then((res) => res.json())
      .then((data) => {
        setMaps(sortMaps(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [activePool]);

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
        .map-expand-hint {
          display: none;
        }
        @media (max-width: 768px) {
          .map-expand-hint {
            display: block;
          }
          .map-card-body {
            cursor: pointer !important;
          }
        }
        @media (max-width: 768px) {
          .map-card {
            border-radius: 0 3vw 3vw 3vw !important;
          }
          .map-cover-img {
            height: 25vw !important;
          }
          .map-slot-badge {
            font-size: 3vw !important;
            padding: 0.8vw 1.5vw !important;
            border-radius: 0 0 1.5vw 0 !important;
          }
          .map-card-body {
            padding: 2vw 2.5vw !important;
            gap: 1vw !important;
          }
          .map-card-name {
            font-size: 4vw !important;
          }
          .map-card-diff {
            font-size: 3.5vw !important;
          }
          .map-card-mapper {
            font-size: 3vw !important;
          }
          .map-expand-hint {
            font-size: 3vw !important;
          }
          .map-card-expanded {
            padding: 0 2.5vw 2vw !important;
            gap: 1.5vw !important;
          }
          .map-stat-label {
            font-size: 2.5vw !important;
          }
          .map-stat-value {
            font-size: 3vw !important;
          }
          .map-beatmap-id {
            font-size: 2.5vw !important;
          }
          .maps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 3vw !important;
          }
          .maps-container {
            padding: 3vw !important;
            border-radius: 4vw !important;
            border-width: 2px !important;
          }
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
          .no-maps-msg {
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
        Mappool
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
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5vh",
        }}
      >
        {/* Pool tab navbar */}
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

        {/* Maps content area */}
        <div
          className="maps-container"
          style={{
            width: "100%",
            backgroundColor: "rgba(159, 184, 120, 1)",
            border: "0.417vw solid rgba(255, 247, 194, 1)",
            borderRadius: "0.833vw",
            padding: "1.5vw",
            minHeight: "20vh",
          }}
        >
          {loading ? (
            <p style={{ color: "#FFF7C2", fontFamily: "var(--font-josefin-sans)", fontSize: "1.2vw", margin: 0 }}>
              Loading maps...
            </p>
          ) : maps.length === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "4vh 0" }}>
              <p className="no-maps-msg" style={{ fontSize: "2vw", color: "#FFF7C2", textAlign: "center", fontFamily: "var(--font-josefin-sans)", margin: 0 }}>No maps found...</p>
              <img src="/mappool/nomaps.png" alt="" style={{ marginTop: "2vh", maxWidth: "80vw" }} />
            </div>
          ) : (
            <div
              className="maps-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1vw",
                alignItems: "start",
              }}
            >
              {maps.map((map) => (
                <MapCard key={map._id} map={map} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
