"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "249.295px",
  height: "191.146px",
  top: "528px",
  left: "318px",
  zIndex: "2"
});

const MushroomLayer1 = styled("div")({
    position: "absolute",
    width: "165.08px",
    height: "161.1194px",
    rotate: "-2.2deg",
    top: "15px"
});

const MushroomLayer2 = styled("div")({
    position: "absolute",
    width: "148.3422px",
    height: "144.782px",
    top: "46px",
    left: "86px",
    rotate: "6deg"
});

const MUSHROOM_1 = (
  <Image
            src="/home/mushroom3.svg"
            alt="Mushroom3"
            fill
          />
);

const MUSHROOM_2 = (
  <Image
            src="/home/mushroom1.svg"
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
