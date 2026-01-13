"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "1974px",
  height: "507px",
  top: "508px",
  left: "-36px",
  zIndex: "2"
});

const VectorLayer1 = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "83px",
    left: "36px",
});

const VectorLayer2 = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0px",
    left: "140px"
});

const VectorLayer3 = styled("div")({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "0px",
    left: "-8px",
});

const VECTOR_1 = (
  <svg width="1920" height="450" viewBox="0 0 1920 450" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1938 16.1269C1333.3 389.165 -26.8101 101.742 -36 99.7038V440.127H1938V16.1269Z" fill="#9FB878" stroke="#FFFCEA" strokeWidth="18"/>
</svg>
);

const VECTOR_2 = (
  <svg width="1822" height="375" viewBox="0 0 1822 375" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1839.82 7.76544C1284.06 326.256 44.6675 254.628 5.81557 230.263L25.5998 369.765H1839.82V7.76544Z" fill="#37622A" stroke="#FFF7C2" strokeWidth="9"/>
</svg>
);

const VECTOR_3 = (
  <svg width="1821" height="382" viewBox="0 0 1821 382" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M-8 6.14008C544.721 333.429 1777.36 259.822 1816 234.784L1796.32 378.14H-8V6.14008Z" fill="#374426" stroke="#37622A" strokeWidth="7"/>
</svg>
);

export function Vectors() {
  return (
    <Container>
        <VectorLayer3>{VECTOR_3}</VectorLayer3>
        <VectorLayer2>{VECTOR_2}</VectorLayer2>
        <VectorLayer1>{VECTOR_1}</VectorLayer1>
    </Container>
  );
}
