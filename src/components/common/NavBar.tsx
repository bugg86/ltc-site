"use client";

import { styled } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Wrapper = styled("nav")({
  position: "relative",
  zIndex: "4",
  left: "3vw",
  display: "flex",
  alignItems: "center",
  width: "94vw",
  height: "13vh",
});

const Logo = styled(Link)({
  position: "relative",
  display: "flex",
  width: "12.7vw",
  height: "10.3vh",
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
            <NavigationMenuTrigger
              style={{ color: isActive("/about") ? activeColor : defaultColor }}
            >
              About
            </NavigationMenuTrigger>
            <NavigationMenuContent className="md:left-1/2 md:-translate-x-1/2 p-0 bg-transparent! border-0! shadow-none!">
              <ul className="w-32 divide-y divide-(--Primary-Pistachio,#9FB878)" 
                style={{ 
                  background: "linear-gradient(270deg, var(--Primary-Deep-Forest, rgba(55, 68, 38, 0.34)) 0%, rgba(55, 98, 42, 0.34) 100%)",
                  borderRadius: "10px",
                  border: "1px solid var(--Primary-Pistachio, #9FB878)",
                }}>
              <ListItem href="/about/lore" title="Lore" active={isActive("/about/lore")}>
              </ListItem>
              <ListItem href="/about/rules" title="Rules" active={isActive("/about/rules")}>
              </ListItem>
              <ListItem href="/about/rules#rules-prizes" title="Prizes" active={isActive("/about/prizes")}>
              </ListItem>
            </ul>
            </NavigationMenuContent>
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

function ListItem({
  title,
  children,
  href,
  active = false,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string; active?: boolean }) {
  const activeColor = "var(--Primary-Pistachio, #9FB878)";
  const defaultColor = "#FFFCEA";
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} style={{ color: active ? activeColor : defaultColor }}>
          <div className="">
            <div className="" 
              style={{ 
                color: active ? activeColor : defaultColor,
                fontFamily: "var(--font-sunlight-dreams)",
                fontSize: "0.78vw",
                lineHeight: "100%",
                fontWeight: "400",
                letterSpacing: "0%",
                justifyContent: "center",
                display: "flex",
                alignContent: "center",
              }}>
              {title}
            </div>
            <div className="text-muted-foreground line-clamp-2">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}


// export function DesktopNavbar() {
//   return (
//     <Wrapper>
//         <NavWrapper>
//           <Stack flexDirection="row"
//           alignItems="center"
//           justifyContent="space-between"
//           sx={{ width: "100%" }}>
//             <Logo />
//             <NavigationMenu>
//               <NavItem>
//                 <Link href="/about">About</Link>
//               </NavItem>
//               <NavItem>
//                 <Link href="/teams">Teams</Link>
//               </NavItem>
//               <NavItem>
//                 <Link href="/staff">Staff</Link>
//               </NavItem>
//               <NavItem>
//                 <Link href="/mappool">Mappool</Link>
//               </NavItem>
//               <NavItem>
//                 <Link href="/schedule">Schedule</Link>
//               </NavItem>
//             </NavigationMenu>
//           </Stack>
//         </NavWrapper>
//     </Wrapper>
//   );
// }
