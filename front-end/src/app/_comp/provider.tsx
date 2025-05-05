"use client";

import { HeroUIProvider } from "@heroui/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Provider({ children }: Props) {
  return (
    <>
      <HeroUIProvider>{children}</HeroUIProvider>
    </>
  );
}
