"use client";
import { useState, useEffect, useRef } from 'react';
import ApiKeyModal from './ApiKeyModal';

const quickPromptsBySection = {
  'introductory-concepts': [
    'Explain the difference between positive and normative economics',
    'How do I draw and label a PPF diagram?',
    'What are the advantages of specialisation?',
    'Compare free market and command economies',
  ],
  'consumer-behaviour-demand': [
    'Explain PED and its determinants',
    'How does YED distinguish normal from inferior goods?',
    'Why might consumers not maximise utility?',
    'How does PED relate to total revenue?',
  ],
  'supply': [
    'What factors shift the supply curve?',
    'Explain the determinants of PES',
    'Distinguish between short run and long run in economics',
    'How do indirect taxes affect supply?',
  ],
  'price-determination': [
    'How is equilibrium price determined?',
    'Explain consumer and producer surplus',
    'What are the functions of the price mechanism?',
    'How do taxes and subsidies affect equilibrium?',
  ],
  'market-failure': [
    'Explain positive and negative externalities with diagrams',
    'Why are public goods under-provided by the market?',
    'What is the difference between merit and demerit goods?',
    'How does information failure lead to market failure?',
  ],
  'government-intervention': [
    'Compare direct and indirect taxes',
    'Evaluate maximum and minimum prices',
    'How do tradeable pollution permits work?',
    'Why might government intervention cause government failure?',
  ],
  'measures-economic-performance': [
    'How is GDP measured using the three approaches?',
    'Distinguish between demand-pull and cost-push inflation',
    'What are the different types of unemployment?',
    'Explain the components of the current account',
  ],
  'aggregate-demand': [
    'What are the components of AD?',
    'Explain the multiplier effect with a numerical example',
    'What causes shifts in the AD curve?',
    'How does a fall in AD affect output and prices?',
  ],
  'aggregate-supply': [
    'Explain the difference between SRAS and LRAS',
    'Compare Classical and Keynesian AS curves',
    'What shifts the SRAS curve?',
    'How does LRAS shift relate to potential output?',
  ],
  'national-income': [
    'Explain the circular flow model',
    'What are injections and withdrawals?',
    'How is equilibrium national income determined?',
    'What happens when injections exceed withdrawals?',
  ],
  'economic-growth': [
    'Distinguish between actual and potential growth',
    'Explain the phases of the business cycle',
    'What are the costs and benefits of economic growth?',
    'How do output gaps relate to the business cycle?',
  ],
  'macroeconomic-objectives-policies': [
    'Compare fiscal and monetary policy',
    'What are supply-side policies and their limitations?',
    'Explain the policy conflict between inflation and unemployment',
    'How would you answer a 20-mark essay on macro policy?',
  ],
};

export default function TutorTab({ section, unit }) {
  const [apiKey, setApiKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load API key from localStorage on mount (client-side only)
  useEffect(() => {
    const saved = localStorage.getItem('anthropic-api-key') || '';
    setApiKey(saved);
  }, []);

  useEffect(() => {
    setMessages([]);
    setInput('');
  }, [section?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = quickPromptsBySection[section?.id] || [
    'Explain the key concepts in this topic',
    'What are the main diagrams I need to know?',
    'Give me an exam-style question with model answer',
    'What are common mistakes students make?',
  ];

  async function sendMessage(text) {
    if (!text.trim()) return;
    if (!apiKey) {
      setShowModal(true);
      return;
    }

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          apiKey,
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          section: section ? { number: section.number, title: section.title } : null,
          unit: unit ? { number: unit.number, title: unit.title, code: unit.code } : null,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `API error: ${response.status}`);
      }

      const assistantMsg = { role: 'assistant', content: data.text };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}. Please check your API key.` }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function saveKey(key) {
    setApiKey(key);
    localStorage.setItem('anthropic-api-key', key);
    setShowModal(false);
  }

  return (
    <div className="tutor-container">
      {showModal && <ApiKeyModal onSave={saveKey} onClose={() => setShowModal(false)} />}

      <div className="tutor-messages">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>&#129302;</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>AI Economics Tutor</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>
              Ask me anything about {section?.title}. I&apos;m focused on Edexcel IAS exam technique.
            </div>
            {!apiKey && (
              <button
                style={{ padding: '8px 20px', borderRadius: 8, background: 'var(--accent-green)', color: 'white', border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
                onClick={() => setShowModal(true)}
              >
                Enter API Key to Start
              </button>
            )}
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`tutor-message ${msg.role === 'user' ? 'user' : 'ai'}`}>
            <div className={`tutor-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? '\uD83D\uDC64' : '\uD83E\uDD16'}
            </div>
            <div className="tutor-bubble">{msg.content}</div>
          </div>
        ))}

        {loading && (
          <div className="tutor-message ai">
            <div className="tutor-avatar ai">&#129302;</div>
            <div className="tutor-bubble">
              <div className="typing-indicator"><span /><span /><span /></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 0 && apiKey && (
        <div className="tutor-quick-prompts">
          {quickPrompts.map((prompt, i) => (
            <button key={i} className="tutor-quick-btn" onClick={() => sendMessage(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="tutor-input-area">
        <textarea
          className="tutor-input"
          rows={1}
          placeholder="Ask a question..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="tutor-send-btn"
          disabled={!input.trim() || loading}
          onClick={() => sendMessage(input)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
