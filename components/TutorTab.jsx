"use client";
import { useState, useEffect, useRef, useCallback } from 'react';
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

// Extract text content from a v6 UIMessage (parts-based)
function getMessageText(msg) {
  if (msg.parts) {
    return msg.parts
      .filter(p => p.type === 'text')
      .map(p => p.text)
      .join('');
  }
  // Fallback for any legacy format
  return msg.content || '';
}

// SessionStorage helpers for chat history per section
const STORAGE_PREFIX = 'tutor-chat-';

function saveChatHistory(sectionId, messages) {
  if (!sectionId || !messages.length) return;
  try {
    // Store a simplified version to avoid hitting storage limits
    const simplified = messages.map(msg => ({
      id: msg.id,
      role: msg.role,
      content: getMessageText(msg),
    }));
    sessionStorage.setItem(STORAGE_PREFIX + sectionId, JSON.stringify(simplified));
  } catch {
    // Silently fail if sessionStorage is full
  }
}

function loadChatHistory(sectionId) {
  if (!sectionId) return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_PREFIX + sectionId);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    // Convert back to UIMessage format with parts
    return parsed.map(msg => ({
      id: msg.id,
      role: msg.role,
      parts: [{ type: 'text', text: msg.content }],
    }));
  } catch {
    return null;
  }
}

function clearChatHistory(sectionId) {
  if (!sectionId) return;
  try {
    sessionStorage.removeItem(STORAGE_PREFIX + sectionId);
  } catch {
    // ignore
  }
}

/* What the tutor is allowed to know about the chapter the student is on. The route used to receive
   only the section number and title, so the tutor answered from general knowledge and could
   contradict the notes the student had just read. Packet 9, finding F018. Capped so a long section
   cannot crowd out the conversation. */
/* The API returns JSON errors, and useChat surfaces the raw body as error.message, so hitting the
   daily limit used to show the student a JSON blob. Packet 9, finding F018. */
function friendlyError(error) {
  const raw = (error && error.message) || '';
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.error === 'string') return parsed.error;
  } catch { /* not JSON; fall through */ }
  const m = raw.match(/"error"\s*:\s*"([^"]+)"/);
  if (m) return m[1];
  if (/\b429\b/.test(raw)) return 'Daily limit reached. Please try again tomorrow.';
  if (/\b(401|403)\b/.test(raw)) return 'The AI tutor is a Pro feature. Please sign in with a Pro subscription.';
  return raw && raw.length < 120 && !raw.trim().startsWith('{') ? raw : 'Something went wrong. Please try again.';
}

function sectionBrief(contentData) {
  if (!Array.isArray(contentData) || !contentData.length) return null;
  const chapters = contentData.slice(0, 8).map((block) => {
    const subs = Array.isArray(block?.sections) ? block.sections : [];
    const ideas = subs.map((x) => x && x.keyIdea).filter(Boolean).slice(0, 4);
    const exam = subs.map((x) => x && x.examMatters).filter(Boolean).slice(0, 2);
    return { title: block?.title || '', keyIdeas: ideas, examMatters: exam };
  }).filter((c) => c.title || c.keyIdeas.length);
  return chapters.length ? chapters : null;
}

export default function TutorTab({ section, unit, contentData, pendingPrompt, onPromptConsumed }) {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const prevSectionId = useRef(section?.id);
  const hasRestoredRef = useRef(false);
  const pendingSentRef = useRef(false);

  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
  } = useChat({
    api: '/api/chat',
    body: { section, unit, sectionBrief: sectionBrief(contentData) },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Restore chat history when section changes or on first mount
  useEffect(() => {
    if (section?.id !== prevSectionId.current) {
      // Section changed — try to restore saved history for new section
      prevSectionId.current = section?.id;
      hasRestoredRef.current = false;
    }

    if (!hasRestoredRef.current && section?.id) {
      hasRestoredRef.current = true;
      const saved = loadChatHistory(section.id);
      if (saved) {
        setMessages(saved);
      } else {
        setMessages([]);
      }
      setInput('');
    }
  }, [section?.id, setMessages]);

  // Save chat to sessionStorage whenever messages change (only when not streaming)
  useEffect(() => {
    if (status === 'ready' && messages.length > 0 && section?.id) {
      saveChatHistory(section.id, messages);
    }
  }, [messages, status, section?.id]);

  // Auto-send pending prompt from Quiz/Practice tabs
  useEffect(() => {
    if (!pendingPrompt) {
      pendingSentRef.current = false;
      return;
    }
    if (status === 'ready' && !pendingSentRef.current) {
      pendingSentRef.current = true;
      sendMessage({ text: pendingPrompt });
      onPromptConsumed?.();
    }
  }, [pendingPrompt, status]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Subject comes from the unit code, the same way the API route decides it, so the tab and the
  // tutor never disagree about which qualification the student is sitting.
  const isBusiness = String(unit?.code || '').toUpperCase().startsWith('WBS');
  const subjectName = isBusiness ? 'Business' : 'Economics';

  const quickPrompts = quickPromptsBySection[section?.id] || (isBusiness ? [
    'Explain the key concepts in this topic',
    'How should I structure a 20-mark Evaluate answer?',
    'Give me an exam-style question with a model answer',
    'What are common mistakes students make here?',
  ] : [
    'Explain the key concepts in this topic',
    'What are the main diagrams I need to know?',
    'Give me an exam-style question with a model answer',
    'What are common mistakes students make here?',
  ]);

  function handleSend(text) {
    const trimmed = (text || '').trim();
    if (!trimmed || isLoading) return;
    setInput('');
    sendMessage({ text: trimmed });
  }

  function handleClearChat() {
    setMessages([]);
    clearChatHistory(section?.id);
    setInput('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
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
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 6 }}>AI {subjectName} Tutor</div>
            <div style={{ fontSize: 13, marginBottom: 20 }}>
              Ask me anything about {section?.title}. I&apos;m focused on Edexcel IAL {subjectName} exam technique.
            </div>
          </div>
        )}

        {messages.map((msg) => {
          const text = getMessageText(msg);
          return (
            <div key={msg.id} className={`tutor-message ${msg.role === 'user' ? 'user' : 'ai'}`}>
              <div className={`tutor-avatar ${msg.role === 'user' ? 'user' : 'ai'}`}>
                {msg.role === 'user' ? '\uD83D\uDC64' : '\uD83E\uDD16'}
              </div>
              <div className="tutor-bubble">
                {msg.role === 'assistant' ? formatContent(text) : text}
              </div>
            </div>
          );
        })}

        {status === 'submitted' && (
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
              {friendlyError(error)}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {messages.length === 0 && (
        <div className="tutor-quick-prompts">
          {quickPrompts.map((prompt, i) => (
            <button key={i} className="tutor-quick-btn" onClick={() => handleSend(prompt)}>
              {prompt}
            </button>
          ))}
        </div>
      )}

      <div className="tutor-input-area">
        {messages.length > 0 && (
          <button
            className="tutor-clear-btn"
            onClick={handleClearChat}
            title="Clear chat"
            disabled={isLoading}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
          </button>
        )}
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
          disabled={!input.trim() || isLoading}
          onClick={() => handleSend(input)}
        >
          Send
        </button>
      </div>
    </div>
  );
}
