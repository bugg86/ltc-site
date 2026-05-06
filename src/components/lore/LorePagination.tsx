import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"

type LorePaginationItem = {
  id: string
  label: string
}

type LorePaginationProps = {
  items: LorePaginationItem[]
  currentIndex: number
  onChange: (nextIndex: number) => void
}

export function LorePagination({
  items,
  currentIndex,
  onChange,
}: LorePaginationProps) {
  return (
    <Pagination className="fixed z-3 bottom-20 left-1/2 w-auto -translate-x-1/2 md:right-6 md:top-1/2 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2">
      <PaginationContent className="flex-row gap-4 md:flex-col md:gap-3">
        {items.map((item, index) => {
          const isActive = index === currentIndex

          return (
            <PaginationItem key={item.id}>
              <PaginationLink
                href="#"
                aria-label={`Go to ${item.label}`}
                isActive={isActive}
                size="icon-xs"
                className={
                  isActive
                    ? "h-2.5 w-2.5 md:h-[1vw] md:w-[1vw] rounded-full bg-[#9FB878]"
                    : "h-2.5 w-2.5 md:h-[1vw] md:w-[1vw] rounded-full bg-[#FFF7C2]"
                }
                onClick={(event) => {
                  event.preventDefault()
                  onChange(index)
                }}
              >
                <span className="sr-only">{item.label}</span>
              </PaginationLink>
            </PaginationItem>
          )
        })}
      </PaginationContent>
    </Pagination>
  )
}
