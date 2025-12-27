'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
export default function MyCarousel({images}:{images:string[]}) {
  return (
    <>
      <Carousel opts={{align: "start",loop: true,}}  plugins={[ Autoplay({delay: 2000,}),]}>
  <CarouselContent>
    <CarouselItem><Image src={images[0]} height={300} width={300} alt='productPhoto'/></CarouselItem>
    <CarouselItem><Image src={images[2]} height={300} width={300} alt='productPhoto'/></CarouselItem>
    <CarouselItem><Image src={images[3]} height={300} width={300} alt='productPhoto'/></CarouselItem>
  </CarouselContent>
</Carousel>
    </>
  )
}
