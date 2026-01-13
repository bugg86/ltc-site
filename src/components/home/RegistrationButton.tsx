"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("div")({
  position: "absolute",
  width: "351px",
  height: "83px",
  top: "848px",
  left: "1511px",
  zIndex: "2"
});

const SubContainer = styled("div")({
  position: "absolute",
  width: "351px",
  height: "72px",
  top: "11px",
  zIndex: "2"
});

const ImageLayer = styled("div")({
    position: "absolute",
    width: "225px",
    height: "23px",
    left: "63px",
    zIndex: "3"
});

const Shape1 = styled("div")({
    position: "absolute",
    width: "351px",
    height: "72px",
    borderRadius: "200px",
    background: "linear-gradient(90deg, rgba(55, 68, 38, 0.50) 0%, rgba(55, 98, 42, 0.50) 100%), var(--Primary-Deep-Forest, #374426)"
});

const Shape2 = styled("div")({
    position: "absolute",
    width: "345px",
    height: "67px",
    borderRadius: "200px",
    borderRight: "2px solid var(--Primary-Pistachio, #9FB878)",
    borderBottom: "2px solid var(--Primary-Pistachio, #9FB878)",
    borderLeft: "2px solid var(--Primary-Pistachio, #9FB878)",
    left: "3px",
    top: "2px",
});

const Text = styled("a")({
    position: "absolute",
    width: "235px",
    height: "62px",
    top: "25%",
    left: "16.5%",
    font: "Josefin Sans",
    fontWeight: "500",
    fontStyle: "italic",
    fontSize: "36px",
    lineHeight: "36px",
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
    <Container>
        <SubContainer>
            <Shape1></Shape1>
            <Shape2></Shape2>
            <Text>REGISTER</Text>
        </SubContainer>
        <ImageLayer>{REGISTER}</ImageLayer>
    </Container>
  );
}
