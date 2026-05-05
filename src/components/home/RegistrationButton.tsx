"use client";

import Image from "next/image";
import { styled } from "@mui/material";

const Container = styled("a")({
  position: "absolute",
  width: "18.28vw",
  height: "4.579vw",
  top: "46.766vw",
  left: "78.70vw",
  zIndex: "2",
  textDecoration: "none",
  cursor: "pointer",
  "@media (max-width: 768px)": {
    width: "70vw",
    height: "17vw",
    top: "61%",
    left: "15vw",
  },
});

const SubContainer = styled("div")({
  position: "absolute",
  width: "18.28vw",
  height: "3.971vw",
  top: "0.608vw",
  zIndex: "2",
  "@media (max-width: 768px)": {
    width: "70vw",
    height: "15.2vw",
    top: "1.8vw",
  },
});

const ImageLayer = styled("div")({
  position: "absolute",
  width: "11.72vw",
  height: "1.266vw",
  left: "3.28vw",
  zIndex: "3",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const Shape1 = styled("div")({
  position: "absolute",
  width: "18.28vw",
  height: "3.971vw",
  borderRadius: "200px",
  background: "linear-gradient(90deg, rgba(55, 68, 38, 0.5) 0%, rgba(55, 98, 42, 0.5) 100%)",
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    background: "linear-gradient(270deg, rgba(55, 68, 38, 0.50) 0%, rgba(159, 184, 120, 0.50) 100%), var(--Primary-Deep-Forest, #374426)",
    opacity: 0,
    transition: "opacity .8s ease",
  },
  "a:hover &::before": {
    opacity: 1,
  },
  "@media (max-width: 768px)": {
    width: "70vw",
    height: "15.2vw",
  },
});

const Shape2 = styled("div")({
  position: "absolute",
  width: "17.97vw",
  height: "3.696vw",
  borderRadius: "50vh",
  borderRight: "2px solid var(--Primary-Pistachio, #9FB878)",
  borderBottom: "2px solid var(--Primary-Pistachio, #9FB878)",
  borderLeft: "2px solid var(--Primary-Pistachio, #9FB878)",
  left: "0.16vw",
  top: "0.113vw",
  "@media (max-width: 768px)": {
    top: "0vw",
    left: "0vw",
    right: "0vw",
    bottom: "0vw",
    width: "auto",
    height: "auto",
  },
});

const Text = styled("span")({
  position: "absolute",
  width: "12.24vw",
  top: "50%",
  left: "16.5%",
  transform: "translateY(-50%)",
  fontFamily: "var(--font-josefin-sans)",
  fontWeight: "500",
  fontStyle: "italic",
  fontSize: "1.88vw",
  lineHeight: "1",
  letterSpacing: "0%",
  textAlign: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFF7C2",
  "@media (max-width: 768px)": {
    fontSize: "7vw",
    lineHeight: "1",
    width: "65vw",
    left: "2.5vw",
    top: "50%",
  },
});

const REGISTER = (
  <Image
    src="/home/register.webp"
    alt="Register"
    fill
  />
);

export function Register() {
  return (
    <Container href="https://docs.google.com/forms/d/e/1FAIpQLSdsePfqBTXkRO-qfAEVDVDAGumcuLKH52H0hRVAtWINP1PdEw/viewform">
      <SubContainer>
        <Shape1></Shape1>
        <Shape2></Shape2>
        <Text>REGISTER</Text>
      </SubContainer>
      <ImageLayer>{REGISTER}</ImageLayer>
    </Container>
  );
}
