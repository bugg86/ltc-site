"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const ImageLayer = styled("div")({
  position: "absolute",
  width: "585px",
  height: "476px",
  top: "1467px",
  left: "18px",
  aspectRatio: "0.8056",
  zIndex: 3,
});

export function Animal() {
  return (
      <ImageLayer>
        <Image
          src="/home/animal1.svg"
          alt="Animal"
          fill
        />
      </ImageLayer>
  );
}
