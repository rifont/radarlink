// @ts-nocheck
'use client';
import * as d3 from "d3"
import { useEffect, useRef, useState } from "react"
import data from './flare-2.json';

function randomLetters() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
}

export const CirclePacking = () => {
    const [dataset, setDataset] = useState(
        randomLetters()
    )
    const ref = useRef(null)
    // Specify the chart’s dimensions.
    const width = 928;
    const height = width;

    // Create the color scale.
    const color = d3.scaleLinear()
        .domain([0, 5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(d3.interpolateHcl);

    useEffect(() => {
        const svgElement = d3.select(ref.current)

        // Compute the layout.
        const pack = data => d3.pack()
            .size([width, height])
            .padding(3)
            (d3.hierarchy(data)
                .sum(d => d.value)
                .sort((a, b) => b.value - a.value));
        const root = pack(data);

        // Append the nodes.
        const node = svgElement.append("g")
            .selectAll("circle")
            .data(root.descendants().slice(1))
            .join("circle")
            .attr("fill", d => d.children ? color(d.depth) : "white")
            .attr("pointer-events", d => !d.children ? "none" : null)
            .on("mouseover", function () { d3.select(this).attr("stroke", "#000"); })
            .on("mouseout", function () { d3.select(this).attr("stroke", null); })
            .on("click", (event, d) => focus !== d && (zoom(event, d), event.stopPropagation()));

        // Append the text labels.
        const label = svgElement.append("g")
            .style("font", "10px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .style("fill-opacity", d => d.parent === root ? 1 : 0)
            .style("display", d => d.parent === root ? "inline" : "none")
            .text(d => d.data.name);

        // Create the zoom behavior and zoom immediately in to the initial focus node.
        svgElement.on("click", (event) => zoom(event, root));
        let focus = root;
        let view;
        zoomTo([focus.x, focus.y, focus.r * 2]);

        function zoomTo(v) {
            const k = width / v[2];

            view = v;

            label.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
            node.attr("r", d => d.r * k);
        }

        function zoom(event, d) {
            const focus0 = focus;

            focus = d;

            const transition = svgElement.transition()
                .duration(event.altKey ? 7500 : 750)
                .tween("zoom", d => {
                    const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
                    return t => zoomTo(i(t));
                });

            label
                .filter(function (d) { return d.parent === focus || this.style.display === "inline"; })
                .transition(transition)
                .style("fill-opacity", d => d.parent === focus ? 1 : 0)
                .on("start", function (d) { if (d.parent === focus) this.style.display = "inline"; })
                .on("end", function (d) { if (d.parent !== focus) this.style.display = "none"; });
        }
    }, [dataset])

    return (
        <svg
            viewBox={`-${width / 2} -${height / 2} ${width} ${height}`}
            height={height}
            width={width}
            style={{ maxWidth: '100%', height: 'auto', display: 'block', margin: '0 -14px', background: color(0), cursor: 'pointer' }}
            ref={ref}
        />
    )
}
