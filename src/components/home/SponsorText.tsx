"use client";

import { styled } from "@mui/material";

const Container = styled("div")({
});

const TitleText = styled("a")({
    position: "absolute",
    width: "32.76vw",
    height: "11.08vh",
    top: "117.55vh",
    left: "9.90vw",
    fontFamily: "var(--font-sunlight-dreams)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "6.4vh",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "var(--Primary-Deep-Forest, #374426)",
    zIndex: "3"
});

const DescriptionText = styled("a")({
    position: "absolute",
    display: "flex",
    width: "32.76vw",
    height: "18.14vh",
    top: "128.63vh",
    left: "9.90vw",
    fontFamily: "var(--font-josefin-sans)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "2vh",
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
