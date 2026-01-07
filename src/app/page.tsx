"use client";

import { DesktopNavbar } from "../components/common/NavBar";
import { LelaAvatar } from "../components/home/LelaAvatar";
import { Vectors } from "../components/home/VectorsGroup";
import { useRef, useState } from 'react';

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
        <Vectors />
        <button onClick={scrollToSecondHalf}>
          Go to Second Half
        </button>
      </div>

      <div ref={secondSectionRef} className="second-half">
        <h2>The Secret Second Half</h2>
        <p>Now you can see this content.</p>
      </div>
    </div>
  );
}
