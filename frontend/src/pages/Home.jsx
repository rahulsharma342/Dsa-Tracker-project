import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

/* ─── Data ─────────────────────────────────────── */
const STATS = [
  { value: "450+", label: "Problems" },
  { value: "15+", label: "Topics" },
  { value: "12k+", label: "Users" },
  { value: "Free", label: "Forever" },
];

const PROGRESS_BARS = [
  { label: "Arrays", width: "85%", color: "#6366f1" },
  { label: "Trees", width: "65%", color: "#4ade80" },
  { label: "Graphs", width: "45%", color: "#facc15" },
  { label: "DP", width: "30%", color: "#f87171" },
];

const FEATURES = [
  {
    icon: "📊",
    title: "Smart dashboard",
    desc: "See your solved count, difficulty split, streaks, and accuracy — all at a glance every day.",
  },
  {
    icon: "✅",
    title: "Problem tracker",
    desc: "Mark problems solved, attempted, or pending. Add personal notes and tag by topic.",
  },
  {
    icon: "🔥",
    title: "Daily streaks",
    desc: "Build a consistent habit. Visual streak counter and activity heatmap keep you motivated.",
  },
  {
    icon: "📈",
    title: "Deep analytics",
    desc: "Weekly bar charts, topic-wise progress, and submission accuracy breakdowns in one view.",
  },
  {
    icon: "🧭",
    title: "Topic roadmap",
    desc: "Browse Arrays, Trees, Graphs, DP, and more. Know exactly what to tackle next.",
  },
  {
    icon: "⭐",
    title: "Bookmarks",
    desc: "Star hard problems you want to revisit. Your personal revision list — always ready.",
  },
];

const STEPS = [
  {
    num: "1",
    title: "Sign up free",
    desc: "Create your account in 30 seconds. No credit card needed.",
  },
  {
    num: "2",
    title: "Pick a topic",
    desc: "Choose from Arrays, Trees, DP, Graphs, and more.",
  },
  {
    num: "3",
    title: "Solve & log",
    desc: "Solve problems anywhere. Mark them solved and add notes.",
  },
  {
    num: "4",
    title: "Watch growth",
    desc: "Analytics update live. See your progress compound daily.",
  },
];

const TESTIMONIALS = [
  {
    initials: "AK",
    name: "Arjun Kumar",
    role: "SDE at Google",
    text: "Finally got my Google offer after 3 months of consistent tracking on DSATrack. The streak feature kept me accountable every single day.",
  },
  {
    initials: "PS",
    name: "Priya Sharma",
    role: "SDE2 at Amazon",
    text: "The topic-wise progress bars made it super clear where my weak spots were. Fixed my DP and Trees in just 4 weeks.",
  },
  {
    initials: "RV",
    name: "Rohan Verma",
    role: "Backend eng. at Flipkart",
    text: "Simple, focused, and actually useful. No distractions — just your problems, your notes, and your progress. Love it.",
  },
];

/* ─── Star Rating ───────────────────────────────── */
const Stars = () => (
  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
    {[...Array(5)].map((_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 20 20" fill="#facc15">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

/* ─── Component ─────────────────────────────────── */
export default function Home() {
  return (
    <div
      style={{
        fontFamily: "'Sora','Segoe UI',sans-serif",
        background: "#0f0f0f",
        color: "#fff",
        paddingTop: 70,
        overflowX: "hidden",
      }}
    >
      {/* ══ SECTION 1 — Hero ══════════════════════════════ */}
      <section
        style={{
          minHeight: "calc(100vh - 70px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              "linear-gradient(to right,#ffffff0f 1px,transparent 1px)," +
              "linear-gradient(to bottom,#ffffff0f 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 720,
            width: "100%",
          }}
        >
          {/* Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #374151",
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: 13,
              marginBottom: 28,
              background: "#1a1a1a",
              color: "#d1d5db",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
              }}
            />
            12,000+ developers already tracking
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 20,
              letterSpacing: "-1px",
            }}
          >
            Master DSA.
            <br />
            <span style={{ color: "#6366f1" }}>Track every problem.</span>
            <br />
            <span style={{ color: "#4ade80" }}>Land your dream job.</span>
          </h1>

          {/* Sub */}
          <p
            style={{
              color: "#9ca3af",
              fontSize: "clamp(14px,2vw,16px)",
              lineHeight: 1.8,
              maxWidth: 520,
              margin: "0 auto 36px",
            }}
          >
            The smartest way to practice Data Structures & Algorithms — with
            progress tracking, topic analytics, and streaks that keep you
            consistent.
          </p>

          {/* Buttons */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              marginBottom: 56,
            }}
          >
            <Link
              to="/register"
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "1px solid #6b7280",
                background: "transparent",
                color: "#fff",
                fontSize: 14,
                fontWeight: 500,
                textDecoration: "none",
                transition: "all .2s",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#fff";
              }}
            >
              Start tracking for free
            </Link>
            <button
              style={{
                padding: "12px 28px",
                borderRadius: 10,
                border: "1px solid #374151",
                background: "transparent",
                color: "#9ca3af",
                fontSize: 14,
                cursor: "pointer",
              }}
            >
              See how it works
            </button>
          </div>

          {/* Stats grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
              gap: 0,
              border: "1px solid #1f2937",
              borderRadius: 16,
              background: "#141414",
              overflow: "hidden",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "20px 16px",
                  textAlign: "center",
                  borderRight:
                    i < STATS.length - 1 ? "1px solid #1f2937" : "none",
                }}
              >
                <div
                  style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 700 }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — App Preview ═══════════════════════ */}
      <section style={{ background: "#0f0f0f", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p
            style={{
              color: "#6366f1",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            App preview
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700 }}>
            Everything in one place
          </h2>
        </div>

        <div
          style={{
            maxWidth: 860,
            margin: "0 auto",
            border: "1px solid #1f2937",
            borderRadius: 16,
            background: "#141414",
            overflow: "hidden",
          }}
        >
          {/* Window bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "12px 16px",
              borderBottom: "1px solid #1f2937",
            }}
          >
            {["#ef4444", "#eab308", "#22c55e"].map((c) => (
              <div
                key={c}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: "50%",
                  background: c,
                }}
              />
            ))}
            <span style={{ marginLeft: 12, fontSize: 12, color: "#6b7280" }}>
              dsatrack.app/dashboard
            </span>
          </div>

          {/* Body */}
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {/* Sidebar — hide on very small screens via min-width */}
            <div
              style={{
                width: 140,
                borderRight: "1px solid #1f2937",
                padding: "16px 12px",
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
                minWidth: 0,
              }}
            >
              {["Dashboard", "Problems", "Topics", "Progress", "Bookmarks"].map(
                (item, i) => (
                  <div
                    key={item}
                    style={{
                      fontSize: 13,
                      padding: "6px 8px",
                      borderRadius: 6,
                      background: i === 0 ? "#1f2937" : "transparent",
                      color: i === 0 ? "#fff" : "#6b7280",
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {item}
                  </div>
                ),
              )}
            </div>

            {/* Main */}
            <div style={{ flex: 1, padding: "20px 16px", minWidth: 0 }}>
              {/* Mini stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit,minmax(80px,1fr))",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                {[
                  { val: "248", lbl: "Solved", color: "#fff" },
                  { val: "120", lbl: "Easy", color: "#4ade80" },
                  { val: "98", lbl: "Medium", color: "#facc15" },
                  { val: "30", lbl: "Hard", color: "#f87171" },
                ].map((s) => (
                  <div
                    key={s.lbl}
                    style={{
                      border: "1px solid #374151",
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <div
                      style={{ fontSize: 16, fontWeight: 700, color: s.color }}
                    >
                      {s.val}
                    </div>
                    <div style={{ fontSize: 11, color: "#6b7280" }}>
                      {s.lbl}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bars */}
              <div
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                {PROGRESS_BARS.map((b) => (
                  <div key={b.label}>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#d1d5db",
                        marginBottom: 5,
                      }}
                    >
                      {b.label}
                    </div>
                    <div
                      style={{
                        height: 7,
                        background: "#1f2937",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: b.width,
                          background: b.color,
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3 — Features ══════════════════════════ */}
      <section style={{ background: "#0f0f0f", padding: "80px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <p
            style={{
              color: "#6366f1",
              fontSize: 12,
              letterSpacing: 2,
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Features
          </p>
          <h2 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700 }}>
            Built for serious learners
          </h2>
        </div>

        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {FEATURES.map((f) => (
            <div
              key={f.title}
              style={{
                border: "1px solid #1f2937",
                borderRadius: 14,
                padding: "24px 22px",
                background: "#141414",
                transition: "border-color .2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#4b5563")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#1f2937")
              }
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  background: "#1f2937",
                  fontSize: 20,
                  marginBottom: 16,
                }}
              >
                {f.icon}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.7 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ SECTION 4 — How it works ══════════════════════ */}
      <section
        style={{
          background: "linear-gradient(to right, #181818, #2d2d2d)",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <p
              style={{
                color: "#3b82f6",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              How it works
            </p>
            <h2
              style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 600 }}
            >
              Up and running in minutes
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 32,
              position: "relative",
            }}
          >
            {/* Connector line — only visible on wider screens, done via inline style trick */}
            {STEPS.map((s, i) => (
              <div
                key={s.num}
                style={{ textAlign: "center", position: "relative" }}
              >
                {/* Line after each step except last */}
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      display: "none", // hidden by default; shown via media query in CSS — use JS approach below
                    }}
                  />
                )}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid #4b5563",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 15,
                    fontWeight: 600,
                    margin: "0 auto 16px",
                    background: "#0f0f0f",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 5 — Testimonials ══════════════════════ */}
      <section style={{ background: "#0f0f0f", padding: "80px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                color: "#6366f1",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 8,
              }}
            >
              Testimonials
            </p>
            <h2
              style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 700 }}
            >
              Loved by developers
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  border: "1px solid #1f2937",
                  borderRadius: 14,
                  padding: "24px 22px",
                  background: "#141414",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#4b5563")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#1f2937")
                }
              >
                <Stars />
                <p
                  style={{
                    color: "#d1d5db",
                    fontSize: 14,
                    lineHeight: 1.75,
                    flex: 1,
                    marginBottom: 20,
                  }}
                >
                  "{t.text}"
                </p>
                <div
                  style={{
                    borderTop: "1px solid #1f2937",
                    paddingTop: 16,
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: "#1f2937",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#a5b4fc",
                      flexShrink: 0,
                    }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>
                      {t.name}
                    </div>
                    <div
                      style={{ fontSize: 12, color: "#818cf8", marginTop: 2 }}
                    >
                      {t.role}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SECTION 6 — CTA ═══════════════════════════════ */}
      <section
        style={{
          background: "#0f0f0f",
          borderTop: "1px solid #1f2937",
          padding: "80px 20px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto",  textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(5.8rem,5vw,3rem)",
              fontWeight: 700,
              letterSpacing: "-1px",
              lineHeight: 1.1,
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            Ready to crack your
            <br />
            next interview?
          </h2>
          <p
            style={{
              fontSize: "clamp(13px,2vw,16px)",
              color: "#9ca3af",
              marginBottom: 36,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            Join 12,000+ developers already tracking their DSA journey.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <Link
              to="/register"
              style={{
                padding: "13px 32px",
                borderRadius: 10,
                background: "#6366f1",
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
                border: "none",
              }}
            >
              Start for free
            </Link>
            <Link
              to="/problems"
              style={{
                padding: "13px 32px",
                borderRadius: 10,
                border: "1px solid #374151",
                color: "#9ca3af",
                fontSize: 14,
                textDecoration: "none",
              }}
            >
              Browse problems
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
