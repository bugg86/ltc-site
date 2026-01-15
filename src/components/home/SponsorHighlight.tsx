"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  display: "flex",
  justifyContent: "space-between",
  width: "736px",
  height: "167px",
  top: "1234px",
  left: "973px",
  zIndex: "3"
});

const SponsorLayer1 = styled("div")({
    position: "relative",
    width: "167px",
    height: "167px",
});

const SponsorLayer2 = styled("div")({
    position: "relative",
    width: "315px",
    height: "167px",
});

const SponsorLayer3 = styled("div")({
    position: "relative",
    width: "166px",
    height: "167px",
});


const SPONSOR_1 = (
  <a href="https://yuki.gg/" target="_blank" rel="noopener noreferrer" aria-label="Yukiaim" style={{ display: "block", width: "100%", height: "100%" }}>
    <Image
      src="/home/yukiaim.svg"
      alt="Yukiaim"
      fill
    />
  </a>
);

const SPONSOR_2 = (
  <a href="https://oneofzero.net/" target="_blank" rel="noopener noreferrer" aria-label="OneOfZero" style={{ display: "block", width: "100%", height: "100%" }}>
    <Image
      src="/home/oneofzero.svg"
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
