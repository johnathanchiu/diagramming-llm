import mermaid from "mermaid";
import { useEffect, useRef } from "react";

mermaid.initialize({});

export function MermaidComponent({ source, id }) {
  const mermaidRef = useRef(null);

  useEffect(() => {
    const initializeMermaid = async () => {
      if (mermaidRef.current && source) {
        mermaidRef.current.innerHTML = source;
        const { svg, bindFunctions } = await mermaid.render(
          `mermaid-diagram`,
          source
        );
        mermaidRef.current.innerHTML = svg;
        bindFunctions?.(mermaidRef.current);
      }
    };

    initializeMermaid();
  }, [source]);

  return <div id={id} ref={mermaidRef}></div>;
}
