import { useEffect, useRef, useCallback } from 'react';
import cytoscape from 'cytoscape';

const TYPE_COLORS = {
  entry:    '#ff6b6b',
  business: '#fbbf24',
  utility:  '#60a5fa',
  external: '#34d399',
};

const TYPE_BORDER = {
  entry:    '#ff4040',
  business: '#f59e0b',
  utility:  '#3b82f6',
  external: '#10b981',
};

function buildElements(nodes, edges, highlightedNodes, selectedNodeId, isHeatmapMode) {
  const highlightSet = new Set(highlightedNodes || []);
  const hasHighlight = highlightSet.size > 0;

  const cyNodes = nodes.map(n => {
    let nodeColor = TYPE_COLORS[n.type] || '#6366f1';
    let nodeBorder = TYPE_BORDER[n.type] || '#6366f1';

    if (isHeatmapMode) {
      if (n.complexityLevel === 'high') { nodeColor = '#ef4444'; nodeBorder = '#b91c1c'; }
      else if (n.complexityLevel === 'medium') { nodeColor = '#f59e0b'; nodeBorder = '#d97706'; }
      else { nodeColor = '#10b981'; nodeBorder = '#059669'; }
    } else if (n.isDeadCode) {
      nodeColor = '#4b5563';
      nodeBorder = '#374151';
    }

    const label = n.isDeadCode ? `⚠️ ${n.label}` : n.label;

    return {
      data: {
        id: n.id,
        label: label,
        type: n.type,
        impactScore: n.impactScore,
        loc: n.loc,
        summary: n.summary,
        resolvedDeps: n.resolvedDeps,
        dependents: n.dependents,
        complexity: n.complexity,
        complexityLevel: n.complexityLevel,
        isDeadCode: n.isDeadCode,
        // visual
        nodeColor,
        nodeBorder,
        nodeSize: 24 + n.impactScore * 38,
        nodeOpacity: hasHighlight ? (highlightSet.has(n.id) ? 1 : 0.15) : 1,
        isSelected: n.id === selectedNodeId ? 1 : 0,
        isHighlighted: highlightSet.has(n.id) ? 1 : 0,
      },
    };
  });

  const cyEdges = edges.map((e, i) => ({
    data: {
      id: `e${i}`,
      source: e.source,
      target: e.target,
      edgeOpacity: hasHighlight ? (highlightSet.has(e.source) || highlightSet.has(e.target) ? 0.8 : 0.05) : 0.3,
    },
  }));

  return [...cyNodes, ...cyEdges];
}

export default function GraphCanvas({ graphData, onNodeClick, highlightedNodes, selectedNodeId, isHeatmapMode }) {
  const containerRef = useRef(null);
  const cyRef = useRef(null);

  // Init Cytoscape when graphData changes
  useEffect(() => {
    if (!graphData || !containerRef.current) return;

    if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null; }

    const elements = buildElements(graphData.nodes, graphData.edges, highlightedNodes, selectedNodeId, isHeatmapMode);

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': 'data(nodeColor)',
            'border-color': 'data(nodeBorder)',
            'border-width': 2,
            'width': 'data(nodeSize)',
            'height': 'data(nodeSize)',
            'label': 'data(label)',
            'color': '#e8eaf6',
            'font-size': '10px',
            'font-family': 'JetBrains Mono, monospace',
            'text-valign': 'bottom',
            'text-margin-y': 5,
            'text-max-width': '120px',
            'text-wrap': 'ellipsis',
            'opacity': 'data(nodeOpacity)',
            'shadow-blur': 20,
            'shadow-color': 'data(nodeColor)',
            'shadow-opacity': 0.5,
            'shadow-offset-x': 0,
            'shadow-offset-y': 0,
            'transition-property': 'opacity, border-width, width, height',
            'transition-duration': '200ms',
          },
        },
        {
          selector: 'node:selected, node[isSelected=1]',
          style: {
            'border-width': 3,
            'border-color': '#ffffff',
            'width': ele => ele.data('nodeSize') * 1.25,
            'height': ele => ele.data('nodeSize') * 1.25,
          },
        },
        {
          selector: 'node:hover',
          style: {
            'border-width': 3,
            'overlay-color': '#ffffff',
            'overlay-opacity': 0.05,
            'overlay-padding': 8,
          },
        },
        {
          selector: 'edge',
          style: {
            'width': 1.5,
            'line-color': '#4f46e5',
            'target-arrow-color': '#6366f1',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'opacity': 'data(edgeOpacity)',
            'arrow-scale': 0.8,
            'transition-property': 'opacity',
            'transition-duration': '200ms',
          },
        },
      ],
      layout: {
        name: 'cose',
        animate: true,
        animationDuration: 800,
        nodeDimensionsIncludeLabels: true,
        nodeRepulsion: () => 50000,        // Moderate repulsion
        idealEdgeLength: () => 80,         // Moderate edge length
        edgeElasticity: () => 100,
        gravity: 0.5,                      // Moderate gravity to keep group cohesive
        numIter: 1000,
        coolingFactor: 0.95,
        minTemp: 1.0,
        randomize: false,
        componentSpacing: 80,              // Enough spacing for labels, but not huge
      },
      wheelSensitivity: 0.3,
      minZoom: 0.1,
      maxZoom: 4,
    });

    cy.on('tap', 'node', evt => {
      const node = evt.target;
      onNodeClick?.(node.data());
    });

    cy.on('tap', evt => {
      if (evt.target === cy) onNodeClick?.(null);
    });

    cyRef.current = cy;
    return () => { if (cyRef.current) { cyRef.current.destroy(); cyRef.current = null; } };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphData, isHeatmapMode]);

  // Update opacity when highlight/selection changes (without full re-render)
  useEffect(() => {
    const cy = cyRef.current;
    if (!cy || !graphData) return;
    const highlightSet = new Set(highlightedNodes || []);
    const hasHighlight = highlightSet.size > 0;

    cy.batch(() => {
      cy.nodes().forEach(n => {
        const id = n.id();
        n.data('nodeOpacity', hasHighlight ? (highlightSet.has(id) ? 1 : 0.12) : 1);
        n.data('isSelected', id === selectedNodeId ? 1 : 0);
      });
      cy.edges().forEach(e => {
        const src = e.data('source'); const tgt = e.data('target');
        e.data('edgeOpacity', hasHighlight ? (highlightSet.has(src) || highlightSet.has(tgt) ? 0.8 : 0.04) : 0.3);
      });
    });
  }, [highlightedNodes, selectedNodeId, graphData]);

  // Expose zoom controls
  const zoomIn  = useCallback(() => cyRef.current?.zoom({ level: cyRef.current.zoom() * 1.3, renderedPosition: { x: containerRef.current.offsetWidth / 2, y: containerRef.current.offsetHeight / 2 } }), []);
  const zoomOut = useCallback(() => cyRef.current?.zoom({ level: cyRef.current.zoom() * 0.75, renderedPosition: { x: containerRef.current.offsetWidth / 2, y: containerRef.current.offsetHeight / 2 } }), []);
  const fitGraph = useCallback(() => cyRef.current?.fit(undefined, 40), []);

  return (
    <>
      <div ref={containerRef} id="cy-container" />
      <div className="graph-controls">
        <button className="graph-ctrl-btn" onClick={zoomIn}  data-tip="Zoom in">+</button>
        <button className="graph-ctrl-btn" onClick={zoomOut} data-tip="Zoom out">−</button>
        <button className="graph-ctrl-btn" onClick={fitGraph} data-tip="Fit to screen" style={{ fontSize: 14 }}>⊞</button>
      </div>
    </>
  );
}
