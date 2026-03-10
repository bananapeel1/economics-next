"use client";
import { useState } from 'react';

export default function ApiKeyModal({ onSave, onClose }) {
  const [key, setKey] = useState('');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-title">Enter Your Anthropic API Key</div>
        <div className="modal-desc">
          The AI Tutor uses the Anthropic API. Your key is stored locally in your browser and never sent anywhere except to the Anthropic API.
        </div>
        <input
          className="modal-input"
          type="password"
          placeholder="sk-ant-..."
          value={key}
          onChange={e => setKey(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && key.trim() && onSave(key.trim())}
        />
        <button
          className="modal-btn"
          disabled={!key.trim()}
          onClick={() => onSave(key.trim())}
        >
          Save &amp; Start
        </button>
      </div>
    </div>
  );
}
