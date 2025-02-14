"use client";

import MenuContextProvider from "@/components/MenuContext";
import HomeContent from "@/components/HomeContent";

export default function Home() {
  return (
    <MenuContextProvider>
      <HomeContent />
    </MenuContextProvider>
  );
}
