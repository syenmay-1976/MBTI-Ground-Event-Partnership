import React, { useState, useMemo } from "react";

/* ---------------------------------- brand --------------------------------- */
const CD = {
  navy: "#001871", space: "#01091C", yellow: "#FFE000",
  bright: "#0064DC", celcom: "#009BDF", ice: "#7ED3F1", white: "#FFFFFF",
};

/* -------------------------------------------------------------------------- *
 * 20 QUESTIONS — each anchored to a line in the Sales Ground Events &
 * Partnership Specialist job description.
 * -------------------------------------------------------------------------- */
const QUESTIONS = [
  // ---- E / I : stakeholder management, briefings, collaboration, stamina ----
  { axis: "EI", jd: "Prepare and conduct operational briefings with internal teams, promoters, agencies and vendors",
    q: "7am on setup day. Forty promoters, three vendors and the mall ops team are waiting for the briefing.",
    a: "You run it yourself. Standing in front of that room is the best part of the day.", b: "You'd rather build a tight briefing pack and let someone else deliver it.", poleA: "E", poleB: "I" },
  { axis: "EI", jd: "Strong in stakeholder management, communication and coordination across multiple parties",
    q: "A regional stakeholder is quietly unhappy with the roadshow plan.",
    a: "Call him. It gets sorted faster in a conversation.", b: "Send a clear written note laying out the plan, then follow up.", poleA: "E", poleB: "I" },
  { axis: "EI", jd: "Flexible and committed to support events during weekends, public holidays and extended hours",
    q: "Three weekends of roadshows, back to back. By Sunday night of week three:",
    a: "Still running. The crowd gives you more than it takes.", b: "Flat. You need silence and a day away from the floor.", poleA: "E", poleB: "I" },
  { axis: "EI", jd: "Passionate about events, customer engagement and delivering execution excellence",
    q: "On event day, you're most useful:",
    a: "Out front — with customers, dealers and the crowd.", b: "Behind the scenes — watching the flow, catching what's about to break.", poleA: "E", poleB: "I" },
  { axis: "EI", jd: "Proactive and solution-oriented, with the ability to drive resolutions effectively",
    q: "You've hit a problem you can't solve on your own.",
    a: "Get people in a room and thrash it out.", b: "Work it through yourself first, then bring a proposal.", poleA: "E", poleB: "I" },

  // ---- S / N : detail, CI compliance, reporting accuracy, ops readiness ----
  { axis: "SN", jd: "Ensure all branding and executions comply with Corporate Identity standards",
    q: "The EO sends booth artwork for approval.",
    a: "You check logo clear space, colour codes and CI rules line by line.", b: "You look at whether the whole thing feels like CelcomDigi.", poleA: "S", poleB: "N" },
  { axis: "SN", jd: "Develop post-event analysis and reports to evaluate effectiveness and business impact",
    q: "Writing the post-mortem, you're strongest at:",
    a: "Getting every number right — GA, footfall, cost per acquisition.", b: "Explaining the pattern behind why some events worked and others didn't.", poleA: "S", poleB: "N" },
  { axis: "SN", jd: "Proactively recommend new ideas, activation concepts and engagement mechanics",
    q: "You're asked for a fresh activation concept for next quarter.",
    a: "Start from what worked last year and make it sharper.", b: "Start from a blank page and a new idea.", poleA: "S", poleB: "N" },
  { axis: "SN", jd: "Manage event setup assets, inventory, logistics and operational readiness",
    q: "Two days before setup, where's your head?",
    a: "POSM counted, truck confirmed, power supply checked.", b: "How the customer will move through the space and what they'll feel.", poleA: "S", poleB: "N" },
  { axis: "SN", jd: "Ensure proper documentation, reporting accuracy and compliance with financial processes",
    q: "Reconciling the event budget, invoice by invoice.",
    a: "Every line matched. It's oddly satisfying.", b: "Necessary — but you'd rather be planning the next one.", poleA: "S", poleB: "N" },

  // ---- T / F : accountability, escalation, pressure, collaboration ----
  { axis: "TF", jd: "Escalate operational risks and issues together with mitigation plans in a timely manner",
    q: "A vendor has under-delivered twice. The next event is at risk.",
    a: "Escalate with the facts and a replacement plan attached.", b: "Sit with them first. Understand what's breaking before you escalate.", poleA: "T", poleB: "F" },
  { axis: "TF", jd: "Ensure deliverables are completed within agreed timelines, budget and quality standards",
    q: "You have to cut RM40K from the activation budget.",
    a: "Cut whatever returns least, regardless of whose element it is.", b: "Work it through with the owners so nobody gets blindsided.", poleA: "T", poleB: "F" },
  { axis: "TF", jd: "Collaborate and align closely with regional teams on sales roadshows and ground activation plans",
    q: "Two regions want the same flagship roadshow weekend.",
    a: "It goes to the region with the stronger sales case.", b: "Broker something both can live with — you need them both next quarter.", poleA: "T", poleB: "F" },
  { axis: "TF", jd: "Able to remain calm, resourceful and execution-focused under pressure",
    q: "An hour before doors open, a promoter is in tears and the stage isn't ready.",
    a: "Stage first. You'll deal with the promoter once the show is safe.", b: "Two minutes with her first. She still has to face that crowd.", poleA: "T", poleB: "F" },
  { axis: "TF", jd: "Highly accountable with a strong ownership mindset",
    q: "An event underperformed, and it was partly your call.",
    a: "Say so plainly in the report, with the fix.", b: "Say so — but carefully, so the team doesn't lose confidence.", poleA: "T", poleB: "F" },

  // ---- J / P : project management, timelines, multitasking, pressure ----
  { axis: "JP", jd: "Ability to independently manage projects from planning through to execution",
    q: "Six weeks out from a nationwide activation.",
    a: "Full timeline exists. Owners named. Dates locked.", b: "The big rocks are locked. The detail will firm up as you go.", poleA: "J", poleB: "P" },
  { axis: "JP", jd: "Able to remain calm and resourceful under pressure",
    q: "The venue moves your load-in time with 24 hours' notice.",
    a: "Open the contingency plan you already wrote.", b: "Rebuild it on the spot. You're sharper under pressure anyway.", poleA: "J", poleB: "P" },
  { axis: "JP", jd: "Comfortable in a fast-paced environment with strong multitasking and prioritisation skills",
    q: "Nine events running across five regions this month.",
    a: "One master tracker, reviewed daily. Nothing moves without it.", b: "You hold it in your head and go where the fire is.", poleA: "J", poleB: "P" },
  { axis: "JP", jd: "Detail-oriented with strong follow-through on timelines and deliverables",
    q: "The agency asks for three more days on the POSM artwork.",
    a: "No. The timeline was agreed and print won't wait.", b: "Fine — if you can compress elsewhere. Better artwork is worth it.", poleA: "J", poleB: "P" },
  { axis: "JP", jd: "Monitor project progress proactively",
    q: "You feel most in control when:",
    a: "Every deliverable is ticked and dated.", b: "You know you can handle whatever walks through the door.", poleA: "J", poleB: "P" },
];

/* -------------------------------------------------------------------------- *
 * FIT MODEL — derived from the JD's own emphasis.
 * The JD mentions timelines / deliverables / documentation / reporting /
 * budget compliance far more than it mentions creative concepting.
 * -------------------------------------------------------------------------- */
const IDEAL = { E: 80, S: 65, T: 55, J: 70 };
const WEIGHT = { E: 0.28, S: 0.24, T: 0.18, J: 0.30 };

/* --------------------------- full 16-type library -------------------------- */
const TYPES = {
  ESTJ: { fit: 86, name: "The Executive", nick: "The Operator", core: "Organised, decisive, fact-driven, rule-respecting. Runs on structure and gets things finished.",
    super: "Owns a nationwide activation end to end and lands it on time, on budget, on brand.", risk: "Rigid when the plan has to change. Can steamroll softer stakeholders.", lane: "Ground Execution — lead" },
  ESFJ: { fit: 83, name: "The Consul", nick: "The Host", core: "Warm, dutiful, highly organised, people-first. Remembers everyone and follows through.",
    super: "Holds HQ, regions, agencies and vendors together — the coordination the JD asks for, done naturally.", risk: "Avoids the hard vendor conversation. Takes criticism of the event personally.", lane: "Ground Execution / Stakeholder management" },
  ENTJ: { fit: 74, name: "The Commander", nick: "The Strategist", core: "Bold, strategic, commercially ruthless, natural leader. Builds the plan and defends it.",
    super: "Wins the partnership, defends the budget in front of management, prioritises a crowded calendar.", risk: "Impatient with detail and with people slower than them. May under-invest in documentation.", lane: "Partnership & Sponsorship" },
  ENFJ: { fit: 71, name: "The Protagonist", nick: "The Alliance Builder", core: "Charismatic, persuasive, reads a room instantly, genuinely invested in people.",
    super: "Makes device partners and sponsors want to say yes. Excellent at briefings and regional alignment.", risk: "Over-promises to keep everyone happy. Conflict-averse when a vendor needs cutting.", lane: "Partnership & Sponsorship" },
  ESTP: { fit: 67, name: "The Entrepreneur", nick: "The Floor Closer", core: "Bold, pragmatic, thrives in chaos, learns by doing. Bored by paperwork.",
    super: "Event day. Nobody handles a live crisis better — venue changes, artist cancels, crowd surges.", risk: "The reports, reconciliation and documentation the JD demands will be late or thin.", lane: "Ground Execution — floor" },
  ESFP: { fit: 64, name: "The Entertainer", nick: "The Crowd Igniter", core: "Spontaneous, energetic, people-magnet, lives in the moment.",
    super: "Turns a dead booth into a queue. Promoters and crowds respond to them instantly.", risk: "Timelines, budgets and compliance are a real weakness. Needs a planner behind them.", lane: "Ground Execution — floor" },
  ISTJ: { fit: 63, name: "The Logistician", nick: "The Backbone", core: "Practical, meticulous, reliable, procedure-driven. Says what they'll do and does it.",
    super: "The timeline, the POSM count, the budget reconciliation, the CI compliance check. Never ships broken.", risk: "The JD wants someone in front of forty promoters and six stakeholder groups. That drains them.", lane: "Planning, Reporting & Ops" },
  ISFJ: { fit: 60, name: "The Defender", nick: "The Guardian", core: "Quietly dedicated, detail-perfect, protective of the team, dislikes conflict and change.",
    super: "The systems and documentation everyone else relies on. Nothing gets forgotten.", risk: "Won't push back on an unreasonable stakeholder. Struggles with the pace and visibility.", lane: "Planning, Reporting & Ops" },
  ENTP: { fit: 55, name: "The Debater", nick: "The Concept Machine", core: "Inventive, argumentative, quick, allergic to routine. Ten ideas an hour.",
    super: "The activation concept that wins the sponsor. Sharp in a negotiation.", risk: "Starts everything, finishes little. The JD's follow-through and reporting demands are their weak spot.", lane: "Trade Marketing & Creative" },
  ENFP: { fit: 52, name: "The Campaigner", nick: "The Spark", core: "Enthusiastic, creative, relationship-driven, easily bored by admin.",
    super: "Energy, ideas and partner relationships in one person. Great at concepting and at the launch.", risk: "Timelines slip. Detail is genuinely painful. Cannot be left alone with a budget file.", lane: "Trade Marketing & Creative" },
  INTJ: { fit: 52, name: "The Architect", nick: "The Planner", core: "Strategic, independent, sceptical, long-horizon. Builds systems, hates inefficiency.",
    super: "Designs the annual event portfolio and the business case behind it. Sees the flaw before it costs money.", risk: "Ground events are relentlessly social and reactive. That's their least comfortable terrain.", lane: "Portfolio Strategy & Planning" },
  INFJ: { fit: 49, name: "The Advocate", nick: "The Compass", core: "Insightful, principled, quietly determined, reads people deeply.",
    super: "Brand storytelling and the why behind an event. Excellent one-to-one with partners.", risk: "Burns out fast in a weekend-and-public-holiday execution role. Overloads on stakeholder noise.", lane: "Brand & Concept" },
  ISTP: { fit: 44, name: "The Virtuoso", nick: "The Fixer", core: "Practical, calm, hands-on, minimal words. Solves what's in front of them.",
    super: "Setup, rigging, technical ops, logistics. Unflappable when something physically breaks.", risk: "Stakeholder management, briefings and reporting — three JD pillars — are all uphill.", lane: "Technical Ops & Logistics" },
  ISFP: { fit: 41, name: "The Adventurer", nick: "The Craftsman", core: "Aesthetic, gentle, present-focused, avoids conflict and structure.",
    super: "Makes the space feel like something. Strong eye for VM and booth experience.", risk: "Deadlines, escalation and multi-stakeholder pressure are a poor match for their wiring.", lane: "Visual Merchandising & Creative" },
  INTP: { fit: 33, name: "The Logician", nick: "The Analyst", core: "Analytical, abstract, precise with logic, indifferent to process and people-politics.",
    super: "Post-event analysis. Will find the flaw in the ROI case that nobody else saw.", risk: "Almost everything else in this JD — the crowds, the weekends, the coordination, the ownership.", lane: "Analytics & Post-Mortem" },
  INFP: { fit: 30, name: "The Mediator", nick: "The Storyteller", core: "Idealistic, private, values-driven, resistant to rigid structure.",
    super: "Meaning, message and the human story of a campaign.", risk: "This JD is fast, loud, deadline-bound and confrontational. It would cost them a great deal.", lane: "Not an events-facing seat" },
};

const LANES = {
  exec: { name: "Ground Execution", tag: "the floor", desc: "Roadshows, mall activations, nationwide events. Live crowd, live problems, live sales." },
  partner: { name: "Partnership & Sponsorship", tag: "the deal", desc: "Device partners, sponsors, co-investment. Turning relationships into commercial value." },
  creative: { name: "Trade Marketing & Creative", tag: "the idea", desc: "Concepts, briefs, POSM, engagement mechanics — the reason the booth is worth walking into." },
  ops: { name: "Planning, Reporting & Ops", tag: "the engine", desc: "Timelines, budgets, documentation, post-mortems. The governance that keeps 40 events standing." },
};

/* --------------------------------- scoring -------------------------------- */
function score(answers) {
  const raw = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
  QUESTIONS.forEach((q, i) => {
    const pick = answers[i];
    if (!pick) return;
    raw[pick === "a" ? q.poleA : q.poleB] += 1;
  });
  const pct = { E: (raw.E / 5) * 100, S: (raw.S / 5) * 100, T: (raw.T / 5) * 100, J: (raw.J / 5) * 100 };
  const type =
    (pct.E >= 50 ? "E" : "I") + (pct.S >= 50 ? "S" : "N") +
    (pct.T >= 50 ? "T" : "F") + (pct.J >= 50 ? "J" : "P");

  const penalty = Object.keys(IDEAL).reduce((s, k) => s + WEIGHT[k] * Math.abs(pct[k] - IDEAL[k]), 0);
  const fit = Math.max(5, Math.min(100, Math.round(100 - 1.6 * penalty)));

  // Six competencies, taken straight from the JD's "You are" list
  const F = 100 - pct.T, N = 100 - pct.S, P = 100 - pct.J;
  const c = {
    ownership: Math.round(pct.J * 0.5 + pct.T * 0.5),
    execution: Math.round(pct.S * 0.5 + pct.J * 0.5),
    stakeholder: Math.round(pct.E * 0.5 + F * 0.5),
    pressure: Math.round(pct.T * 0.6 + P * 0.4),
    ideas: Math.round(N),
    stamina: Math.round(pct.E),
  };

  const laneScores = {
    exec: 0.35 * c.stamina + 0.35 * c.execution + 0.30 * c.pressure,
    partner: 0.40 * c.stakeholder + 0.35 * pct.T + 0.25 * c.stamina,
    creative: 0.55 * c.ideas + 0.25 * c.stakeholder + 0.20 * P,
    ops: 0.55 * c.execution + 0.45 * c.ownership,
  };
  const lane = Object.keys(laneScores).sort((a, b) => laneScores[b] - laneScores[a])[0];
  return { pct, type, fit, c, lane, laneScores };
}

function band(fit) {
  if (fit >= 80) return { label: "Strong fit — hire with confidence", color: CD.yellow, note: "This profile matches what the JD actually asks for: outward-facing, organised, accountable, follow-through." };
  if (fit >= 65) return { label: "Good fit — with one gap to manage", color: CD.ice, note: "Core wiring is right for the role. There's one dimension that will need a support structure around it." };
  if (fit >= 50) return { label: "Conditional fit — right lane only", color: CD.celcom, note: "Real strengths here, but not across the whole JD. Works in a specialised seat, not as an all-rounder." };
  return { label: "Weak fit for this JD", color: "#F9B073", note: "The weekends, the crowds, the coordination load and the documentation would all run against the grain. Adjacent roles would use these strengths better." };
}

function insights(pct, c) {
  const s = [], w = [];
  if (pct.E >= 80) s.push("Built for the stakeholder load — briefings, regions, agencies, vendors. The JD asks for this and you have it.");
  if (pct.E <= 40) w.push("The JD demands constant coordination across six stakeholder groups, plus weekends. This will drain you faster than it drains others.");
  if (pct.J >= 80) s.push("Timeline discipline. Deliverables land on the agreed date — the single most repeated demand in this JD.");
  if (pct.J <= 40) w.push("Documentation, reporting accuracy and financial compliance are explicit JD requirements. This is your weak flank — build a system, not willpower.");
  if (pct.S >= 80) s.push("Operationally precise. CI compliance, POSM counts, budget reconciliation — you'll catch what others miss.");
  if (pct.S <= 40) s.push("Strong conceptually. The JD's 'recommend new activation concepts and engagement mechanics' is where you'll add the most value.");
  if (pct.S <= 40) w.push("Detail is a stated JD requirement, not a nice-to-have. Don't assume someone else has the numbers.");
  if (pct.T >= 80) s.push("Accountable and clear-headed. You'll escalate with a mitigation plan attached, not just a problem.");
  if (pct.T >= 80) w.push("The JD wants a 'strong team player' across HQ, regions, agencies and partners. Slow down before you make the efficient call.");
  if (pct.T <= 40) s.push("Partners, dealers and promoters trust you — which is how the difficult things actually get done on the ground.");
  if (pct.T <= 20) w.push("You will avoid the hard vendor conversation. The JD requires you to escalate under-performance. Kindness without consequence gets expensive.");
  if (c.stamina >= 60 && c.execution >= 60) s.push("Rare combination: you can work a crowd and still hit the timeline. That's the whole job.");
  if (c.stamina <= 40 && c.execution <= 40) w.push("Neither the floor nor the plan is your natural home. Worth an honest conversation about whether this is the right seat.");
  if (!s.length) s.push("Balanced across all four axes — adaptable, useful anywhere in the portfolio, hard to pin to one lane.");
  if (!w.length) w.push("No structural weakness. Your risk is being spread across too many events at once.");
  return { s: s.slice(0, 4), w: w.slice(0, 3) };
}

/* -------------------------------- components ------------------------------- */
function Gauge({ value, color }) {
  const r = 58, circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 140 140" className="w-36 h-36 flex-shrink-0">
      <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="10" />
      <circle cx="70" cy="70" r={r} fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={circ - (circ * value) / 100}
        transform="rotate(-90 70 70)" style={{ transition: "stroke-dashoffset 1.1s cubic-bezier(.2,.8,.2,1)" }} />
      <text x="70" y="68" textAnchor="middle" fill={CD.white} style={{ fontFamily: "Montserrat,sans-serif", fontWeight: 600, fontSize: 30 }}>{value}</text>
      <text x="70" y="88" textAnchor="middle" fill="rgba(255,255,255,0.55)" style={{ fontFamily: "Lato,sans-serif", fontSize: 10, letterSpacing: 1 }}>JD FIT</text>
    </svg>
  );
}

function Radar({ c }) {
  const axes = [["Ownership", c.ownership], ["Execution", c.execution], ["Stakeholders", c.stakeholder],
    ["Pressure", c.pressure], ["Ideas", c.ideas], ["Stamina", c.stamina]];
  const cx = 130, cy = 120, R = 76;
  const pt = (i, v) => {
    const a = (Math.PI * 2 * i) / axes.length - Math.PI / 2, rr = (v / 100) * R;
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  };
  return (
    <svg viewBox="0 0 260 240" className="w-full" style={{ maxWidth: 300 }}>
      {[25, 50, 75, 100].map((g) => (
        <polygon key={g} points={axes.map((_, i) => pt(i, g).join(",")).join(" ")} fill="none" stroke="rgba(255,255,255,0.1)" />
      ))}
      {axes.map((_, i) => { const [x, y] = pt(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.1)" />; })}
      <polygon points={axes.map((a, i) => pt(i, a[1]).join(",")).join(" ")} fill="rgba(255,224,0,0.22)" stroke={CD.yellow} strokeWidth="2" />
      {axes.map((a, i) => { const [x, y] = pt(i, 100);
        return <text key={a[0]} x={cx + (x - cx) * 1.22} y={cy + (y - cy) * 1.22 + 3} textAnchor="middle"
          fill="rgba(255,255,255,0.6)" style={{ fontFamily: "Lato,sans-serif", fontSize: 9.5 }}>{a[0]}</text>; })}
    </svg>
  );
}

function AxisBar({ left, right, value }) {
  const leftWins = value >= 50;
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1" style={{ fontFamily: "Lato,sans-serif", fontSize: 12 }}>
        <span style={{ color: leftWins ? CD.yellow : "rgba(255,255,255,0.45)", fontWeight: leftWins ? 700 : 400 }}>{left}</span>
        <span style={{ color: !leftWins ? CD.yellow : "rgba(255,255,255,0.45)", fontWeight: !leftWins ? 700 : 400 }}>{right}</span>
      </div>
      <div className="h-2 rounded-full relative overflow-hidden" style={{ background: "rgba(255,255,255,0.12)" }}>
        <div className="h-full absolute top-0 rounded-full" style={{
          background: CD.yellow, width: `${Math.max(value, 100 - value)}%`,
          left: leftWins ? 0 : "auto", right: leftWins ? "auto" : 0, transition: "width .9s ease" }} />
      </div>
      <div className="text-right mt-1" style={{ fontFamily: "Lato,sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>
        {Math.round(Math.max(value, 100 - value))}%
      </div>
    </div>
  );
}

/* ----------------------------------- app ---------------------------------- */
export default function JDFitTest() {
  const [stage, setStage] = useState("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showJD, setShowJD] = useState(false);

  const result = useMemo(() => (stage === "result" ? score(answers) : null), [stage, answers]);
  const done = Object.keys(answers).length;
  const q = QUESTIONS[idx];
  const pillar = { EI: "Energy & stakeholder load", SN: "Detail vs concept", TF: "Accountability vs harmony", JP: "Plan vs improvise" };

  const pick = (k) => {
    setAnswers({ ...answers, [idx]: k });
    if (idx === QUESTIONS.length - 1) setStage("result");
    else setTimeout(() => setIdx(idx + 1), 120);
  };
  const reset = () => { setAnswers({}); setIdx(0); setStage("intro"); };

  const tiers = [
    { label: "Strong fit", color: CD.yellow, types: ["ESTJ", "ESFJ"] },
    { label: "Good fit", color: CD.ice, types: ["ENTJ", "ENFJ", "ESTP", "ESFP"] },
    { label: "Conditional — right lane only", color: CD.celcom, types: ["ISTJ", "ISFJ", "ENTP", "ENFP", "INTJ"] },
    { label: "Weak fit for this JD", color: "#F9B073", types: ["INFJ", "ISTP", "ISFP", "INTP", "INFP"] },
  ];

  return (
    <div className="min-h-screen w-full" style={{ background: `linear-gradient(160deg, ${CD.navy} 0%, ${CD.space} 100%)`, color: CD.white }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;600&family=Lato:wght@400;700&display=swap');
        .h { font-family:'Montserrat',Arial,sans-serif } .b { font-family:'Lato',Arial,sans-serif }
        .opt { transition: transform .15s ease, border-color .15s ease, background .15s ease }
        .opt:hover { transform: translateY(-2px); border-color:${CD.yellow}; background:rgba(255,224,0,.06) }
        .opt:focus-visible { outline:2px solid ${CD.yellow}; outline-offset:2px }
        .fade { animation: fi .35s ease }
        @keyframes fi { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
        @media (prefers-reduced-motion: reduce){ .fade,.opt{animation:none;transition:none} }
      `}</style>

      <div className="max-w-4xl mx-auto px-5 py-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="block w-2 h-2 rounded-full" style={{ background: CD.celcom }} />
            <span className="block w-2 h-2 rounded-full" style={{ background: CD.yellow }} />
            <span className="b" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.55)" }}>
              SALES GROUND EVENTS &amp; PARTNERSHIP SPECIALIST
            </span>
          </div>
          <button onClick={() => setShowJD(!showJD)} className="b" style={{
            background: "none", border: "1px solid rgba(255,255,255,.25)", color: "rgba(255,255,255,.7)",
            fontSize: 12, padding: "6px 14px", borderRadius: 99, cursor: "pointer" }}>
            {showJD ? "Hide" : "All 16 types"}
          </button>
        </div>

        {/* ------------------------ 16-TYPE REFERENCE ------------------------ */}
        {showJD && (
          <div className="fade mb-10">
            <h2 className="h mb-2" style={{ fontWeight: 300, fontSize: 28 }}>All 16 types, ranked against this JD</h2>
            <p className="b mb-6" style={{ fontSize: 13.5, color: "rgba(255,255,255,.6)", lineHeight: 1.6, maxWidth: 660 }}>
              The JD names timelines, deliverables, documentation, reporting accuracy and budget compliance far more
              often than it names creative ideas. That pushes the ideal profile toward organised and outward-facing.
              Fit scores below come from the same model the test uses.
            </p>
            {tiers.map((tier) => (
              <div key={tier.label} className="mb-6">
                <div className="h mb-3" style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, color: tier.color }}>
                  {tier.label.toUpperCase()}
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {tier.types.map((k) => {
                    const t = TYPES[k];
                    return (
                      <div key={k} className="p-4 rounded-xl" style={{ background: "rgba(255,255,255,.05)", borderLeft: `3px solid ${tier.color}` }}>
                        <div className="flex justify-between items-baseline mb-1">
                          <div className="h" style={{ fontWeight: 600, fontSize: 17, color: CD.yellow, letterSpacing: 1 }}>
                            {k} <span style={{ fontWeight: 300, color: CD.white, fontSize: 14, letterSpacing: 0 }}>· {t.name}</span>
                          </div>
                          <div className="h" style={{ fontWeight: 600, fontSize: 16, color: tier.color }}>{t.fit}</div>
                        </div>
                        <div className="b" style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", lineHeight: 1.5, marginBottom: 8 }}>{t.core}</div>
                        <div className="b" style={{ fontSize: 12.5, lineHeight: 1.5, marginBottom: 4 }}>
                          <span style={{ color: CD.ice }}>Superpower · </span><span style={{ color: "rgba(255,255,255,.8)" }}>{t.super}</span>
                        </div>
                        <div className="b" style={{ fontSize: 12.5, lineHeight: 1.5, marginBottom: 6 }}>
                          <span style={{ color: "#F9B073" }}>Risk · </span><span style={{ color: "rgba(255,255,255,.8)" }}>{t.risk}</span>
                        </div>
                        <div className="b" style={{ fontSize: 11.5, color: "rgba(255,255,255,.45)" }}>Lane: {t.lane}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ------------------------------ INTRO ------------------------------ */}
        {stage === "intro" && !showJD && (
          <div className="fade">
            <h1 className="h mb-4" style={{ fontWeight: 300, fontSize: 44, lineHeight: 1.15 }}>
              Does this person<br />fit the <span style={{ color: CD.yellow, fontWeight: 600 }}>JD?</span>
            </h1>
            <p className="b mb-8" style={{ fontSize: 16, color: "rgba(255,255,255,.75)", maxWidth: 600, lineHeight: 1.65 }}>
              Twenty questions, each one built from a line in the Sales Ground Events &amp; Partnership Specialist
              job description — the 7am promoter briefing, the CI artwork check, the vendor who under-delivered twice,
              the venue that moves load-in with 24 hours' notice. Answer as you actually are, not as a good events
              person is supposed to be. Four minutes.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-8" style={{ maxWidth: 560 }}>
              {Object.entries(pillar).map(([k, v]) => (
                <div key={k} className="p-3 rounded-lg" style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)" }}>
                  <div className="h" style={{ fontWeight: 600, fontSize: 12, color: CD.yellow, letterSpacing: 1 }}>{k}</div>
                  <div className="b" style={{ fontSize: 12.5, color: "rgba(255,255,255,.6)" }}>{v}</div>
                </div>
              ))}
            </div>
            <button onClick={() => setStage("quiz")} className="h px-8 py-4 rounded-full"
              style={{ background: CD.yellow, color: CD.navy, fontWeight: 600, fontSize: 15, border: "none", cursor: "pointer" }}>
              Start the test →
            </button>
            <p className="b mt-5" style={{ fontSize: 12, color: "rgba(255,255,255,.4)", maxWidth: 560, lineHeight: 1.5 }}>
              A development and lane-placement conversation starter. MBTI is not a validated selection instrument —
              don't use this to accept or reject a candidate.
            </p>
          </div>
        )}

        {/* ------------------------------ QUIZ ------------------------------- */}
        {stage === "quiz" && !showJD && (
          <div>
            <div className="mb-6">
              <div className="flex justify-between mb-2 b" style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>
                <span>Question {idx + 1} of {QUESTIONS.length}</span>
                <span style={{ color: CD.yellow }}>{pillar[q.axis]}</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,.12)" }}>
                <div className="h-1 rounded-full" style={{ width: `${(done / QUESTIONS.length) * 100}%`, background: CD.yellow, transition: "width .3s ease" }} />
              </div>
            </div>
            <div key={idx} className="fade">
              <div className="b mb-3 pl-3" style={{ fontSize: 11.5, color: CD.ice, borderLeft: `2px solid ${CD.bright}`, lineHeight: 1.45 }}>
                JD: “{q.jd}”
              </div>
              <h2 className="h mb-6" style={{ fontWeight: 300, fontSize: 25, lineHeight: 1.35 }}>{q.q}</h2>
              {["a", "b"].map((k) => (
                <button key={k} onClick={() => pick(k)} className="opt b w-full text-left p-5 mb-3 rounded-xl"
                  style={{
                    background: answers[idx] === k ? "rgba(255,224,0,.12)" : "rgba(255,255,255,.05)",
                    border: `1px solid ${answers[idx] === k ? CD.yellow : "rgba(255,255,255,.14)"}`,
                    color: CD.white, fontSize: 15, lineHeight: 1.5, cursor: "pointer" }}>
                  <span className="h mr-3" style={{ color: CD.yellow, fontWeight: 600, fontSize: 13 }}>{k.toUpperCase()}</span>
                  {q[k]}
                </button>
              ))}
            </div>
            <div className="flex gap-4 mt-4">
              {idx > 0 && <button onClick={() => setIdx(idx - 1)} className="b" style={{ background: "none", border: "none", color: "rgba(255,255,255,.5)", fontSize: 13, cursor: "pointer" }}>← Back</button>}
              <button onClick={reset} className="b" style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", fontSize: 13, cursor: "pointer" }}>Start over</button>
            </div>
          </div>
        )}

        {/* ----------------------------- RESULT ------------------------------ */}
        {stage === "result" && result && !showJD && (() => {
          const b = band(result.fit), t = TYPES[result.type], lane = LANES[result.lane], ins = insights(result.pct, result.c);
          return (
            <div className="fade">
              <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
                <Gauge value={result.fit} color={b.color} />
                <div>
                  <div className="b mb-1" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.5)" }}>YOUR TYPE</div>
                  <div className="h" style={{ fontWeight: 600, fontSize: 40, color: CD.yellow, letterSpacing: 2 }}>{result.type}</div>
                  <div className="h" style={{ fontWeight: 300, fontSize: 20 }}>{t.name} · {t.nick}</div>
                  <div className="b mt-2" style={{ fontSize: 14, color: "rgba(255,255,255,.7)", maxWidth: 420, lineHeight: 1.55 }}>{t.core}</div>
                </div>
              </div>

              <div className="p-5 rounded-xl mb-8" style={{ background: "rgba(255,255,255,.05)", borderLeft: `3px solid ${b.color}` }}>
                <div className="h mb-1" style={{ fontWeight: 600, fontSize: 17, color: b.color }}>{b.label}</div>
                <div className="b" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>{b.note}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="h mb-4" style={{ fontWeight: 600, fontSize: 13, letterSpacing: 1, color: "rgba(255,255,255,.6)" }}>YOUR AXES</div>
                  <AxisBar left="Extraverted" right="Introverted" value={result.pct.E} />
                  <AxisBar left="Sensing" right="Intuitive" value={result.pct.S} />
                  <AxisBar left="Thinking" right="Feeling" value={result.pct.T} />
                  <AxisBar left="Judging" right="Perceiving" value={result.pct.J} />
                </div>
                <div>
                  <div className="h mb-2" style={{ fontWeight: 600, fontSize: 13, letterSpacing: 1, color: "rgba(255,255,255,.6)" }}>AGAINST THE JD'S SIX DEMANDS</div>
                  <Radar c={result.c} />
                </div>
              </div>

              <div className="p-5 rounded-xl mb-8" style={{ background: "linear-gradient(120deg, rgba(0,100,220,.25), rgba(0,155,223,.08))", border: "1px solid rgba(126,211,241,.25)" }}>
                <div className="b mb-1" style={{ fontSize: 11, letterSpacing: 2, color: CD.ice }}>BEST LANE IN THE TEAM</div>
                <div className="h" style={{ fontWeight: 600, fontSize: 22 }}>{lane.name} <span style={{ color: CD.yellow, fontWeight: 300 }}>· {lane.tag}</span></div>
                <div className="b mt-2 mb-4" style={{ fontSize: 14, color: "rgba(255,255,255,.75)", lineHeight: 1.6 }}>{lane.desc}</div>
                {Object.entries(result.laneScores).sort((a, c2) => c2[1] - a[1]).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-3 mb-2">
                    <span className="b" style={{ fontSize: 12, width: 170, color: k === result.lane ? CD.yellow : "rgba(255,255,255,.55)" }}>{LANES[k].name}</span>
                    <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,.12)" }}>
                      <div className="h-1.5 rounded-full" style={{ width: `${v}%`, background: k === result.lane ? CD.yellow : "rgba(255,255,255,.3)" }} />
                    </div>
                    <span className="b" style={{ fontSize: 11, color: "rgba(255,255,255,.4)", width: 26 }}>{Math.round(v)}</span>
                  </div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-5 mb-8">
                <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,.05)" }}>
                  <div className="h mb-3" style={{ fontWeight: 600, fontSize: 14, color: CD.yellow }}>What you bring to this JD</div>
                  {ins.s.map((x, i) => (
                    <div key={i} className="b flex gap-2 mb-3" style={{ fontSize: 13.5, color: "rgba(255,255,255,.8)", lineHeight: 1.55 }}>
                      <span style={{ color: CD.yellow }}>▸</span>{x}
                    </div>
                  ))}
                </div>
                <div className="p-5 rounded-xl" style={{ background: "rgba(255,255,255,.05)" }}>
                  <div className="h mb-3" style={{ fontWeight: 600, fontSize: 14, color: CD.ice }}>Where the JD will stretch you</div>
                  {ins.w.map((x, i) => (
                    <div key={i} className="b flex gap-2 mb-3" style={{ fontSize: 13.5, color: "rgba(255,255,255,.8)", lineHeight: 1.55 }}>
                      <span style={{ color: CD.ice }}>▸</span>{x}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button onClick={reset} className="h px-7 py-3 rounded-full"
                  style={{ background: "transparent", color: CD.yellow, fontWeight: 600, fontSize: 14, border: `1px solid ${CD.yellow}`, cursor: "pointer" }}>
                  Take it again
                </button>
                <button onClick={() => setShowJD(true)} className="h px-7 py-3 rounded-full"
                  style={{ background: "transparent", color: "rgba(255,255,255,.7)", fontWeight: 600, fontSize: 14, border: "1px solid rgba(255,255,255,.25)", cursor: "pointer" }}>
                  See all 16 types
                </button>
              </div>
            </div>
          );
        })()}

        <div className="b mt-12 pt-5" style={{ fontSize: 10.5, color: "rgba(255,255,255,.35)", borderTop: "1px solid rgba(255,255,255,.1)", lineHeight: 1.6 }}>
          Internal Only · Indicative profiling tool for team development and lane placement, mapped to the Sales Ground
          Events &amp; Partnership Specialist job description. MBTI is not a validated selection instrument and must not
          be used as a basis for hiring, promotion or performance decisions.
        </div>
      </div>
    </div>
  );
}
