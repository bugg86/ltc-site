"use client";

import { styled } from "@mui/material";

const Container = styled("div")({
});

const TitleText = styled("a")({
    position: "absolute",
    width: "629px",
    height: "113px",
    top: "1199px",
    left: "190px",
    fontFamily: "var(--font-sunlight-dreams)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "64px",
    lineHeight: "100%",
    letterSpacing: "0%",
    color: "var(--Primary-Deep-Forest, #374426)",
    zIndex: "3"
});

const DescriptionText = styled("a")({
    position: "absolute",
    display: "flex",
    width: "629px",
    height: "185px",
    top: "1312px",
    left: "190px",
    fontFamily: "var(--font-josefin-sans)",
    fontWeight: "400",
    fontStyle: "normal",
    fontSize: "24px",
    lineHeight: "150%",
    letterSpacing: "0%",
    color: "var(--Primary-Deep-Forest, #374426);",
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
