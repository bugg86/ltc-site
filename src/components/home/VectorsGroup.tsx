"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "110.8125vw",
  height: "33.75vw",
  top: "25.202vw",
  left: "-1.875vw",
  zIndex: "2"
});

export function Vectors() {
  return (
    <Container>
      <Image
        src="/home/vectors.png"
        alt="Vectors"
        fill
        style={{ objectFit: "cover" }}
      />
    </Container>
  );
}
