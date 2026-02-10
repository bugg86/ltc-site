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
    <Pagination className="fixed right-6 top-1/2 z-3 w-auto -translate-y-1/2">
      <PaginationContent className="flex-col gap-3">
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
                    ? "h-[1vw] w-[1vw] rounded-full bg-[#9FB878]"
                    : "h-[1vw] w-[1vw] rounded-full bg-[#FFF7C2]"
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

