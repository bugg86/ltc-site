"use client";

import { DesktopNavbar } from "../components/common/NavBar";
import { LelaAvatar } from "../components/home/LelaAvatar";
import { Vectors } from "../components/home/VectorsGroup";
import { Name } from "../components/home/Name";
import { useRef, useState } from 'react';
import { MushroomsLeft } from "../components/home/MushroomsLeft";
import { MushroomsRight } from "../components/home/MushroomsRight";
import { NextPageButton } from "../components/home/NextPageButton";

export default function Home() {

  const secondSectionRef = useRef<HTMLDivElement>(null);
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(false);

  const scrollToSecondHalf = () => {
    setIsScrollingAllowed(true); // This might not be strictly needed with the ref approach
    secondSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div> 
      <div className="first-half">
        <DesktopNavbar />
        <LelaAvatar />
        <MushroomsLeft />
        <MushroomsRight />
        <Vectors />
        <Name />
        <NextPageButton onClick={scrollToSecondHalf} />
      </div>

      <div ref={secondSectionRef} className="second-half">
        <h2>The Secret Second Half</h2>
        <p>Now you can see this content.</p>
      </div>
    </div>
  );
}
