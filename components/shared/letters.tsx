'use client';
import { useInterval } from "@/lib/hooks/use-interval"
import { cx } from "class-variance-authority";
import { select } from "d3"
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react"

function createIndexedDataset(letters: string[]): { letter: string, index: string }[] {
    const letterCounts: { [key: string]: number } = {};
    return letters.map((letter) => {
        if (letterCounts[letter]) {
            letterCounts[letter]++;
        } else {
            letterCounts[letter] = 1;
        }
        return { letter, index: `${letter}${letterCounts[letter]}` };
    });
}

export type LetterProps = {
    words: string[];
    prefix?: string;
    height?: number;
    width?: number;
    className?: string;
    letterTransitionDuration?: number;
    wordTransitionDuration?: number;
    enterClassName?: string;
    updateClassName?: string;
    exitClassName?: string;
    prefixClassName?: string;
    onClick?: (word: string) => void;
};

const PREFIX_CHAR_SUFFIX = 'P';

export const Letters = ({
    words,
    prefix = "",
    height = 60,
    width = (words.sort((a, b) => b.length - a.length)[0].length + prefix.length) * height / 2.5,
    className = "",
    letterTransitionDuration = 750,
    wordTransitionDuration = 4000,
    enterClassName = "fill-[blue]",
    updateClassName = "fill-primary",
    exitClassName = "fill-[blue]",
    prefixClassName = "fill-[blue]",
    onClick = () => { },
}: LetterProps) => {
    const letterHeight = height / 2;
    const letterWidth = height / 5;
    const prefixData = prefix.split("").map((letter) => ({ letter, index: `${letter}${PREFIX_CHAR_SUFFIX}` }));

    const ref = useRef(null);

    const indexedWordsets = useMemo(() => words.map((word) =>
        createIndexedDataset(word.split(""))), [words]);
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const svgElement = select(ref.current)
        const t = svgElement.transition()
            .duration(letterTransitionDuration);
        svgElement.selectAll("text")
            // @ts-expect-error
            .data([...prefixData, ...indexedWordsets[index]], d => d.index)
            .join(
                enter => enter.append("text")
                    .attr("class", enterClassName)
                    .attr("x", (d, i) => i * letterWidth)
                    .attr("y", -letterHeight)
                    .text(d => d.letter)
                    // @ts-expect-error
                    .call(enter => enter.transition(t)
                        .attr("y", 0)),
                update => update
                    .attr("class", (d, i) => d.index.includes(PREFIX_CHAR_SUFFIX) ? prefixClassName : updateClassName)
                    .attr("y", 0)
                    // @ts-expect-error
                    .call(update => update.transition(t)
                        .attr("x", (d, i) => i * letterWidth)),
                exit => exit
                    .attr("class", exitClassName)
                    // @ts-expect-error
                    .call(exit => exit.transition(t)
                        .attr("y", letterHeight)
                        .remove())
            );
    }, [enterClassName, exitClassName, index, indexedWordsets, letterHeight, letterTransitionDuration, letterWidth, prefixClassName, prefixData, updateClassName])

    useInterval(() => {
        setIndex((curIndex) => (curIndex + 1) % indexedWordsets.length);
    }, wordTransitionDuration)

    return (
        <svg
            viewBox={`0 ${-height / 3} ${width / 2} ${height / 2}`}
            height={height}
            width={width}
            style={{ fontSize: letterHeight / 2 }}
            className={cx("font-mono", "transition-colors", className)}
            ref={ref}
            onClick={() => onClick(words[index])}
        />
    )
}
