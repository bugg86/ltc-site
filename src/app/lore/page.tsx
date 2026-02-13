"use client";

import * as React from "react";
import { DesktopNavbar } from "@/components/common/NavBar";
import { LorePagination } from "@/components/lore/LorePagination";
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

export default function LorePage() {
  const pageOneContent = (
    <div
      style={{
        width: "48vw",
        height: "43vh",
        position: "relative",
        left: "5vw",
        top: "4vh",
        background: "rgba(159, 184, 120, 0.25)",
        border: ".2vh solid var(--Primary-Pistachio, #9FB878)",
        borderRadius: "1.2vh",
        padding: "2.4vh",
        fontFamily: "var(--font-josefin-sans)",
        fontSize: "3.8vh",
        lineHeight: "100%",
        letterSpacing: "0%",
        fontWeight: "400",
        fontStyle: "normal",
        alignContent: "center"
      }}
    >
      <p>As Lela journeys through the world, lost and uncertain, she comes across the remnants of an  ancient civilization. A place where magic and technology were once united in harmony. There,  deep within a hidden library carved into the side of a mountain, Lela uncovers texts that  describe a concept called Mech-Tech.</p>
    </div>
  )

  const pageTwoContent = (
    <div
      style={{
        width: "80vw",
        height: "30vh",
        position: "absolute",
        top: "15vh",
        left: "10vw",
        background: "rgba(159, 184, 120, 0.25)",
        border: ".2vh solid var(--Primary-Pistachio, #9FB878)",
        borderRadius: "1.6vh",
        padding: "2vh",
        fontFamily: "var(--font-josefin-sans)",
        fontSize: "3.8vh",
        lineHeight: "100%",
        letterSpacing: "0%",
        fontWeight: "400",
        fontStyle: "normal",
        alignContent: "center"
      }}
    >
      <p>This fusion of magic and technology was once thought to be dangerous and forbidden, but Lela sees something different: a potential to heal the world, to restore balance, and to create something new from the ashes of the old.</p>
    </div>
  )

  const pageThreeContent = (
    <div
      style={{
        width: "46vw",
        height: "33vh",
        position: "absolute",
        top: "10vh",
        left: "2vw",
        background: "rgba(159, 184, 120, 0.25)",
        border: ".2vh solid var(--Primary-Pistachio, #9FB878)",
        borderRadius: "2vh",
        padding: "2vh",
        fontFamily: "var(--font-josefin-sans)",
        fontSize: "3.8vh",
        lineHeight: "100%",
        letterSpacing: "0%",
        fontWeight: "400",
        fontStyle: "normal",
        alignContent: "center"
      }}
    >
      <p>Using her knowledge of both magic and tech, Lela crafts a series of enticing virtual spaces: hidden, digital sanctuaries where people can escape from their harsh realities. She promises them freedom, strength, and mastery over their own fates.</p>
    </div>
  )

  const pageFourContent = (
    <>
      <div
        style={{
          width: "38vw",
          height: "22vh",
          left: "3vw",
          top: "2vh",
          position: "absolute",
          background: "rgba(159, 184, 120, 0.25)",
          border: ".2vh solid var(--Primary-Pistachio, #9FB878)",
          borderRadius: "2vh",
          padding: "2vh",
          fontFamily: "var(--font-josefin-sans)",
          fontSize: "3.8vh",
          lineHeight: "100%",
          letterSpacing: "0%",
          fontWeight: "400",
          fontStyle: "normal",
          alignContent: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2vh"
        }}
      >
        <p style={{ fontSize: "6.3vh" }}>
          "Join me"
        </p>
        <p>She says, her voice soft.</p>
      </div>
      <div
        style={{
          width: "62vw",
          height: "25vh",
          position: "absolute",
          top: "30vh",
          right: "3vw",
          background: "rgba(159, 184, 120, 0.25)",
          border: ".2vh solid var(--Primary-Pistachio, #9FB878)",
          borderRadius: "2vh",
          padding: "2vh",
          fontFamily: "var(--font-josefin-sans)",
          fontSize: "3.8vh",
          lineHeight: "100%",
          letterSpacing: "0%",
          fontWeight: "400",
          fontStyle: "normal",
          alignContent: "center"
        }}
      >
        <p>"Together, we create a world free of nature’s constraints. Imagine it, an era where we control time itself, shape the elements with a word, and mold reality to our will."</p>
      </div>
    </>
  )

  const sections: {
    id: string
    label: string
    title: string
    body: React.ReactNode
    backgroundImage: string
  }[] = [
    {
      id: "lore-1",
      label: "Origin",
      title: "Lore One",
      body: pageOneContent,
      backgroundImage: "/lore/lore1.webp",
    },
    {
      id: "lore-2",
      label: "Realm",
      title: "Lore Two",
      body: pageTwoContent,
      backgroundImage: "/lore/lore2.webp",
    },
    {
      id: "lore-3",
      label: "Heroes",
      title: "Lore Three",
      body: pageThreeContent,
      backgroundImage: "/lore/lore3.webp",
    },
    {
      id: "lore-4",
      label: "Legacy",
      title: "Lore Four",
      body: pageFourContent,
      backgroundImage: "/lore/lore4.webp",
    },
  ]


  //BACKGROUND STYLING AND FADING
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [previousIndex, setPreviousIndex] = React.useState<number | null>(null)
  const [isFading, setIsFading] = React.useState(false)
  const section = sections[currentIndex]

  const getBackgroundStyle = (index: number) => {
    const image = sections[index]?.backgroundImage
    if (image) {
      return {
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }
    }

    return {
      background:
        "linear-gradient(270deg, var(--Primary-Deep-Forest, rgba(55, 68, 38, 0.34)) 0%, rgba(55, 98, 42, 0.34) 100%)",
    }
  }


  //FADING
  const handleChange = (nextIndex: number) => {
    if (nextIndex === currentIndex) {
      return
    }

    setPreviousIndex(currentIndex)
    setCurrentIndex(nextIndex)
    setIsFading(false)
    requestAnimationFrame(() => {
      setIsFading(true)
    })
  }

  const handlePrevious = () => {
    const nextIndex =
      currentIndex === 0 ? sections.length - 1 : currentIndex - 1
    handleChange(nextIndex)
  }

  const handleNext = () => {
    const nextIndex =
      currentIndex === sections.length - 1 ? 0 : currentIndex + 1
    handleChange(nextIndex)
  }

  React.useEffect(() => {
    if (!isFading) {
      return
    }

    const timeout = window.setTimeout(() => {
      setPreviousIndex(null)
      setIsFading(false)
    }, 450)

    return () => window.clearTimeout(timeout)
  }, [isFading])



  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ ...getBackgroundStyle(currentIndex)}}
      />
      {previousIndex !== null && (
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            isFading ? "opacity-0" : "opacity-100"
          )}
          style={{ ...getBackgroundStyle(previousIndex)}}
        />
      )}
      <div className="absolute inset-0 bg-black/20" />
      <DesktopNavbar />
      <main className="relative mx-auto min-h-[60vh] px-6 py-20 text-[var(--Shade-White,_#FFFCEA)]">
        <div className="relative">
          <div key={section.id} className="animate-in fade-in duration-500">
            {section.body}
          </div>
          {previousIndex !== null && (
            <div
              className={cn(
                "absolute inset-0 transition-opacity duration-500",
                isFading ? "opacity-0" : "opacity-100"
              )}
            >
              {sections[previousIndex].body}
            </div>
          )}
        </div>
      </main>
      <LorePagination
        items={sections.map((item) => ({ id: item.id, label: item.label }))}
        currentIndex={currentIndex}
        onChange={handleChange}
      />
      <Pagination className="fixed bottom-0 left-1/2 w-auto -translate-x-1/2">
        <PaginationContent className="gap-6">
          {currentIndex > 0 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(event) => {
                  event.preventDefault()
                  handlePrevious()
                }}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationNext
              href={
                currentIndex === sections.length - 1
                  ? "https://docs.google.com/forms/d/e/1FAIpQLSdsePfqBTXkRO-qfAEVDVDAGumcuLKH52H0hRVAtWINP1PdEw/viewform"
                  : "#"
              }
              label={currentIndex === sections.length - 1 ? "REGISTER" : "NEXT"}
              hoverBackground="linear-gradient(270deg, rgba(159, 184, 120, 0.50) 0%, rgba(55, 68, 38, 0.50) 100%), var(--Primary-Deep-Forest, #374426)"
              onClick={(event) => {
                if (currentIndex !== sections.length - 1) {
                  event.preventDefault()
                  handleNext()
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
