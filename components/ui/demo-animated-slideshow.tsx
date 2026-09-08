"use client"

import * as React from "react"
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
} from "@/components/ui/animated-slideshow"

const SLIDES = [
  {
    id: "slide-1",
    title: "fullstack",
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/8c/8c0f960426250d158fbd13dcb4c244268f0847b8b3f2ae7788a62b9bcf6b7b02.jpg",
  },
  {
    id: "slide-2",
    title: "frontend dev",
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/93/9309cec6a1caedbe56f26432bc56830785f7f06089f66190cfebcbe65e92789b.jpg",
  },
  {
    id: "slide-3",
    title: "backend dev",
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/e5/e53e3c7473052546682df15ee99f20ccf6b5413039fc6cafa1b23717237091d0.jpg",
  },
  {
    id: "slide-4",
    title: "seo optimisation",
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/64/64d1fa5c32ed1dc0c2ee577155618270fdff26e47f63c2fb4bc68c127d66d669.jpg",
  },
  {
    id: "slide-5",
    title: "ai engineer",
    imageUrl:
      "https://cdn.21st.dev/assets/mirror/48/4875e9daf51a4045c9f1e1f3e58885d32b7f28e04a5c1471c86c135f0b1c8cd2.jpg",
  },
]

export function HoverSliderDemo() {
  return (
    <HoverSlider className="min-h-svh place-content-center p-6 md:px-12 bg-[#faf9f5] text-[#3d3929]">
      <h3 className="mb-6 text-xs font-medium capitalize tracking-wide text-[#c96442]">
        / our services
      </h3>
      <div className="flex flex-wrap items-center justify-evenly gap-6 md:gap-12">
        <div className="flex flex-col space-y-2 md:space-y-4">
          {SLIDES.map((slide, index) => (
            <TextStaggerHover
              key={slide.title}
              index={index}
              className="cursor-pointer text-4xl font-bold uppercase tracking-tighter"
              text={slide.title}
            />
          ))}
        </div>
        <HoverSliderImageWrap>
          {SLIDES.map((slide, index) => (
            <div key={slide.id}>
              <HoverSliderImage
                index={index}
                imageUrl={slide.imageUrl}
                src={slide.imageUrl}
                alt={slide.title}
                className="size-full max-h-96 object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
          ))}
        </HoverSliderImageWrap>
      </div>
    </HoverSlider>
  )
}

export default HoverSliderDemo

