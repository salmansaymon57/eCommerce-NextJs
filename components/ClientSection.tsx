// components/ClientSection.tsx
"use client";
import { useState } from "react";
import { TrendingProducts } from "./TrendingProducts";

export const ClientSection = () => {
  console.log("ClientSection rendered on client");
  const [isMounted] = useState(true); // Forces client-side rendering
  return isMounted ? (
    <div>
      <TrendingProducts />
    </div>
  ) : null;
};
