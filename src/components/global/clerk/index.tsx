"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from 'react'
import { useTheme } from "next-themes";

const CustomClerkProvider = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    return <ClerkProvider
        appearance={{
            baseTheme: resolvedTheme === "dark" ? dark : undefined,
        }}
    >
        {children}
    </ClerkProvider>
}

export default CustomClerkProvider;