"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Wrapper = styled("div")({
  top: "740px",
  left: "0",
  right: "0",
  width: "1974px",
  height: "424px",
  fill: "var(--Primary-Pistachio, #9FB878)",
  stroke: "var(--Shade-White, #FFFCEA)",
  strokeWidth: "18px",
//   overflow: "hidden",
  position: "absolute",
});

const VectorImage = (
  <svg width="1920" height="450" viewBox="0 0 1920 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1938 16.1269C1333.3 389.165 -26.8101 101.742 -36 99.7038V440.127H1938V16.1269Z" fill="#9FB878" stroke="#FFFCEA" stroke-width="18"/>
</svg>
);

export function Vector1() {
  return (
    <Wrapper>
        {VectorImage}
    </Wrapper>
    );
}
