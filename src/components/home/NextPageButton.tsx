"use client"

import Image from 'next/image';
import { styled } from "@mui/material";

interface NextPageButtonProps {
  onClick?: () => void;
  ariaLabel?: string;
}

const Button = styled("button")({
  position: "absolute",
  width: "1.93vw",
  height: "2.318vw",
  top: "53vw",
  left: "49.01vw",
  zIndex: "3",
  cursor: "pointer",
  "@media (max-width: 768px)": {
    width: "7vw",
    height: "8.4vw",
    left: "46.5vw",
    top: "90%",
  },
});




export function NextPageButton({ onClick, ariaLabel = 'Next page' }: NextPageButtonProps) {
    return (
    <Button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <Image src="/home/nextpage.svg" alt="Next page" fill />
    </Button>
  );
}
