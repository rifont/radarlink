'use client';
import { TECHNOLOGIES } from "@/lib/constants";
import React, { useMemo } from "react";
import { Letters } from "@/components/shared/letters";

const Technology = () => {
    const technologies = useMemo(() => TECHNOLOGIES.map(word => word.name), [])
    return (
        <Letters
            className="border-border bg-background hover:border-foreground/50 flex max-w-fit cursor-pointer items-center justify-center rounded-full border px-4 shadow-md transition-colors"
            words={technologies}
            height={36}
            enterClassName="fill-[#448ae9]"
            updateClassName="fill-primary"
            exitClassName="fill-[#448ae9]"
            prefixClassName="fill-primary"
            prefix="> "
            onClick={(word) => console.log(word)}
        />
    );
};

export default Technology;
