"use client";
import { useEffect, useRef } from 'react';
import { useChat } from '@ai-sdk/react';

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
  const messagesEndRef = useRef(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    setMessages,
    append,
  } = useChat({
    api: '/api/chat',
    body: { section, unit },
  });

  // Reset chat when section changes
  useEffect(() => {
    setMessages([]);
  }, [section?.id, setMessages]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const quickPrompts = quickPromptsBySection[section?.id] || [
    'Explain the key concepts in this topic',
    'What are the main diagrams I need to know?',
    'Give me an exam-style question with model answer',
    'What are common mistakes students make?',
  ];

  function handleQuickPrompt(text) {
    append({ role: 'user', content: text });
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }

  // Format assistant messages with bold text support
  function formatContent(text) {
    if (!text) return null;
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  }

  return (
    <div className="tutor-container">
      <div className="tutor-messages">
        {messages.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>&#129302;</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>AI Economics Tutor</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>
              Ask me anything about {section?.title}. I&apos;m focused on Edexcel IAS exam technique.
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`tutor-message ${msg.role === 'user' ? 'user' : 'ai'}`}>
            <div className={`tutor-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? '\uD83D\uDC64' : '\uD83E\uDD16'}
            </div>
            <div className="tutor-bubble">
              {msg.role === 'assistant' ? formatContent(msg.content) : msg.content}
            </div>
          </div>
        ))}

        {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
          <div className="tutor-message ai">
            <div className="tutor-avatar ai">&#129302;</div>
            <div className="tutor-bubble">
              <div className="typing-indicator"><span /><span /><span /></div>
            </div>
          </div>
        )}

        {error && (
          <div className="tutor-message ai">
            <div className="tutor-avatar ai">&#129302;</div>
            <div className="tutor-bubble" style={{ color: 'var(--accent-red, #ef4444)' }}>
              {error.message || 'Something went wrong. Please try again.'}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 0 && (
        <div className="tutor-quick-prompts">
          {quickPrompts.map((prompt, i) => (
            <button key={i} className="tutor-quick-btn" onClick={() => handleQuickPrompt(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form className="tutor-input-area" onSubmit={handleSubmit}>
        <textarea
          className="tutor-input"
          rows={1}
          placeholder="Ask a question..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          type="submit"
          className="tutor-send-btn"
          disabled={!input.trim() || isLoading}
        >
          Send
        </button>
      </form>
    </div>
  );
}
