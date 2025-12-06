import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import type { MindMapData, MindMapNode } from '../types/research';

interface MindMapProps {
  data: MindMapData | null;
}

const MindMap: React.FC<MindMapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Use dynamic dimensions based on container or fullscreen state
    const width = isFullscreen ? window.innerWidth : 800;
    const height = isFullscreen ? window.innerHeight : 300;

    // Clear previous
    const svgElement = d3.select(svgRef.current);
    svgElement.selectAll("*").remove();

    const svg = svgElement
      .attr("viewBox", [0, 0, width, height])
      .attr("class", "w-full h-full cursor-move bg-slate-50/30");

    // Create a container group for zoom
    const g = svg.append("g");

    // Add zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);

    // Initial positioning in center
    svg.call(zoom.transform as any, d3.zoomIdentity.translate(width / 2, height / 2).scale(0.8));

    // Copy data to avoid mutation issues with React Strict Mode
    const nodes = data.nodes.map(d => ({ ...d }));
    const links = data.links.map(d => ({ ...d }));

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(150))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(0, 0)) // Center at 0,0 because we translated zoom to center
      .force("collide", d3.forceCollide().radius(60));

    const link = g.append("g")
      .attr("stroke", "#cbd5e1")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value || 1) * 2);

    const node = g.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("class", "cursor-pointer transition-opacity hover:opacity-80")
      .call(drag(simulation) as any)
      .on("click", (event, d) => {
        event.stopPropagation(); // Prevent zoom click from firing if we added one
        // Find the original node data including description
        const originalNode = data.nodes.find(n => n.id === (d as any).id);
        if (originalNode) {
          setSelectedNode(originalNode);
        }
      });

    // Node circles (Pastel colors)
    const colorScale = d3.scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5] as any)
      .range(["#fca5a5", "#fdba74", "#fcd34d", "#86efac", "#67e8f9", "#c4b5fd"]);

    node.append("circle")
      .attr("r", 35)
      .attr("fill", (d: any) => colorScale(d.group) as string)
      .attr("stroke", "#fff")
      .attr("stroke-width", 3)
      .attr("class", "shadow-md");

    node.append("text")
      .text((d: any) => d.label)
      .attr("x", 0)
      .attr("y", 4)
      .attr("text-anchor", "middle")
      .attr("font-size", "11px")
      .attr("fill", "#334155")
      .attr("class", "font-medium pointer-events-none select-none")
      .call(wrap, 70);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function drag(simulation: any) {
      function dragstarted(event: any) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event: any) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event: any) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    }

    function wrap(text: any, width: number) {
        text.each(function(this: any) {
            const text = d3.select(this);
            const words = text.text().split(/\s+/).reverse();
            let word;
            let line: string[] = [];
            let lineNumber = 0;
            const lineHeight = 1.1; // ems
            const y = text.attr("y");
            const dy = 0;
            let tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
            
            while (word = words.pop()) {
                line.push(word);
                tspan.text(line.join(" "));
                if ((tspan.node()?.getComputedTextLength() || 0) > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                }
            }
        });
    }

  }, [data, isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!data) return <div className="text-center text-gray-400 italic py-10">Generate research to see the mind map.</div>;

  return (
    <div 
      ref={containerRef}
      className={`
        relative bg-white/50 rounded-3xl shadow-lg border border-white overflow-hidden transition-all duration-300
        ${isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-white/95' : 'p-4'}
      `}
    >
        <svg 
            ref={svgRef} 
            className={`w-full ${isFullscreen ? 'h-screen' : 'h-[300px] rounded-2xl'}`}
        ></svg>
        
        {/* Controls */}
        <div className="absolute top-6 left-6 pointer-events-none opacity-50 text-xs text-slate-500 bg-white/80 px-2 py-1 rounded-md z-10">
           Scroll to Zoom • Drag to Pan
        </div>

        <button 
          onClick={toggleFullscreen}
          className="absolute top-6 right-6 bg-white hover:bg-slate-50 text-slate-600 p-2 rounded-lg shadow-md border border-slate-200 z-10 transition-colors"
          title={isFullscreen ? "Minimize" : "Fullscreen"}
        >
          {isFullscreen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3v3a2 2 0 0 1-2 2H3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M16 21v-3a2 2 0 0 1 2-2h3"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
          )}
        </button>

        {/* Selected Node Details Card */}
        {selectedNode && (
          <div className="absolute top-16 right-6 w-72 bg-white/90 backdrop-blur-md p-5 rounded-2xl shadow-xl border border-white/50 animate-fade-in z-10">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg text-slate-800 leading-tight">{selectedNode.label}</h3>
              <button 
                onClick={() => setSelectedNode(null)}
                className="text-slate-400 hover:text-slate-600 transition p-1"
              >
                ✕
              </button>
            </div>
            <div className="h-0.5 w-12 bg-pastel-purple mb-3 rounded-full"></div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedNode.description || "No description available for this node."}
            </p>
          </div>
        )}
    </div>
  );
};

export default MindMap;