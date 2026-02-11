"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "268.8444px",
  height: "262.3922px",
  top: "478px",
  left: "1613px",
  rotate: "0deg",
  zIndex: "2"
});

const MUSHROOM_1 = (
  <Image
            src="/home/mushroom2.png"
            alt="Mushroom2"
            fill
          />
);


export function MushroomsRight() {
  return (
    <Container> {MUSHROOM_1} </Container>
  );
}
