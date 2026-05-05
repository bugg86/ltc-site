"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const ImageLayer = styled("div")({
  position: "absolute",
  width: "30.469vw",
  height: "26.250vw",
  top: "24.651vw",
  left: "0.938vw",
  aspectRatio: "0.8056",
  zIndex: 3,
  "@media (max-width: 768px)": {
    width: "55vw",
    height: "47.5vw",
    left: "22.5vw",
    top: "10vw",
  },
});

export function Animal() {
  return (
      <ImageLayer>
        <Image
          src="/home/animal1.png"
          alt="Animal"
          fill
          priority
        />
      </ImageLayer>
  );
}
