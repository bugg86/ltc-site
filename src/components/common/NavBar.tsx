"use client";

import { styled } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Wrapper = styled("nav")({
  position: "relative",
  zIndex: 4,
  left: "3vw",
  display: "flex",
  alignItems: "center",
  width: "94vw",
  height: "7.313vw",
  "@media (max-width: 768px)": {
    height: "14vw",
    left: "4vw",
    width: "92vw",
    marginTop: "max(env(safe-area-inset-top), 4vw)",
  },
});

const Logo = styled(Link)({
  position: "relative",
  display: "flex",
  width: "12.7vw",
  height: "5.794vw",
  cursor: "pointer",
  zIndex: 5,
  flexShrink: 0,
  "@media (max-width: 768px)": {
    width: "38vw",
    height: "17.3vw",
  },
});

const DesktopNavWrapper = styled("div")({
  marginLeft: "auto",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const HamburgerButton = styled("button")({
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: 0,
  "@media (max-width: 768px)": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "10vw",
    height: "8vw",
    marginLeft: "auto",
    padding: "1vw",
  },
});

const HamburgerLine = styled("div")({
  width: "100%",
  height: "1.2vw",
  backgroundColor: "#FFFCEA",
  borderRadius: "1vw",
});

const MobileMenuOverlay = styled("nav")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  background: "rgba(55, 68, 38, 0.97)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 200,
  gap: "8vw",
});

const MobileNavLink = styled(Link)({
  fontFamily: "var(--font-sunlight-dreams)",
  fontSize: "7vw",
  color: "#FFFCEA",
  textDecoration: "none",
  "&:hover": {
    color: "#E5C100",
  },
});

const CloseButton = styled("button")({
  position: "absolute",
  top: "5vw",
  right: "5vw",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: "#FFFCEA",
  fontSize: "8vw",
  lineHeight: 1,
  padding: "1vw",
});

const navLinks = [
  { href: "/lore", label: "Lore" },
  { href: "/rules", label: "Rules & Prizes" },
  { href: "/teams", label: "Teams" },
  { href: "/staff", label: "Staff" },
  { href: "/mappool", label: "Mappool" },
  { href: "/schedule", label: "Schedule" },
];

export function DesktopNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const isActive = React.useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname]
  );
  const activeColor = "#E5C100";
  const defaultColor = "#FFFCEA";

  return (
    <>
      <Wrapper>
        <Logo href="/" aria-label="Home">
          <Image src="/home/logo.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
        </Logo>
        <DesktopNavWrapper>
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {navLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href={href} style={{ color: isActive(href) ? activeColor : defaultColor }}>
                      {label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </DesktopNavWrapper>
        <HamburgerButton onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <HamburgerLine />
          <HamburgerLine />
          <HamburgerLine />
        </HamburgerButton>
      </Wrapper>
      {menuOpen && (
        <MobileMenuOverlay>
          <CloseButton onClick={() => setMenuOpen(false)} aria-label="Close menu">✕</CloseButton>
          {navLinks.map(({ href, label }) => (
            <MobileNavLink
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              style={{ color: isActive(href) ? activeColor : defaultColor }}
            >
              {label}
            </MobileNavLink>
          ))}
        </MobileMenuOverlay>
      )}
    </>
  );
}
