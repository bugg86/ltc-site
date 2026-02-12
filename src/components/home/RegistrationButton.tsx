"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("a")({
  position: "absolute",
  width: "18.28vw",
  height: "8.14vh",
  top: "83.14vh",
  left: "78.70vw",
  zIndex: "2",
  textDecoration: "none",
  cursor: "pointer",
});

const SubContainer = styled("div")({
  position: "absolute",
  width: "18.28vw",
  height: "7.06vh",
  top: "1.08vh",
  zIndex: "2"
});

const ImageLayer = styled("div")({
    position: "absolute",
    width: "11.72vw",
    height: "2.25vh",
    left: "3.28vw",
    zIndex: "3"
});

const Shape1 = styled("div")({
    position: "absolute",
    width: "18.28vw",
    height: "7.06vh",
    borderRadius: "200px",
    background: "linear-gradient(90deg, rgba(55, 68, 38, 0.5) 0%, rgba(55, 98, 42, 0.5) 100%);"
});

const Shape2 = styled("div")({
    position: "absolute",
    width: "17.97vw",
    height: "6.57vh",
    borderRadius: "200px",
    borderRight: "2px solid var(--Primary-Pistachio, #9FB878)",
    borderBottom: "2px solid var(--Primary-Pistachio, #9FB878)",
    borderLeft: "2px solid var(--Primary-Pistachio, #9FB878)",
    left: "0.16vw",
    top: "0.20vh",
});

const Text = styled("span")({
    position: "absolute",
    width: "12.24vw",
    height: "6.08vh",
    top: "25%",
    left: "16.5%",
    fontFamily: "var(--font-josefin-sans)",
    fontWeight: "500",
    fontStyle: "italic",
    fontSize: "1.88vw",
    lineHeight: "1.88vw",
    letterSpacing: "0%",
    textAlign: "center",
    flexDirection: "column",
    justifyContent: "center",
    color: "#FFF7C2",
});

const REGISTER = (
  <Image
              src="/home/register.svg"
              alt="Register"
              fill
            />
);

export function Register() {
  return (
    <Container href="https://google.com">
        <SubContainer>
            <Shape1></Shape1>
            <Shape2></Shape2>
            <Text>REGISTER</Text>
        </SubContainer>
        <ImageLayer>{REGISTER}</ImageLayer>
    </Container>
  );
}
