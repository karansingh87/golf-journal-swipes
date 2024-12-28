import { UseEmblaCarouselType, EmblaCarouselType } from 'embla-carousel-react'

export type CarouselApi = EmblaCarouselType
export type UseCarouselParameters = Parameters<typeof UseEmblaCarouselType>
export type CarouselOptions = UseCarouselParameters[0]
export type CarouselPlugin = UseCarouselParameters[1]

export type CarouselProps = {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
  setApi?: (api: CarouselApi) => void
}

export type CarouselContextProps = {
  carouselRef: ReturnType<typeof UseEmblaCarouselType>[0]
  api: ReturnType<typeof UseEmblaCarouselType>[1]
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} & CarouselProps