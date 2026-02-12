"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "12.98vw",
  height: "18.74vh",
  top: "51.76vh",
  left: "16.56vw",
  zIndex: "2"
});

const MushroomLayer1 = styled("div")({
    position: "absolute",
    width: "8.60vw",
    height: "15.80vh",
    rotate: "-2.2deg",
    top: "1.47vh"
});

const MushroomLayer2 = styled("div")({
    position: "absolute",
    width: "7.73vw",
    height: "14.19vh",
    top: "4.51vh",
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
