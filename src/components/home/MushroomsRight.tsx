"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "14.00vw",
  height: "14.468vw",
  top: "26.359vw",
  left: "84.01vw",
  rotate: "0deg",
  zIndex: "2"
});

const MUSHROOM_1 = (
  <Image
            src="/home/mushroom2.png"
            alt="Mushroom2"
            fill
            priority
          />
);


export function MushroomsRight() {
  return (
    <Container> {MUSHROOM_1} </Container>
  );
}
