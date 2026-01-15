"use client";

import Image from "next/image";
import { styled } from "@mui/material";


const Container = styled("div")({
  position: "absolute",
  width: "588px",
  height: "91px",
  top: "860px",
  left: "58px",
  zIndex: 2,
});

const zones = [
  {
    href: "https://discord.gg/MmtaUfVZvm",
    label: "Discord",
  },
  {
    href: "https://twitch.tv/",
    label: "Twitch",
  },
  {
    href: "https://docs.google.com/spreadsheets/",
    label: "Main Sheet",
  },
  {
    href: "https://challonge.com/enolj2u4",
    label: "Challonge",
  },
  {
    href: "https://osu.ppy.sh/community/forums/",
    label: "Forum Post",
  },
];


const LinkImage = (
  <Image
    src="/home/links.svg"
    alt="Links"
    fill
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
            left: `${(588 / 5) * idx}px`,
            top: 0,
            width: `${588 / 5}px`,
            height: "91px",
            zIndex: 2,
            display: "block",
          }}
        />
      ))}
    </Container>
  );
}
