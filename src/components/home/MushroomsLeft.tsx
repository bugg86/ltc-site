"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "12.98vw",
  height: "10.541vw",
  top: "29.115vw",
  left: "16.56vw",
  zIndex: "2"
});

const MushroomLayer1 = styled("div")({
    position: "absolute",
    width: "8.60vw",
    height: "8.888vw",
    rotate: "-2.2deg",
    top: "0.827vw"
});

const MushroomLayer2 = styled("div")({
    position: "absolute",
    width: "7.73vw",
    height: "7.982vw",
    top: "2.537vw",
    left: "4.48vw",
    rotate: "6deg"
});

const MUSHROOM_1 = (
  <Image
            src="/home/mushroom3.png"
            alt="Mushroom3"
            fill
          />
);

const MUSHROOM_2 = (
  <Image
            src="/home/mushroom1.png"
            alt="Mushroom1"
            fill
          />
);


export function MushroomsLeft() {
  return (
    <Container>
        <MushroomLayer1>{MUSHROOM_1}</MushroomLayer1>
        <MushroomLayer2>{MUSHROOM_2}</MushroomLayer2>
    </Container>
  );
}
