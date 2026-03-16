"use client";
import { motion } from 'framer-motion';
import { CATEGORIES } from './topicLinksData';

export default function TopicLinksInfoPanel({
  node,
  edges,
  nodes,
  onClose,
  onJumpToNode,
}) {
  const cat = CATEGORIES[node.category];
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const outgoing = edges.filter(e => e.from === node.id);
  const incoming = edges.filter(e => e.to === node.id);

  return (
    <motion.div
      className="topic-links-info-panel"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="topic-links-info-header">
        <div className="topic-links-info-title-row">
          <span className="topic-links-info-dot" style={{ background: cat.color }} />
          <span className="topic-links-info-name">{node.full}</span>
        </div>
        <button className="topic-links-info-close" onClick={onClose} aria-label="Close panel">
          &times;
        </button>
      </div>

      {/* Connection count */}
      <div className="topic-links-info-count">
        {edges.length} connection{edges.length !== 1 ? 's' : ''}
      </div>

      {/* Connections */}
      <div className="topic-links-info-connections">
        {outgoing.map((edge) => {
          const target = nodeMap[edge.to];
          if (!target) return null;
          const tCat = CATEGORIES[target.category];
          return (
            <div
              key={`${edge.from}-${edge.to}`}
              className="topic-links-info-row"
              onClick={() => onJumpToNode(edge.to)}
            >
              <div className="topic-links-info-row-header">
                <span className="topic-links-info-arrow outgoing">&rarr;</span>
                <span
                  className="topic-links-info-tag"
                  style={{
                    color: tCat.color,
                    background: `${tCat.color}15`,
                    borderColor: `${tCat.color}40`,
                  }}
                >
                  {target.full}
                </span>
              </div>
              <p className="topic-links-info-desc">{edge.desc}</p>
            </div>
          );
        })}

        {incoming.map((edge) => {
          const source = nodeMap[edge.from];
          if (!source) return null;
          const sCat = CATEGORIES[source.category];
          return (
            <div
              key={`${edge.from}-${edge.to}`}
              className="topic-links-info-row"
              onClick={() => onJumpToNode(edge.from)}
            >
              <div className="topic-links-info-row-header">
                <span className="topic-links-info-arrow incoming">&larr;</span>
                <span
                  className="topic-links-info-tag"
                  style={{
                    color: sCat.color,
                    background: `${sCat.color}15`,
                    borderColor: `${sCat.color}40`,
                  }}
                >
                  {source.full}
                </span>
              </div>
              <p className="topic-links-info-desc">{edge.desc}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
