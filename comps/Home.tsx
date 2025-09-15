"use client";
import { useState, useMemo } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [itemsPerRow, setItemsPerRow] = useState<number>(4);
  const [maxItems, setMaxItems] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<"" | "low" | "high">("");
  const [layout, setLayout] = useState<string>("auto");
  const [currency, setCurrency] = useState<"usd" | "jpy">("usd"); // NEW

  // Sort products when sortOrder changes
  const sortedProducts = useMemo(() => {
    if (sortOrder === "low") {
      return [...products].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "high") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  }, [sortOrder, products]);

  // Handle layout change (rows × cols)
  const handleLayoutChange = (value: string) => {
    setLayout(value);
    if (value === "3x4") {
      setItemsPerRow(4);
      setMaxItems(12);
    } else if (value === "4x3") {
      setItemsPerRow(3);
      setMaxItems(12);
    } else {
      setItemsPerRow(4);
      setMaxItems(null);
    }
  };

  return (
    <main>
      <MainBanner banner={bannerData[0]} />

      {/* === TITLE + CONTROLS */}
      <section className="flex items-center justify-between px-4 sm:px-8 mb-4">
        {/* Left: Layout */}
        <select
          value={layout}
          onChange={(e) => handleLayoutChange(e.target.value)}
          className="border px-3 py-1 rounded-md text-sm"
        >
          <option value="3x4">3 × 4</option>
          <option value="4x3">4 × 3</option>
          <option value="auto">Show All</option>
        </select>

        {/* Center: Title */}
        <h1
          className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary
          font-sans font-extrabold sm:rounded-t-3xl text-center"
        >
          Best Selling Headphones
        </h1>

        {/* Right: Sort + Currency Toggle */}
        <div className="flex items-center gap-2">
          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "" | "low" | "high")
            }
            className="border px-3 py-1 rounded-md text-sm"
          >
            <option value="">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

          {/* Currency toggle button */}
          <button
            onClick={() =>
              setCurrency((prev) => (prev === "usd" ? "jpy" : "usd"))
            }
            className="border px-3 py-1 rounded-md text-sm bg-primary text-white cursor-pointer"
          >
            {currency === "usd" ? "$" : "¥"}
          </button>

        </div>
      </section>

      {/* === SHOW PRODUCTS */}
      <section
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-${itemsPerRow} lg:mx-20 overflow-hidden`}
      >
        {(maxItems ? sortedProducts.slice(0, maxItems) : sortedProducts).map(
          (product) => (
            <Products key={product._id} products={product} currency={currency} />
          )
        )}
      </section>

      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
