"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface GalleryItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
}

export interface Gallery4Props {
  heading?: string;
  subheading?: string;
  items: GalleryItem[];
}

const Gallery4 = ({
  heading,
  subheading,
  items,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const update = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    update();
    carouselApi.on("select", update);
    return () => { carouselApi.off("select", update); };
  }, [carouselApi]);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="container mx-auto px-12 mb-8 flex items-end justify-between">
        <div className="flex flex-col gap-3">
          {heading && (
            <h2 className="text-[clamp(36px,4.5vw,64px)] font-light text-cream tracking-tight leading-[1.1]">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-[13px] font-light text-cream/40 max-w-md">{subheading}</p>
          )}
        </div>
        <div className="hidden shrink-0 gap-2 md:flex">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="w-10 h-10 rounded-sm border border-cream/15 text-cream-dim hover:bg-cream/10 hover:text-cream disabled:opacity-30 disabled:pointer-events-auto cursor-none"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => carouselApi?.scrollNext()}
            disabled={!canScrollNext}
            className="w-10 h-10 rounded-sm border border-cream/15 text-cream-dim hover:bg-cream/10 hover:text-cream disabled:opacity-30 disabled:pointer-events-auto cursor-none"
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <Carousel
        setApi={setCarouselApi}
        opts={{
          align: "start",
          breakpoints: { "(max-width: 768px)": { dragFree: true } },
        }}
      >
        <CarouselContent className="ml-12">
          {items.map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[320px] lg:basis-[400px] pl-3"
            >
              <div
                className="group relative overflow-hidden rounded-sm cursor-pointer"
                style={{ aspectRatio: "3/4" }}
                onClick={item.onClick}
              >
                {/* Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deep/90 via-deep/30 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col gap-1.5">
                  <span className="text-[10px] font-semibold tracking-[.2em] uppercase text-brown-lt">
                    {item.label}
                  </span>
                  <div className="text-[18px] font-light text-cream leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[12px] font-light text-cream/55 line-clamp-2 mt-0.5 mb-4">
                    {item.description}
                  </div>
                  <div className="flex items-center text-[11px] font-semibold tracking-[.14em] uppercase text-cream-dim group-hover:text-cream transition-colors">
                    <span>Ver fotos</span>
                    <ArrowRight className="ml-2 size-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots */}
      <div className="mt-6 flex justify-center gap-1.5">
        {items.map((_, i) => (
          <button
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-none ${
              currentSlide === i ? "bg-brown w-6" : "bg-cream/20 w-1.5"
            }`}
            onClick={() => carouselApi?.scrollTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export { Gallery4 };
