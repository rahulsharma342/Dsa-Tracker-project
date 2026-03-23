import React, { useEffect, useState } from "react";
import { useProblem } from "../hooks/useProblems.js";
import { useProgress } from "../hooks/useProgress.js";

// ── Platform detector ──────────────────────────────────────────────
const getPlatform = (url = "") => {
  if (!url) return { name: "Link", textColor: "text-gray-400", borderColor: "border-gray-700", bg: "bg-gray-800" };
  if (url.includes("leetcode.com"))
    return { name: "LeetCode", textColor: "text-[#FFA116]", borderColor: "border-[#FFA11640]", bg: "bg-[#2a1f00]" };
  if (url.includes("geeksforgeeks.org") || url.includes("gfg"))
    return { name: "GFG", textColor: "text-[#2F8D46]", borderColor: "border-[#2F8D4640]", bg: "bg-[#0d1f10]" };
  if (url.includes("codingninjas.com") || url.includes("naukri.com"))
    return { name: "CN", textColor: "text-[#F4814A]", borderColor: "border-[#F4814A40]", bg: "bg-[#2a1500]" };
  if (url.includes("hackerrank.com"))
    return { name: "HR", textColor: "text-[#00EA64]", borderColor: "border-[#00EA6440]", bg: "bg-[#001a0e]" };
  if (url.includes("codeforces.com"))
    return { name: "CF", textColor: "text-[#1F8ACB]", borderColor: "border-[#1F8ACB40]", bg: "bg-[#001826]" };
  return { name: "Solve", textColor: "text-gray-400", borderColor: "border-gray-700", bg: "bg-gray-800" };
};

// ── Open external link in new tab ─────────────────────────────────
const openExternal = (url) => {
  if (!url) return;
  const href = url.startsWith("http") ? url : `https://${url}`;
  window.open(href, "_blank", "noopener,noreferrer");
};

const Problems = () => {
  const { problems, loading, getProblems, toggleBookmark } = useProblem();
  const { updateProblemProgress } = useProgress();

  const [search,  setSearch]  = useState("");
  const [filter,  setFilter]  = useState("All");
  const [solved,  setSolved]  = useState([]);
  const [hovered, setHovered] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    getProblems();
    const stored = JSON.parse(localStorage.getItem("solved")) || [];
    setSolved(stored);
  }, []);

  const toggleSolved = async (id) => {
    const isSolved = solved.includes(id);
    const newStatus = isSolved ? "unsolved" : "solved";
    
    setUpdatingId(id);
    try {
      await updateProblemProgress(id, { status: newStatus });
      
      const updated = isSolved
        ? solved.filter((i) => i !== id)
        : [...solved, id];
      setSolved(updated);
      localStorage.setItem("solved", JSON.stringify(updated));
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredProblems = problems.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" ? true : p.difficulty === filter;
    return matchSearch && matchFilter;
  });

  // Stats
  const easy   = problems.filter((p) => p.difficulty === "Easy"   && solved.includes(p._id)).length;
  const medium = problems.filter((p) => p.difficulty === "Medium" && solved.includes(p._id)).length;
  const hard   = problems.filter((p) => p.difficulty === "Hard"   && solved.includes(p._id)).length;

  const FILTERS = ["All", "Easy", "Medium", "Hard"];

  const filterStyles = {
    All:    { active: "bg-indigo-500/20 text-indigo-400 border-indigo-500/40",    inactive: "text-gray-400 border-white/10 hover:bg-white/5" },
    Easy:   { active: "bg-green-500/15 text-green-400 border-green-500/40",       inactive: "text-gray-400 border-white/10 hover:bg-white/5" },
    Medium: { active: "bg-yellow-500/15 text-yellow-400 border-yellow-500/40",    inactive: "text-gray-400 border-white/10 hover:bg-white/5" },
    Hard:   { active: "bg-red-500/15 text-red-400 border-red-500/40",             inactive: "text-gray-400 border-white/10 hover:bg-white/5" },
  };

  const diffStyles = {
    Easy:   "text-green-400 bg-green-400/10 border border-green-400/25",
    Medium: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/25",
    Hard:   "text-red-400 bg-red-400/10 border border-red-400/25",
  };

  return (
    /* ── Full viewport wrapper — accounts for fixed navbar ── */
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white font-['Sora','Segoe_UI',sans-serif]">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">

        {/* ══ HEADER ══════════════════════════════════════ */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Problems</h1>
            <p className="text-gray-500 text-sm mt-1">
              {solved.length} of {problems.length} solved
            </p>
          </div>

          {/* Stat chips */}
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Easy",   count: easy,   cls: "text-green-400"  },
              { label: "Medium", count: medium, cls: "text-yellow-400" },
              { label: "Hard",   count: hard,   cls: "text-red-400"    },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-1 bg-[#141414] border border-white/[0.07] rounded-lg px-3 py-1.5 text-sm"
              >
                <span className={`font-bold ${s.cls}`}>{s.count}</span>
                <span className="text-gray-500">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══ TOOLBAR ═════════════════════════════════════ */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">

          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#141414] border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-indigo-500/50 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 text-sm"
              >
                ✕
              </button>
            )}
          </div>

          {/* Difficulty filters */}
          <div className="flex gap-2 flex-wrap">
            {FILTERS.map((level) => {
              const active = filter === level;
              return (
                <button
                  key={level}
                  onClick={() => setFilter(level)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                    active
                      ? filterStyles[level].active
                      : filterStyles[level].inactive
                  }`}
                >
                  {level}
                </button>
              );
            })}
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <p className="text-xs text-gray-600 mb-3">
            Showing {filteredProblems.length} problem
            {filteredProblems.length !== 1 ? "s" : ""}
            {filter !== "All" ? ` · ${filter}` : ""}
            {search ? ` · "${search}"` : ""}
          </p>
        )}

        {/* ══ LOADING ════════════════════════════════════ */}
        {loading && (
          <div className="flex items-center justify-center gap-3 py-16">
            <div className="w-5 h-5 rounded-full border-2 border-gray-800 border-t-indigo-500 animate-spin" />
            <span className="text-gray-500 text-sm">Loading problems...</span>
          </div>
        )}

        {/* ══ PROBLEMS LIST ════════════════════════════════ */}
        <div className="flex flex-col gap-2">
          {filteredProblems.map((p, index) => {
            const isSolved  = solved.includes(p._id);
            const platform  = getPlatform(p.link);
            const companies = Array.isArray(p.companyTags)
              ? p.companyTags
              : Array.isArray(p.companies)
              ? p.companies
              : p.company
              ? [p.company]
              : [];

            return (
              <div
                key={p._id}
                onMouseEnter={() => setHovered(p._id)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all duration-150 flex-wrap
                  ${hovered === p._id
                    ? "bg-[#1a1a1a] border-white/10"
                    : "bg-[#111111] border-white/[0.05]"}
                  ${isSolved ? "opacity-70" : "opacity-100"}
                `}
              >
                {/* ── LEFT ── */}
                <div className="flex items-center gap-3 flex-1 min-w-0">

                  {/* Custom checkbox */}
                  <label 
                    className={`cursor-pointer flex-shrink-0 ${updatingId === p._id ? 'opacity-50 cursor-wait' : ''}`} 
                    title={isSolved ? "Mark unsolved" : "Mark solved"}
                  >
                    <input
                      type="checkbox"
                      checked={isSolved}
                      onChange={() => toggleSolved(p._id)}
                      disabled={updatingId === p._id}
                      className="hidden"
                    />
                    <div className={`w-[18px] h-[18px] rounded-[5px] border-[1.5px] flex items-center justify-center transition-all
                      ${updatingId === p._id ? 'opacity-60' : ''}
                      ${isSolved
                        ? "bg-indigo-600 border-indigo-600"
                        : "bg-transparent border-gray-600 hover:border-indigo-500"}`}
                    >
                      {updatingId === p._id ? (
                        <div className="w-2 h-2 rounded-full border border-indigo-400 border-t-transparent animate-spin" />
                      ) : isSolved && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                  </label>

                  {/* Problem info section */}
                  <div className="flex flex-col gap-1 flex-1 min-w-0">
                    {/* Problem title */}
                    <p className="text-sm font-semibold text-gray-100 truncate hover:text-indigo-400 transition-colors">
                      {p.title}
                    </p>
                    
                    {/* Badges row */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Difficulty badge */}
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${diffStyles[p.difficulty]}`}>
                        {p.difficulty}
                      </span>

                      {/* Topic tag */}
                      {p.topic && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/[0.07] flex-shrink-0">
                          {p.topic}
                        </span>
                      )}

                      {/* Company tags */}
                      {companies.slice(0, 2).map((company) => (
                        <span
                          key={`${p._id}-${company}`}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 flex-shrink-0"
                        >
                          {company}
                        </span>
                      ))}
                      {companies.length > 2 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/25 flex-shrink-0">
                          +{companies.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── SOLVE button — opens external platform ── */}
                  <button
                    onClick={() => openExternal(p.link)}
                    disabled={!p.link}
                    title={p.link ? `Open on ${platform.name}` : "No link available"}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex-shrink-0
                      ${platform.textColor} ${platform.bg} ${platform.borderColor}
                      ${p.link
                        ? "cursor-pointer hover:brightness-125"
                        : "cursor-not-allowed opacity-40"}`}
                  >
                    {platform.name}
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M1 13 13 1M5 1h8v8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>

                {/* ── RIGHT ACTIONS ── */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {/* Revision */}
                  <button
                    title="Add to revision"
                    className="text-gray-600 hover:text-indigo-400 hover:bg-indigo-500/10 text-base px-2 py-1 rounded-lg transition-all flex-shrink-0"
                  >
                    ↻
                  </button>

                  {/* Bookmark */}
                  <button
                    onClick={() => toggleBookmark(p._id, p.isBookmarked)}
                    title={p.isBookmarked ? "Remove bookmark" : "Bookmark"}
                    className={`text-base px-2 py-1 rounded-lg transition-all flex-shrink-0
                      ${p.isBookmarked
                        ? "text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10"
                        : "text-gray-600 hover:text-yellow-400 hover:bg-yellow-400/10"}`}
                  >
                    {p.isBookmarked ? "★" : "☆"}
                  </button>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ══ EMPTY STATE ══════════════════════════════════ */}
        {!loading && filteredProblems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="text-5xl mb-4">🚫</span>
            <p className="text-gray-500 text-base mb-4">No problems found</p>
            {(search || filter !== "All") && (
              <button
                onClick={() => { setSearch(""); setFilter("All"); }}
                className="px-5 py-2 rounded-lg bg-indigo-500/15 border border-indigo-500/35 text-indigo-400 text-sm hover:bg-indigo-500/25 transition"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default Problems;