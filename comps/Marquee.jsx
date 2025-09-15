"use client";
import React, { memo, useRef } from "react";
import Products from "../app/Products";
import { ChevronLeft, ChevronRight } from "lucide-react"; // keep if you have lucide-react installed

const Marquee = ({ products = [] }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { clientWidth } = scrollRef.current;
    const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="mt-20 relative">
      <h1 className="text-center text-secondary text-xl font-extrabold">
        You may also like
      </h1>

      <section className="mt-10 relative h-56 sm:h-96 w-full overflow-hidden">
        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex space-x-5 overflow-x-auto scroll-smooth px-6 py-4"
          // optional: enable grabbing cursor on desktop
          style={{ cursor: "grab" }}
        >
          {products.map((product) => (
            <div key={product._id} className="flex-shrink-0">
              {/* Products expects a `products` prop (single product) */}
              <Products gap={"mr-5"} products={product} />
            </div>
          ))}
        </div>

        {/* Left arrow */}
        <button
          aria-label="Scroll left"
          onClick={() => scroll("left")}
          className="absolute top-1/2 -translate-y-1/2 left-2 z-20 bg-white/90 dark:bg-black/80 shadow rounded-full p-2 cursor-pointer hover:scale-105 transition"
        >
          <ChevronLeft className="h-5 w-5 text-primary" />
        </button>

        {/* Right arrow */}
        <button
          aria-label="Scroll right"
          onClick={() => scroll("right")}
          className="absolute top-1/2 -translate-y-1/2 right-2 z-20 bg-white/90 dark:bg-black/80 shadow rounded-full p-2 cursor-pointer hover:scale-105 transition"
        >
          <ChevronRight className="h-5 w-5 text-primary" />
        </button>
      </section>
    </div>
  );
};

export default memo(Marquee);
