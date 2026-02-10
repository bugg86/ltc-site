"use client";

import { styled } from "@mui/material";
import * as React from "react";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuViewport, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const Wrapper = styled("nav")({
  position: "relative",
  zIndex: "4",
  left: "56px",
  display: "flex",
  // flexDirection: "column",
  // justifyContent: "space-between",
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
  fontFamily: "var(--font-sunlight-dreams)",
  fontSize: "24px",
  lineHeight: "normal",
  color: "var(--Shade-White, #FFCEA)"
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
      <Logo />
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
              <ListItem href="/about/prizes" title="Prizes" active={isActive("/about/prizes")}>
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
                fontSize: "15px",
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
