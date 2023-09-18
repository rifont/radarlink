'use client';
import React, { useEffect } from "react";
import * as d3 from "d3";
import radarData from "./thoughtworks-radar.json";

export const Radar = () => {
    useEffect(() => {
        const width = 800;
        const height = 600;

        const svg = d3.select("#radar")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // Your D3 code for creating the technology radar

        // Use radarData as the data source for the D3 radar
        svg.selectAll("circle")
            .data(radarData)
            .enter()
            .append("circle")
            .attr("cx", width / 2)
            .attr("cy", height / 2)
            .attr("r", 10)
            .style("fill", "blue");

    }, []);

    return <div id="radar"></div>;
};

export default Radar;
