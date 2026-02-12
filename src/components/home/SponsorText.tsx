"use client";

import { styled } from "@mui/material";

const Container = styled("div")({
});

const TitleText = styled("a")({
    position: "absolute",
    width: "32.76vw",
    height: "6.233vw",
    top: "9.872vw",
    left: "9.90vw",
    fontFamily: "var(--font-sunlight-dreams)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "3.6vw",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "var(--Primary-Deep-Forest, #374426)",
    zIndex: "3"
});

const DescriptionText = styled("a")({
    position: "absolute",
    display: "flex",
    width: "32.76vw",
    height: "10.204vw",
    top: "16.104vw",
    left: "9.90vw",
    fontFamily: "var(--font-josefin-sans)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "1.125vw",
    lineHeight: "150%",
    letterSpacing: "0%",
    color: "var(--Primary-Deep-Forest, #374426)",
    zIndex: "3",
    verticalAlign: "middle",
    flexDirection: "column"
});


export function SponsorText() {
  return (
    <Container>
      <TitleText>Our Sponsors</TitleText>
      <DescriptionText>Thank you to our sponsors! We appreciate you. If you are a company or organization and are interested in collaborating, please contact us at lelastechcup@gmail.com.</DescriptionText>
    </Container>
  );
}
