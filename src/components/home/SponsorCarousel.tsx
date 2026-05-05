"use client";

import Image from "next/image";
import { styled } from "@mui/material";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const BUTTON_WIDTH_VW = "2.083vw";

const CarouselContainer = styled("div")({
	position: "absolute",
	width: "38.542vw",
	height: "8.493vw",
	top: "27.187vw",
	left: "50.521vw",
	zIndex: 3,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	"@media (max-width: 768px)": {
		width: "90vw",
		height: "auto",
		top: "73%",
		left: "5vw",
		flexDirection: "column",
		gap: "6vw",
	},
});

const EmblaViewport = styled("div")({
	overflow: "hidden",
	width: `calc(100% - ${BUTTON_WIDTH_VW} - ${BUTTON_WIDTH_VW})`,
	maxWidth: `calc(100% - ${BUTTON_WIDTH_VW} - ${BUTTON_WIDTH_VW})`,
	height: "8.493vw",
	borderRadius: "0.833vw",
	margin: `0 ${BUTTON_WIDTH_VW}`,
	background: "transparent",
	"@media (max-width: 768px)": {
		width: "100%",
		maxWidth: "100%",
		height: "22vw",
		margin: 0,
		order: 1,
	},
});

const EmblaContainer = styled("div")({
	display: "flex",
});

const EmblaSlide = styled("div")({
	position: "relative",
	minWidth: "33.3333%",
	height: "8.493vw",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	boxSizing: "border-box",
	padding: 0,
	"@media (max-width: 768px)": {
		height: "22vw",
	},
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
	"@media (max-width: 768px)": {
		position: "static",
		width: "auto",
		height: "auto",
		justifyContent: "center",
		gap: "6vw",
		pointerEvents: "auto",
		order: 2,
	},
});

const EmblaButtonWrapper = styled("div")({
	display: "flex",
	alignItems: "center",
	height: "100%",
	pointerEvents: "auto",
	"@media (max-width: 768px)": {
		height: "auto",
	},
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
	color: "#374426",
	transition: "background 0.2s",
	'&:hover': {
		background: "none",
	},
	"@media (max-width: 768px)": {
		color: "#FFF7C2",
	},
});


const images = [
	"/home/concon.svg",
	"/home/drunkdeer.webp",
	"/home/solvari.webp",
	"/home/anon.webp",
];

const links = [
	"https://concon.shop/collections/rhythm-games",
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

	const scrollNext = useCallback(() => {
		if (emblaApi) emblaApi.scrollNext();
	}, [emblaApi]);

	return (
		<CarouselContainer>
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
									style={{ objectFit: "contain", display: "block", margin: "auto", width: "100%", height: "100%" }}
									priority={idx === 0}
								/>
							</a>
						</EmblaSlide>
					))}
				</EmblaContainer>
			</EmblaViewport>
			<EmblaButtonGroup>
				<EmblaButtonWrapper style={{ justifyContent: "flex-start" }}>
					<EmblaButton onClick={scrollPrev} aria-label="Previous sponsor">
						<svg width="20" height="39" viewBox="0 0 20 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(-0.628391 0.777898 0.776591 0.630005 17.8221 2.52002)" stroke="currentColor" strokeWidth="4"/>
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(0.628391 0.777898 -0.776591 0.630005 1.80792 19.8694)" stroke="currentColor" strokeWidth="4"/>
						</svg>
					</EmblaButton>
				</EmblaButtonWrapper>
				<EmblaButtonWrapper style={{ justifyContent: "flex-end" }}>
					<EmblaButton onClick={scrollNext} aria-label="Next sponsor">
						<svg width="20" height="39" viewBox="0 0 20 39" fill="none" xmlns="http://www.w3.org/2000/svg">
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(0.628391 0.777898 -0.776591 0.630005 1.80786 2.52002)" stroke="currentColor" strokeWidth="4"/>
							<line y1="-2" x2="23.4181" y2="-2" transform="matrix(-0.628391 0.777898 0.776591 0.630005 17.822 19.8695)" stroke="currentColor" strokeWidth="4"/>
						</svg>
					</EmblaButton>
				</EmblaButtonWrapper>
			</EmblaButtonGroup>
		</CarouselContainer>
	);
}
