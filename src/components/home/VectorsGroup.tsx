"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "110.8125vw",
  height: "49.706vh",
  top: "49.804vh",
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
