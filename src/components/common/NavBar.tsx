"use client";

import { styled } from "@mui/material";
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Wrapper = styled("nav")({
  position: "relative",
  zIndex: "4",
  left: "3vw",
  display: "flex",
  alignItems: "center",
  width: "94vw",
  height: "7.313vw",
});

const Logo = styled(Link)({
  position: "relative",
  display: "flex",
  width: "12.7vw",
  height: "5.794vw",
  cursor: "pointer",
  zIndex: 5,
});

export function DesktopNavbar() {
  const pathname = usePathname();
  const isActive = React.useCallback(
    (href: string) => pathname === href || pathname.startsWith(`${href}/`),
    [pathname]
  );
  const activeColor = "#E5C100";
  const defaultColor = "#FFFCEA";

  return (
    <Wrapper>
      <Logo href="/" aria-label="Home">
        <Image src="/home/logo.svg" alt="Logo" fill style={{ objectFit: "contain" }} />
      </Logo>
      <NavigationMenu className="ml-auto" viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/lore" style={{ color: isActive("/lore") ? activeColor : defaultColor }}>
                Lore
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/rules" style={{ color: isActive("/rules") ? activeColor : defaultColor }}>
                Rules & Prizes
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/teams" style={{ color: isActive("/teams") ? activeColor : defaultColor }}>
                Teams
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/staff" style={{ color: isActive("/staff") ? activeColor : defaultColor }}>
                Staff
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/mappool" style={{ color: isActive("/mappool") ? activeColor : defaultColor }}>
                Mappool
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
              <Link href="/schedule" style={{ color: isActive("/schedule") ? activeColor : defaultColor }}>
                Schedule
              </Link>
              </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </Wrapper>
  );
}
