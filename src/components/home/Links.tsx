"use client";

import Image from "next/image";
import { styled } from "@mui/material";


const Container = styled("div")({
  position: "absolute",
  width: "31.1vw",
  height: "4.6vw",
  top: "45.563vw",
  left: "34.7vw",
  zIndex: 2,
});

const zones = [
  {
    href: "https://discord.gg/MmtaUfVZvm",
    label: "Discord",
  },
  {
    href: "https://www.twitch.tv/lelastechcup",
    label: "Twitch",
  },
  {
    href: "https://docs.google.com/spreadsheets/d/15AIikFo6gDeDBX6J8aN37i0XKSGysg2S21UZe39pJ0Q/edit?usp=sharing",
    label: "Main Sheet",
  },
  {
    href: "https://challonge.com/enolj2u4",
    label: "Challonge",
  },
  {
    href: "https://osu.ppy.sh/community/forums/topics/2179445?n=1",
    label: "Forum Post",
  },
];


const LinkImage = (
  <Image
    src="/home/links.webp"
    alt="Links"
    fill
    priority
    style={{ zIndex: 1 }}
  />
);

export function Links() {
  return (
    <Container style={{ position: "absolute" }}>
      {LinkImage}
      {zones.map((zone, idx) => (
        <a
          key={zone.label}
          href={zone.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={zone.label}
          style={{
            position: "absolute",
            left: `${(32 / 5) * idx}vw`,
            top: 0,
            width: `${32 / 5}vw`,
            height: "5.006vw",
            zIndex: 2,
            display: "block",
          }}
        />
      ))}
    </Container>
  );
}
