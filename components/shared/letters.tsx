'use client';
import { useInterval } from "@/lib/hooks/use-interval"
import { cx } from "class-variance-authority";
import { select } from "d3"
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

const WORDS = [
    "javascript",
    "typescript",
    "react",
    "angular",
    "vue",
    "html",
    "css",
    "sass",
    "less",
    "bootstrap",
    "tailwind",
    "material-ui",
    "redux",
    "mobx",
    "graphql",
    "apollo",
    "axios",
    "fetch",
    "webpack",
    "babel",
    "eslint",
    "prettier",
    "jest",
    "mocha",
    "chai",
    "enzyme",
    "cypress",
    "storybook",
    "next.js",
    "gatsby",
    "nuxt.js",
    "express",
    "koa",
    "nestjs",
    "django",
    "flask",
    "laravel",
    "ruby on rails",
    "spring boot",
    "dotnet",
    "php",
    "mysql",
    "postgresql",
    "mongodb",
    "redis",
    "firebase",
    "aws",
    "azure",
    "google cloud",
    "docker",
    "kubernetes",
    "jenkins",
    "circleci",
    "travis ci",
    "git",
    "github",
    "gitlab",
    "bitbucket",
    "jira",
    "confluence",
    "slack",
    "trello",
    "notion",
    "vscode",
    "intellij",
    "webstorm",
    "pycharm",
    "android studio",
    "xcode",
    "vim",
    "emacs",
    "agile",
    "scrum",
    "kanban",
    "devops",
    "continuous integration",
    "continuous deployment",
    "test-driven development",
    "unit testing",
    "integration testing",
    "end-to-end testing",
    "performance testing",
    "security testing",
    "code review",
    "pair programming",
    "refactoring",
    "clean code",
    "design patterns",
    "algorithms",
    "data structures",
    "database design",
    "rest",
    "graphql",
    "soap",
    "oauth",
    "jwt",
    "session management",
    "authentication",
    "authorization",
    "encryption",
    "hashing",
    "caching",
    "logging",
    "monitoring",
    "troubleshooting",
    "debugging",
    "error handling",
    "exception handling",
    "agile methodologies",
    "waterfall methodology",
    "scrum",
    "kanban",
    "lean",
    "pair programming",
    "continuous integration",
    "continuous deployment",
    "test-driven development",
    "behavior-driven development",
    "object-oriented programming",
    "functional programming",
    "imperative programming",
    "declarative programming",
    "procedural programming",
    "concurrent programming",
    "parallel programming",
    "asynchronous programming",
    "synchronous programming",
    "static typing",
    "dynamic typing",
    "strong typing",
    "weak typing",
    "static analysis",
    "linting",
    "code coverage",
    "code quality",
    "code review",
    "version control",
    "git",
    "svn",
    "mercurial",
    "continuous integration",
    "continuous deployment",
    "build automation",
    "dependency management",
    "package management",
    "build tools",
    "task runners",
    "module bundlers",
    "package managers",
    "linter",
    "formatter",
    "transpiler",
    "minifier",
    "bundler",
    "compiler",
    "interpreter",
    "virtual machine",
    "containerization",
    "orchestration",
    "microservices",
    "serverless",
    "cloud computing",
];

export type LetterProps = {
    words?: string[];
    height?: number;
    className?: string;
    letterTransitionDuration?: number;
    wordTransitionDuration?: number;
    enterColor?: string;
    updateColor?: string;
    exitColor?: string;
};

export const Letters = ({
    words = WORDS,
    height = 60,
    className = "",
    letterTransitionDuration = 750,
    wordTransitionDuration = 3000,
    enterColor = "blue",
    updateColor = "black",
    exitColor = "blue",
}: LetterProps) => {
    const width = height * 5;
    const letterHeight = height / 2;
    const letterWidth = height / 5;

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
            .data(indexedWordsets[index], d => d.index)
            .join(
                enter => enter.append("text")
                    .attr("fill", enterColor)
                    .attr("x", (d, i) => i * letterWidth)
                    .attr("y", -letterHeight)
                    .text(d => d.letter)
                    // @ts-expect-error
                    .call(enter => enter.transition(t)
                        .attr("y", 0)),
                update => update
                    .attr("fill", updateColor)
                    .attr("y", 0)
                    // @ts-expect-error
                    .call(update => update.transition(t)
                        .attr("x", (d, i) => i * letterWidth)),
                exit => exit
                    .attr("fill", exitColor)
                    // @ts-expect-error
                    .call(exit => exit.transition(t)
                        .attr("y", letterHeight)
                        .remove())
            );
    }, [enterColor, exitColor, index, indexedWordsets, letterHeight, letterTransitionDuration, letterWidth, updateColor])

    useInterval(() => {
        setIndex((curIndex) => (curIndex + 1) % indexedWordsets.length);
    }, wordTransitionDuration)

    return (
        <svg
            viewBox={`0 ${-height / 3} ${width / 2} ${height / 2}`}
            height={height}
            width={width}
            style={{ fontSize: letterHeight / 2 }}
            className={cx("font-mono", className)}
            ref={ref}
        />
    )
}
