import * as React from "react"
import Image from "next/image"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants, type Button } from "@/components/ui/button"

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<"a">

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className
      )}
      {...props}
    />
  )
}

const REGISTER = (
  <Image
              src="/home/register.svg"
              alt="Register"
              fill
            />
);

function PaginationPrevious({
  className,
  style,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  const registerStyle: React.CSSProperties = {
    background:
      "linear-gradient(90deg, rgba(55, 68, 38, 0.50) 0%, rgba(55, 98, 42, 0.50) 100%), var(--Primary-Deep-Forest, #374426)",
    borderRadius: "2vh",
    borderRight: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    borderBottom: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    borderLeft: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    color: "#FFF7C2",
    fontFamily: "var(--font-josefin-sans)",
    fontStyle: "italic",
    fontWeight: 500,
    fontSize: "3.6vh",
  }

  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        "relative gap-2 px-6 w-[16.6667vw] h-[7.6923vh] -translate-y-[10vh]",
        className
      )}
      style={{ ...registerStyle, ...style }}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: "calc(7.6923vh * -0.05 - .75vh)",
          width: "calc(16.6667vw * 0.641)",
          height: "calc(7.6923vh * 0.319)",
        }}
      >
        {REGISTER}
      </span>
      <span className="absolute inset-0 flex items-center justify-center leading-none translate-y-[.6vh]">
        BACK
      </span>
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  style,
  label = "NEXT",
  ...props
}: React.ComponentProps<typeof PaginationLink> & { label?: string }) {
  const registerStyle: React.CSSProperties = {
    background:
      "linear-gradient(90deg, rgba(55, 68, 38, 0.50) 0%, rgba(55, 98, 42, 0.50) 100%), var(--Primary-Deep-Forest, #374426)",
    borderRadius: "2vh",
    borderRight: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    borderBottom: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    borderLeft: ".2vh solid var(--Primary-Pistachio, #9FB878)",
    color: "#FFF7C2",
    fontFamily: "var(--font-josefin-sans)",
    fontStyle: "italic",
    fontWeight: 500,
    fontSize: "3.6vh"
  }

  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        "relative gap-2 px-6 w-[16.6667vw] h-[7.6923vh] -translate-y-[10vh]",
        className
      )}
      style={{ ...registerStyle, ...style }}
      {...props}
    >
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{
          top: "calc(7.6923vh * -0.05 - .75vh)",
          width: "calc(16.6667vw * 0.641)",
          height: "calc(7.6923vh * 0.319)",
        }}
      >
        {REGISTER}
      </span>
      <span className="absolute inset-0 flex items-center justify-center leading-none translate-y-[.6vh]">
        {label}
      </span>
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
