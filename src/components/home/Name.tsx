"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "22.7vw",
  height: "9.563vw",
  left: "3vw",
  top: "42.75vw",
  zIndex: "3",
  "@media (max-width: 768px)": {
    width: "55vw",
    height: "23vw",
    left: "22.5vw",
    top: "47%",
  },
});

export function Name() {
  return (
    <Container>
      <Image
        src="/home/logo.png"
        alt="Logo"
        fill
        style={{ objectFit: "contain" }}
      />
    </Container>
  );
}
