"use client";

import { DesktopNavbar } from "@/components/common/NavBar";
import { useState } from "react";

const POOLS = [
  "Qualifiers",
  "Round of 32",
  "Round of 16",
  "Quarterfinals",
  "Semifinals",
  "Finals",
  "Grandfinals",
];

export default function SchedulePage() {
  const [activePool, setActivePool] = useState("Qualifiers");

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Top background image */}
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

      {/* Page title */}
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

      {/* Green gradient background box */}
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

      {/* Content */}
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
        {/* Pool tab navbar — styled like global nav */}
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

        {/* Page content — no box */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src="/sleep.gif"
            alt="Sleeping animation"
            style={{ width: "320px", height: "auto" }}
          />
          <p
            style={{
              marginTop: "1rem",
              fontSize: "2vw",
              color: "#FFF7C2",
              fontFamily: "var(--font-sunlight-dreams)",
            }}
          >
            Page under construction!!
          </p>
        </div>
      </div>
    </div>
  );
}
