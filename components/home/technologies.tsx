'use client';
import { TECHNOLOGIES } from "@/lib/constants";
import React, { useMemo } from "react";
import { Letters } from "../shared/letters";

const Technology = () => {
    const technologies = useMemo(() => TECHNOLOGIES.map(word => word.name), [])
    return (
        <Letters
            className="cursor-pointer px-4 flex max-w-fit items-center justify-center rounded-full border border-border bg-background shadow-md transition-colors hover:border-foreground/50"
            words={technologies}
            height={36}
            enterClassName="fill-[#448ae9]"
            updateClassName="fill-primary"
            existClassName="fill-[#448ae9]"
            prefixClassName="fill-primary"
            prefix="> "
            onClick={(word) => console.log(word)}
        />
    );
};

export default Technology;
