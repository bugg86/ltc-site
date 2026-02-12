"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  width: "38.333vw",
  height: "9.210vw",
  top: "11.801vw",
  left: "50.677vw",
  zIndex: "3"
});

const SponsorLayer1 = styled("div")({
    position: "relative",
    width: "8.698vw",
    height: "9.210vw",
});

const SponsorLayer2 = styled("div")({
    position: "relative",
    width: "16.406vw",
    height: "9.210vw",
});

const SponsorLayer3 = styled("div")({
    position: "relative",
    width: "8.646vw",
    height: "9.210vw",
});


const SPONSOR_1 = (
  <a href="https://yuki.gg/" target="_blank" rel="noopener noreferrer" aria-label="Yukiaim" style={{ display: "block", width: "100%", height: "100%" }}>
    <Image
      src="/home/yukiaim.webp"
      alt="Yukiaim"
      fill
    />
  </a>
);

const SPONSOR_2 = (
  <a href="https://oneofzero.net/" target="_blank" rel="noopener noreferrer" aria-label="OneOfZero" style={{ display: "block", width: "100%", height: "100%" }}>
    <Image
      src="/home/oneofzero.webp"
      alt="OneOfZero"
      fill
    />
  </a>
);

const SPONSOR_3 = (
  <a href="https://momokai.com/" target="_blank" rel="noopener noreferrer" aria-label="Momokai" style={{ display: "block", width: "100%", height: "100%" }}>
    <Image
      src="/home/momokai.svg"
      alt="Momokai"
      fill
    />
  </a>
);


export function SponsorHighlight() {
  return (
    <Container>
        <SponsorLayer1>{SPONSOR_1}</SponsorLayer1>
        <SponsorLayer2>{SPONSOR_2}</SponsorLayer2>
        <SponsorLayer3>{SPONSOR_3}</SponsorLayer3>
    </Container>
  );
}
