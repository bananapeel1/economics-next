"use client";
import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CATEGORIES } from './topicLinksData';

const NODE_RADIUS = 28;

export default function TopicLinksGraph({
  nodes,
  edges,
  viewBox: vb,
  selectedNodeId,
  hoveredNodeId,
  connectedNodeIds,
  onNodeSelect,
  onNodeHover,
  onClearSelection,
  activeUnit,
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  // Pan & zoom state
  const [view, setView] = useState({ x: 0, y: 0, w: vb.w, h: vb.h });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0, vx: 0, vy: 0 });

  // Reset view when unit changes
  useEffect(() => {
    setView({ x: 0, y: 0, w: vb.w, h: vb.h });
  }, [activeUnit, vb.w, vb.h]);

  // Build node lookup
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  // Zoom handler
  const handleZoom = useCallback((delta) => {
    setView(prev => {
      const factor = delta > 0 ? 1.15 : 0.87;
      const nw = Math.max(200, Math.min(vb.w * 1.5, prev.w * factor));
      const nh = Math.max(150, Math.min(vb.h * 1.5, prev.h * factor));
      const cx = prev.x + prev.w / 2;
      const cy = prev.y + prev.h / 2;
      return { x: cx - nw / 2, y: cy - nh / 2, w: nw, h: nh };
    });
  }, [vb.w, vb.h]);

  // Wheel zoom
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    handleZoom(e.deltaY);
  }, [handleZoom]);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.addEventListener('wheel', handleWheel, { passive: false });
    return () => { if (el) el.removeEventListener('wheel', handleWheel); };
  }, [handleWheel]);

  // Pan handlers
  const handlePointerDown = useCallback((e) => {
    if (e.target.closest('.topic-links-node-group')) return;
    setIsPanning(true);
    panStart.current = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, [view.x, view.y]);

  const handlePointerMove = useCallback((e) => {
    if (!isPanning) return;
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const scaleX = view.w / rect.width;
    const scaleY = view.h / rect.height;
    const dx = (e.clientX - panStart.current.x) * scaleX;
    const dy = (e.clientY - panStart.current.y) * scaleY;
    setView(prev => ({ ...prev, x: panStart.current.vx - dx, y: panStart.current.vy - dy }));
  }, [isPanning, view.w, view.h]);

  const handlePointerUp = useCallback((e) => {
    if (isPanning) {
      setIsPanning(false);
      // Check if it was a click (no significant movement) on empty space
      const dx = Math.abs(e.clientX - panStart.current.x);
      const dy = Math.abs(e.clientY - panStart.current.y);
      if (dx < 5 && dy < 5 && !e.target.closest('.topic-links-node-group')) {
        onClearSelection();
      }
    }
  }, [isPanning, onClearSelection]);

  const resetZoom = useCallback(() => {
    setView({ x: 0, y: 0, w: vb.w, h: vb.h });
  }, [vb.w, vb.h]);

  return (
    <div className="topic-links-graph-container" ref={containerRef}>
      <AnimatePresence mode="wait">
        <motion.svg
          key={activeUnit}
          ref={svgRef}
          className="topic-links-svg"
          viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
          preserveAspectRatio="xMidYMid meet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          style={{ touchAction: 'none', cursor: isPanning ? 'grabbing' : 'grab' }}
        >
          <defs>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          <g>
            {edges.map((edge) => {
              const fromNode = nodeMap[edge.from];
              const toNode = nodeMap[edge.to];
              if (!fromNode || !toNode) return null;

              const isConnected = connectedNodeIds
                ? connectedNodeIds.has(edge.from) && connectedNodeIds.has(edge.to)
                : false;
              const isDimmed = connectedNodeIds && !isConnected;

              // Calculate line endpoints offset to not overlap circles
              const dx = toNode.x - fromNode.x;
              const dy = toNode.y - fromNode.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              const offsetX = (dx / dist) * NODE_RADIUS;
              const offsetY = (dy / dist) * NODE_RADIUS;

              const cat = CATEGORIES[fromNode.category];

              return (
                <line
                  key={`${edge.from}-${edge.to}`}
                  x1={fromNode.x + offsetX}
                  y1={fromNode.y + offsetY}
                  x2={toNode.x - offsetX}
                  y2={toNode.y - offsetY}
                  className={`topic-links-edge ${isConnected ? 'active' : ''} ${isDimmed ? 'dimmed' : ''}`}
                  stroke={isConnected ? cat.color : undefined}
                  strokeWidth={isConnected ? 2.5 : 1.2}
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g>
            {nodes.map((node) => {
              const isSelected = node.id === selectedNodeId;
              const isConnected = connectedNodeIds ? connectedNodeIds.has(node.id) : false;
              const isDimmed = connectedNodeIds && !isConnected;
              const isHovered = node.id === hoveredNodeId;
              const cat = CATEGORIES[node.category];

              const lines = node.label.split('\n');
              const lineHeight = 11;
              const startY = node.y - ((lines.length - 1) * lineHeight) / 2;

              return (
                <g
                  key={node.id}
                  className={`topic-links-node-group ${isSelected ? 'selected' : ''} ${isDimmed ? 'dimmed' : ''} ${isHovered && !isDimmed ? 'hovered' : ''}`}
                  onClick={(e) => { e.stopPropagation(); onNodeSelect(node.id); }}
                  onMouseEnter={() => onNodeHover(node.id)}
                  onMouseLeave={() => onNodeHover(null)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer glow ring for selected */}
                  {isSelected && (
                    <>
                      <circle
                        cx={node.x} cy={node.y} r={NODE_RADIUS + 12}
                        fill="none" stroke={cat.color} strokeWidth={1}
                        opacity={0.2} filter="url(#node-glow)"
                      />
                      <circle
                        cx={node.x} cy={node.y} r={NODE_RADIUS + 6}
                        fill="none" stroke={cat.color} strokeWidth={1.5}
                        opacity={0.35}
                      />
                    </>
                  )}

                  {/* Main circle */}
                  <circle
                    cx={node.x} cy={node.y} r={isSelected ? NODE_RADIUS + 2 : NODE_RADIUS}
                    className="topic-links-node-circle"
                    stroke={cat.color}
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.8}
                    style={isSelected ? { filter: `drop-shadow(0 0 8px ${cat.color})` } : undefined}
                  />

                  {/* Label inside circle */}
                  {lines.map((line, i) => (
                    <text
                      key={i}
                      x={node.x}
                      y={startY + i * lineHeight}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={`topic-links-node-label ${isSelected ? 'selected' : ''}`}
                      style={isSelected ? { fill: cat.color } : undefined}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })}
          </g>
        </motion.svg>
      </AnimatePresence>

      {/* Zoom controls */}
      <div className="topic-links-zoom-controls">
        <button
          className="topic-links-zoom-btn"
          onClick={() => handleZoom(-1)}
          title="Zoom in"
          aria-label="Zoom in"
        >
          +
        </button>
        <button
          className="topic-links-zoom-btn"
          onClick={() => handleZoom(1)}
          title="Zoom out"
          aria-label="Zoom out"
        >
          &minus;
        </button>
        <button
          className="topic-links-zoom-btn topic-links-zoom-reset"
          onClick={resetZoom}
          title="Reset view"
          aria-label="Reset view"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      {/* Hint text when nothing selected */}
      {!selectedNodeId && (
        <div className="topic-links-hint">
          Click any topic to explore its connections
        </div>
      )}
    </div>
  );
}
