"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "22.7vw",
  height: "17vh",
  left: "3vw",
  top: "76vh",
  zIndex: "3"
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
