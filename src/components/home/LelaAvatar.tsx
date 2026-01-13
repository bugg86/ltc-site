"use client";

import Image from "next/image";
import { styled } from "@mui/material";

// const Container = styled("div")({
//   position: "absolute",
//   width: "1464px",
//   height: "924px",
//   top: "114px",
//   overflow: "hidden"
// });

const ImageLayer = styled("div")({
  position: "absolute",
  width: "891px",
  height: "1106px",
  top: "40px",
  left: "522px",
  // aspectRatio: "0.8056",
  zIndex: 2,
});

export function LelaAvatar() {
  return (
    // <Container>
      <ImageLayer>
        <Image
          src="/home/lela-avatar.svg"
          alt="Lela"
          fill
        />
      </ImageLayer>
    // </Container>
  );
}
