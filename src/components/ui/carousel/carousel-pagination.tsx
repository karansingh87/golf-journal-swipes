import * as React from "react"
import { cn } from "@/lib/utils"
import { useCarousel } from "./carousel-context"

interface CarouselPaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number
}

export const CarouselPagination = React.forwardRef<
  HTMLDivElement,
  CarouselPaginationProps
>(({ className, count, ...props }, ref) => {
  const { api } = useCarousel()
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    api.on("select", () => {
      setSelectedIndex(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div
      ref={ref}
      className={cn(
        "absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2",
        className
      )}
      {...props}
    >
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          className={cn(
            "h-2 w-2 rounded-full transition-all",
            selectedIndex === i
              ? "bg-foreground scale-125"
              : "bg-foreground/50 hover:bg-foreground/75"
          )}
          onClick={() => api?.scrollTo(i)}
        />
      ))}
    </div>
  )
})
CarouselPagination.displayName = "CarouselPagination"