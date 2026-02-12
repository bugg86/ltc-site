"use client"

import Image from 'next/image';
import { styled } from "@mui/material";
import React from 'react';
import { useRef, useState } from 'react';

interface NextPageButtonProps {
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

const Button = styled("button")({
  position: "absolute",
  width: "1.93vw",
  height: "4.12vh",
  top: "90vh",
  left: "49.01vw",
  zIndex: "3",
  cursor: "pointer",
});




export function NextPageButton({ onClick, className = '', ariaLabel = 'Next page' }: NextPageButtonProps) {
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
