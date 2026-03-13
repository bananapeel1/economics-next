"use client";

export default function SubjectSelect({ onSelect }) {
  return (
    <div className="fun-subject-select">
      <h2 className="fun-subject-heading">Choose Your Subject</h2>
      <p className="fun-subject-subtext">Beat the dealer, answer questions, level up.</p>
      <div className="fun-subject-cards">
        <button className="fun-subject-card" onClick={() => onSelect('economics')}>
          <span className="fun-subject-icon">&#128200;</span>
          <span className="fun-subject-name">Economics</span>
          <span className="fun-subject-desc">Units 1 &amp; 2 — AS Level</span>
        </button>
        <button className="fun-subject-card" onClick={() => onSelect('business')}>
          <span className="fun-subject-icon">&#128188;</span>
          <span className="fun-subject-name">Business</span>
          <span className="fun-subject-desc">Units 1 &amp; 2 — AS Level</span>
        </button>
      </div>
    </div>
  );
}
