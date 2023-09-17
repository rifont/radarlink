'use client';
import { TECHNOLOGIES } from "@/lib/constants";
import React, { useMemo } from "react";
import { Letters } from "../shared/letters";

const Technology = () => {
    const technologies = useMemo(() => TECHNOLOGIES.map(word => word.name), [])
    return (
        <Letters
            className="px-4 flex max-w-fit items-center justify-center rounded-full border border-gray-300 bg-white shadow-md transition-colors hover:border-gray-800"
            words={technologies}
            height={36}
            enterColor="#448ae9"
            updateColor="#333333"
            exitColor="#448ae9"
            prefix="> "
            prefixColor="#333333"
        />
    );
};

export default Technology;
