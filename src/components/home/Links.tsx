"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "588px",
  height: "91px",
  top: "860px",
  left: "58px",
  zIndex: "2"
});

const DiscordButton = (
  <button></button>
);

const TwitchButton = (
  <button></button>
);

const MainSheetButton = (
  <button></button>
);

const ChallongeButton = (
  <button></button>
);

const ForumPostButton = (
  <button></button>
);

const LinkImage = (
  <Image
            src="/home/links.svg"
            alt="Lela"
            fill
          />
);

export function Links() {
  return (
    <Container>
        {LinkImage}
        {DiscordButton}
        {TwitchButton}
        {MainSheetButton}
        {ChallongeButton}
        {ForumPostButton}
    </Container>
  );
}
