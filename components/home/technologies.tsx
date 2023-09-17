'use client';
import { TECHNOLOGIES } from "@/lib/constants";
import React, { useMemo } from "react";
import { Letters } from "../shared/letters";
import { useTheme } from "next-themes";

const Technology = () => {
    const technologies = useMemo(() => TECHNOLOGIES.map(word => word.name), [])
    const { theme } = useTheme();
    return (
        <Letters
            className="cursor-pointer px-4 flex max-w-fit items-center justify-center rounded-full border border-border bg-background shadow-md transition-colors hover:border-foreground/50"
            words={technologies}
            height={36}
            enterColor="#448ae9"
            updateColor={theme === 'light' ? "#333333" : "#ffffff"}
            exitColor="#448ae9"
            prefix="> "
            prefixColor={theme === 'light' ? "#333333" : "#ffffff"}
            onClick={(word) => console.log(word)}
        />
    );
};

export default Technology;
