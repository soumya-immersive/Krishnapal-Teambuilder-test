"use client";
import React, { memo } from "react";
import Products from "../app/Products";

const Marquee = ({ products = [] }) => {
  return (
    <div className="mt-20 relative overflow-hidden">
      <h1 className="text-center text-secondary text-xl font-extrabold mb-10">
        You may also like
      </h1>

      {/* Auto marquee container */}
      <div className="relative w-full overflow-hidden">
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .marquee {
            display: flex;
            width: max-content;
            gap: 1.25rem; /* space between items */
            animation: marquee 25s linear infinite;
          }
          .marquee:hover {
            animation-play-state: paused; /* pause when hovered */
          }
        `}</style>

        {/* Duplicate products list so it loops seamlessly */}
        <div className="marquee">
          {products.concat(products).map((product, idx) => (
            <div key={idx} className="flex-shrink-0 mr-5">
              <Products gap="mr-5" products={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Marquee);
