"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { UrlContextProvider } from "../context/UrlContext";
import { TagContextProvider } from "@/context/TagContext";
import { UserContextProvider } from "@/context/UserContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <UserContextProvider>
        <UrlContextProvider>
          <TagContextProvider>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </TagContextProvider>
        </UrlContextProvider>
      </UserContextProvider>
    </NextUIProvider>
  );
}
