"use client";
import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import TopicLinksGraph from './TopicLinksGraph';
import TopicLinksInfoPanel from './TopicLinksInfoPanel';
import { UNITS, CATEGORIES } from './topicLinksData';
import './topic-links.css';

export default function TopicLinksPage() {
  const [activeUnit, setActiveUnit] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  const unitData = UNITS[activeUnit];

  const handleUnitChange = useCallback((unit) => {
    setActiveUnit(unit);
    setSelectedNodeId(null);
    setHoveredNodeId(null);
  }, []);

  const handleNodeSelect = useCallback((nodeId) => {
    setSelectedNodeId(prev => prev === nodeId ? null : nodeId);
  }, []);

  const handleNodeHover = useCallback((nodeId) => {
    setHoveredNodeId(nodeId);
  }, []);

  const handleClearSelection = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  const handleJumpToNode = useCallback((nodeId) => {
    setSelectedNodeId(nodeId);
  }, []);

  // Compute connected node IDs for the selected node
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return null;
    const connected = new Set();
    unitData.edges.forEach(e => {
      if (e.from === selectedNodeId || e.to === selectedNodeId) {
        connected.add(e.from);
        connected.add(e.to);
      }
    });
    return connected;
  }, [selectedNodeId, unitData.edges]);

  const selectedNode = selectedNodeId
    ? unitData.nodes.find(n => n.id === selectedNodeId)
    : null;

  const selectedEdges = useMemo(() => {
    if (!selectedNodeId) return [];
    return unitData.edges.filter(e => e.from === selectedNodeId || e.to === selectedNodeId);
  }, [selectedNodeId, unitData.edges]);

  // Get active categories for legend
  const activeCategories = useMemo(() => {
    const cats = new Set(unitData.nodes.map(n => n.category));
    return [...cats];
  }, [unitData.nodes]);

  return (
    <div className="topic-links-container">
      {/* Unit Toggle */}
      <div className="resource-subject-toggle" style={{ maxWidth: 1100 }}>
        <button
          className={`resource-subject-btn ${activeUnit === 1 ? 'active' : ''}`}
          onClick={() => handleUnitChange(1)}
        >
          Unit 1: Microeconomics
        </button>
        <button
          className={`resource-subject-btn ${activeUnit === 2 ? 'active' : ''}`}
          onClick={() => handleUnitChange(2)}
        >
          Unit 2: Macroeconomics
        </button>
      </div>

      {/* Legend */}
      <div className="topic-links-legend">
        {activeCategories.map(key => {
          const cat = CATEGORIES[key];
          if (!cat) return null;
          return (
            <div key={key} className="topic-links-legend-item">
              <span className="topic-links-legend-dot" style={{ background: cat.color }} />
              <span className="topic-links-legend-label">{cat.label}</span>
            </div>
          );
        })}
      </div>

      {/* Graph + Info Panel */}
      <div className={`topic-links-main ${selectedNode ? 'has-panel' : ''}`}>
        <TopicLinksGraph
          nodes={unitData.nodes}
          edges={unitData.edges}
          viewBox={unitData.viewBox}
          selectedNodeId={selectedNodeId}
          hoveredNodeId={hoveredNodeId}
          connectedNodeIds={connectedNodeIds}
          onNodeSelect={handleNodeSelect}
          onNodeHover={handleNodeHover}
          onClearSelection={handleClearSelection}
          activeUnit={activeUnit}
        />

        <AnimatePresence mode="wait">
          {selectedNode && (
            <TopicLinksInfoPanel
              key={selectedNodeId}
              node={selectedNode}
              edges={selectedEdges}
              nodes={unitData.nodes}
              onClose={handleClearSelection}
              onJumpToNode={handleJumpToNode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
