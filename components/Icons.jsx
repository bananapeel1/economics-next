// ═══════════════════════════════════════════════════════════════
// Custom SVG Icons — matching the site's icon set
// Usage: <Icons.BookAlt size={18} /> or <Icons.Star size={16} />
// All icons use currentColor so they inherit text color from CSS
// ═══════════════════════════════════════════════════════════════

const iconDefaults = { size: 18, className: '' };

function wrap(children, { size = 18, className = '', ...props } = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

// 📖 Content — open book
export function BookAlt(props) {
  return wrap(
    <>
      <path d="M2 6s1.5-2 5-2 5.5 2 5.5 2v13s-2-1.5-5.5-1.5S2 19 2 19V6z" />
      <path d="M12.5 6s1.5-2 5-2 5.5 2 5.5 2v13s-2-1.5-5.5-1.5-5 1.5-5 1.5V6z" />
    </>,
    props
  );
}

// 📊 Diagrams — chart histogram with trend line
export function ChartHistogram(props) {
  return wrap(
    <>
      <path d="M3 20h18" />
      <path d="M3 20V4" />
      <rect x="6" y="12" width="2.5" height="8" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="10.5" y="8" width="2.5" height="12" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="15" y="10" width="2.5" height="10" rx="0.5" fill="currentColor" stroke="none" />
      <rect x="19.5" y="6" width="0" height="0" rx="0" fill="none" stroke="none" />
      <polyline points="6 10 10.5 5 15 7 20 3" strokeWidth="2" fill="none" stroke="currentColor" />
    </>,
    props
  );
}

// 🃏 Flashcards — two overlapping cards
export function CardsBlank({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      {...props}
    >
      <path d="M21.85,2.977L12.414,.121c-.768-.225-1.579-.135-2.283,.25-.702,.386-1.213,1.021-1.435,1.782l-.555,1.848H3c-1.654,0-3,1.346-3,3V24H16v-2.045l3.099,1.151L23.88,6.693c.462-1.588-.453-3.257-2.03-3.716Zm-7.85,19.023H2V7c0-.551,.448-1,1-1H13c.552,0,1,.449,1,1v15Zm7.96-15.866l-4.18,14.348-1.78-.662V7c0-1.654-1.346-3-3-3h-2.77l.385-1.28c.075-.256,.245-.467,.479-.596,.235-.129,.505-.158,.751-.086l9.436,2.856c.529,.154,.835,.711,.681,1.24Z" />
    </svg>
  );
}

// ⭐ Extras — star outline
export function Star(props) {
  return wrap(
    <path d="M12 2l2.9 6.26L22 9.27l-5 5.14L18.18 22 12 18.56 5.82 22 7 14.41 2 9.27l7.1-1.01L12 2z" />,
    props
  );
}

// 🎧 Contact — headset
export function Headset(props) {
  return wrap(
    <>
      <path d="M3 18v-6a9 9 0 1 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
      <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
    </>,
    props
  );
}

// 📄 Past Papers — document with lines
export function Document(props) {
  return wrap(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </>,
    props
  );
}

// ♣ Blackjack — card with club
export function CardClub(props) {
  return wrap(
    <>
      <rect x="3" y="1" width="18" height="22" rx="3" />
      <circle cx="12" cy="10" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="9.5" cy="13" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="14.5" cy="13" r="2.2" fill="currentColor" stroke="none" />
      <path d="M12 15v3" strokeWidth="2" />
      <path d="M10 18h4" strokeWidth="1.5" />
    </>,
    props
  );
}

// ✍ Practice — signature / writing pen
export function DrawerAlt(props) {
  return wrap(
    <>
      <path d="M17 3a2.83 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
      <path d="M15 5l4 4" />
    </>,
    props
  );
}

// 📝 Notes — notepad with pencil
export function Notes(props) {
  return wrap(
    <>
      <path d="M4 4h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" />
      <line x1="8" y1="9" x2="16" y2="9" />
      <line x1="8" y1="13" x2="14" y2="13" />
      <line x1="8" y1="17" x2="12" y2="17" />
    </>,
    props
  );
}

// ✏️ Quiz — checklist / test form
export function Quiz({ size = 18, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      className={className}
      {...props}
    >
      <path d="M19,1H5C2.243,1,0,3.243,0,6v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V6c0-2.757-2.243-5-5-5ZM5,3h14c1.654,0,3,1.346,3,3v2H2v-2c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3V10H22v8c0,1.654-1.346,3-3,3ZM3,5.5c0-.828,.672-1.5,1.5-1.5s1.5,.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm4,0c0-.828,.672-1.5,1.5-1.5s1.5,.672,1.5,1.5-.672,1.5-1.5,1.5-1.5-.672-1.5-1.5Zm3.707,10.579c.391,.391,.391,1.023,0,1.414l-1.982,1.982c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.163-1.103c-.401-.379-.418-1.013-.038-1.413,.38-.401,1.013-.418,1.413-.038l1.015,.96,1.838-1.838c.391-.391,1.023-.391,1.414,0Zm8.293,1.921c0,.553-.447,1-1,1h-4c-.553,0-1-.447-1-1s.447-1,1-1h4c.553,0,1,.447,1,1Zm-8.293-6.921c.391,.391,.391,1.023,0,1.414l-1.982,1.982c-.352,.352-.809,.528-1.266,.528-.441,0-.883-.164-1.23-.493l-1.163-1.103c-.401-.379-.418-1.012-.038-1.413,.38-.402,1.013-.418,1.413-.039l1.015,.96,1.838-1.838c.391-.391,1.023-.391,1.414,0Zm8.293,1.921c0,.553-.447,1-1,1h-4c-.553,0-1-.447-1-1s.447-1,1-1h4c.553,0,1,.448,1,1Z" />
    </svg>
  );
}

// ⚠️ Mistakes — warning triangle
export function Mistakes(props) {
  return wrap(
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </>,
    props
  );
}

// 🤖 Tutor — robot / chat
export function Tutor(props) {
  return wrap(
    <>
      <path d="M12 8V4H8" />
      <rect x="4" y="8" width="16" height="12" rx="2" />
      <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none" />
    </>,
    props
  );
}

// 📋 Command Words — clipboard
export function Clipboard(props) {
  return wrap(
    <>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </>,
    props
  );
}

// 📖 Glossary — book open
export function Glossary(props) {
  return wrap(
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15z" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="13" y2="12" />
    </>,
    props
  );
}

// 📕 PDF — document with download arrow
export function PdfFile(props) {
  return wrap(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="12" x2="12" y2="18" />
      <polyline points="9 15 12 18 15 15" />
    </>,
    props
  );
}

// 🔗 NetworkGraph — interconnected nodes
export function NetworkGraph(props) {
  return wrap(
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="18" cy="5" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="18" r="2" />
      <line x1="7" y1="6.5" x2="10" y2="11" />
      <line x1="16.5" y1="5.5" x2="14" y2="11" />
      <line x1="6.5" y1="17.5" x2="10.5" y2="13.5" />
      <line x1="17.5" y1="16.5" x2="13.5" y2="13.5" />
      <line x1="7" y1="19" x2="17" y2="18" />
    </>,
    props
  );
}

// ⚙️ Settings — gear cog
export function Settings(props) {
  return wrap(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>,
    props
  );
}

// 🎮 Gamepad — controller
export function Gamepad(props) {
  return wrap(
    <>
      <rect x="2" y="6" width="20" height="12" rx="3" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="4" y1="12" x2="8" y2="12" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" />
    </>,
    props
  );
}

// ✉️ Mail — envelope
export function Mail(props) {
  return wrap(
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22 4 12 13 2 4" />
    </>,
    props
  );
}

// 📸 Camera — for Instagram
export function Camera(props) {
  return wrap(
    <>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </>,
    props
  );
}

// ☀️ Sun — light mode
export function Sun(props) {
  return wrap(
    <>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </>,
    props
  );
}

// 🌙 Moon — dark mode
export function Moon(props) {
  return wrap(
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
    props
  );
}

// 🚪 LogOut — sign out
export function LogOut(props) {
  return wrap(
    <>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </>,
    props
  );
}

// 🔒 Padlock — locked content
export function Padlock(props) {
  return wrap(
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>,
    props
  );
}

// ✓ Model Answers — document with checkmark
export function ModelAnswer(props) {
  return wrap(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </>,
    props
  );
}

const Icons = {
  BookAlt,
  ChartHistogram,
  CardsBlank,
  Star,
  Headset,
  Document,
  CardClub,
  DrawerAlt,
  Notes,
  Quiz,
  Mistakes,
  Tutor,
  PdfFile,
  Clipboard,
  Glossary,
  Padlock,
  ModelAnswer,
  NetworkGraph,
  Settings,
  Gamepad,
  Mail,
  Camera,
  Sun,
  Moon,
  LogOut,
};

export default Icons;
