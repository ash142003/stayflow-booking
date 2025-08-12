import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((src, i) => (
            <div className="min-w-0 flex-[0_0_100%]" key={i}>
              <img src={src} alt={`${alt} ${i + 1}`} className="h-[320px] md:h-[420px] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between p-2">
        <Button size="icon" variant="secondary" onClick={scrollPrev} className="pointer-events-auto">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button size="icon" variant="secondary" onClick={scrollNext} className="pointer-events-auto">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}