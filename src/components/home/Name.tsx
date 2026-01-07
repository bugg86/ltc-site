"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
});

const ImageLayer = styled("div")({
});

export function Name() {
  return (
    <Container>
      <ImageLayer>
        <Image
          src="/home/lela-avatar.svg"
          alt="Lela"
          fill
        />
      </ImageLayer>
    </Container>
  );
}
