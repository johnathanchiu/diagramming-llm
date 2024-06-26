import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";
import * as d3 from "d3";

mermaid.initialize({ startOnLoad: false });

export function MermaidComponent({ source, id }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      if (mermaidRef.current && source) {
        // Clear previous content
        mermaidRef.current.innerHTML = "";

        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-diagram`,
          source
        );

        // Create an SVG container and apply zoom/pan using d3
        const svgContainer = d3
          .select(mermaidRef.current)
          .append("div")
          .attr("class", "svg-container")
          .style("position", "relative")
          .style("overflow", "hidden")
          .style("width", "100%")
          .style("height", "100%");

        const zoom = d3.zoom().on("zoom", (event) => {
          d3.select(mermaidRef.current)
            .select("svg g")
            .attr("transform", event.transform);
        });

        const svgElement = svgContainer
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .call(zoom)
          .append("g");

        svgElement.html(svg);
        bindFunctions?.(svgElement.node());
      }
    };

    initializeMermaid();
  }, [source]);

  return (
    <div
      id={id}
      ref={mermaidRef}
      style={{ width: "100%", height: "100%", overflow: "hidden" }}
    ></div>
  );
}
