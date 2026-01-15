"use client";

import Image from "next/image";
import { styled } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const BUTTON_WIDTH = 40; // px, matches 2.5rem
const CarouselContainer = styled("div")({
	position: "absolute",
	width: "740px",
	height: "154px",
	top: "1513px",
	left: "970px",
	zIndex: 3,
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "center",
});

const EmblaViewport = styled("div")({
	overflow: "hidden",
	width: `calc(100% - ${BUTTON_WIDTH * 2}px)`,
	maxWidth: `calc(100% - ${BUTTON_WIDTH * 2}px)`,
	height: "154px",
	borderRadius: "16px",
	margin: `0 ${BUTTON_WIDTH}px`,
	background: "transparent",
});

const EmblaContainer = styled("div")({
	display: "flex",
});

const EmblaSlide = styled("div")({
	position: "relative",
	minWidth: "33.3333%",
	height: "154px",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	padding: 0,
});

const EmblaButtonGroup = styled("div")({
	position: "absolute",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	display: "flex",
	alignItems: "center",
	justifyContent: "space-between",
	pointerEvents: "none",
	zIndex: 4,
});

const EmblaButtonWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
	height: "100%",
	pointerEvents: "auto",
});

const EmblaButton = styled("button")({
	background: "none",
	border: "none",
	borderRadius: 0,
	width: "2.5rem",
	height: "2.5rem",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: 0,
	cursor: "pointer",
	transition: "background 0.2s",
	'&:hover': {
		background: "none",
	},
});


const images = [
	"/home/concon.svg",
	"/home/drunkdeer.svg",
	"/home/solvari.svg",
	"/home/anon.svg",
];

const links = [
	"https://concon.shop/collections/rhythm-games", // Example links, replace as needed
	"https://drunkdeer.com/products/drunkdeer-a75-ultra-magnetic-keyboard-he-keyboard-keyboard-for-fps-gaming-keyboard?variant=52102310494511",
	"https://twitch.tv/solovari",
	"",
];

export function SponsorCarousel() {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		slidesToScroll: 1,
		align: 'start',
		dragFree: false,
		containScroll: 'trimSnaps',
	});

	const scrollPrev = useCallback(() => {
		if (emblaApi) emblaApi.scrollPrev();
	}, [emblaApi]);
1
	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<CarouselContainer>
			<EmblaButtonGroup>
				<EmblaButtonWrapper style={{ justifyContent: "flex-start" }}>
					<EmblaButton onClick={scrollNext} aria-label="Next sponsor">
						<svg width="20" height="39" viewBox="0 0 20 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(-0.628391 0.777898 0.776591 0.630005 17.8221 2.52002)" stroke="#374426" strokeWidth="4"/>
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(0.628391 0.777898 -0.776591 0.630005 1.80792 19.8694)" stroke="#374426" strokeWidth="4"/>
						</svg>
					</EmblaButton>
				</EmblaButtonWrapper>
				<EmblaButtonWrapper style={{ justifyContent: "flex-end" }}>
					<EmblaButton onClick={scrollPrev} aria-label="Previous sponsor">
						<svg width="20" height="39" viewBox="0 0 20 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(0.628391 0.777898 -0.776591 0.630005 1.80786 2.52002)" stroke="#374426" strokeWidth="4"/>
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(-0.628391 0.777898 0.776591 0.630005 17.822 19.8695)" stroke="#374426" strokeWidth="4"/>
						</svg>
					</EmblaButton>
				</EmblaButtonWrapper>
			</EmblaButtonGroup>
			<EmblaViewport ref={emblaRef}>
				<EmblaContainer>
					{images.map((src, idx) => (
						<EmblaSlide key={`${src}-${idx}`}>
							<a
								href={links[idx]}
								target="_blank"
								rel="noopener noreferrer"
								style={{ display: "block", width: "100%", height: "100%" }}
							>
								<Image
									src={src}
									alt={`Sponsor ${idx + 1}`}
									width={154}
									height={154}
									style={{ objectFit: "contain", display: "block", margin: "auto" }}
									priority={idx === 0}
								/>
							</a>
						</EmblaSlide>
					))}
				</EmblaContainer>
			</EmblaViewport>
		</CarouselContainer>
	);
}
