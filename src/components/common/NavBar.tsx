"use client";

import { styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import Link from "next/link";

const Wrapper = styled("nav")({
  position: "relative",
  zIndex: "2",
  left: "56px"
});

const NavWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "1807px",
  height: "138px",
});

const Logo = styled("div")({
  display: "flex",
  backgroundImage: "url(/home/logo.svg)",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "50% 50%",
  backgroundSize: "contain",
  backgroundColor: "transparent",
  width: "244px",
  height: "111px",
});

const NavItems = styled("ul")({
  left: "884px",
  width: "923px",
  height: "47px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10%",
  borderRadius: "200px",
  border: "1px solid var(--Primary-Pistachio, #9FB878);",
  background: "linear-gradient(270deg, var(--Primary-Deep-Forest, rgba(55, 68, 38, 0.34)) 0%, rgba(55, 98, 42, 0.34) 100%);"
});

const NavItem = styled("li")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  fontWeight: "400",
  fontFamily: "Sunlight Dreams",
  fontSize: "24px",
  lineHeight: "normal",
  color: "var(--Shade-White, #FFCEA)"
});

export function DesktopNavbar() {
  return (
    <Wrapper>
        <NavWrapper>
          <Stack flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}>
            <Logo />
            <NavItems>
              <NavItem>
                <Link href="/about">About</Link>
              </NavItem>
              <NavItem>
                <Link href="/teams">Teams</Link>
              </NavItem>
              <NavItem>
                <Link href="/staff">Staff</Link>
              </NavItem>
              <NavItem>
                <Link href="/mappool">Mappool</Link>
              </NavItem>
              <NavItem>
                <Link href="/schedule">Schedule</Link>
              </NavItem>
            </NavItems>
          </Stack>
        </NavWrapper>
    </Wrapper>
  );
}
