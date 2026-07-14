"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Entry {
  type: "article" | "moment" | "project";
  slug: string;
  title: string;
  summary: string;
  text: string;
  date: string;
  tags: string[];
  mediaType?: string;
  url: string;
}

const ICON = {
  article: "文",
  moment: "瞬",
  project: "项",
} as const;

export default function SearchModal() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Entry[]>([]);
  const [results, setResults] = useState<Entry[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/search-data.json")
      .then((r) => r.json())
      .then(setData);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    const onSearch = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onSearch);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onSearch);
    };
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelected(0);
    }
  }, [open]);

  const search = useCallback(
    (q: string) => {
      setQuery(q);
      if (!q.trim() || !data.length) {
        setResults([]);
        return;
      }
      const lower = q.toLowerCase();
      const filtered = data
        .map((e) => {
          let score = 0;
          if (e.title.toLowerCase().includes(lower)) score += 10;
          if (e.summary.toLowerCase().includes(lower)) score += 5;
          if (e.text.toLowerCase().includes(lower)) score += 2;
          e.tags?.forEach((t) => {
            if (t.toLowerCase().includes(lower)) score += 3;
          });
          return { ...e, score };
        })
        .filter((e) => e.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      setResults(filtered);
      setSelected(0);
    },
    [data]
  );

  const navigate = (url: string) => {
    setOpen(false);
    router.push(url);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    }
    if (e.key === "Enter" && results[selected]) {
      navigate(results[selected].url);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-start justify-center pt-[15vh]">
      <div className="fixed inset-0 bg-[#1e2d3d]/30 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-lg mx-4 bg-[#f4f5f0] rounded-xl shadow-2xl border border-[#e0e2db] overflow-hidden">
        <div className="flex items-center px-4 border-b border-[#e0e2db]">
          <svg className="w-4 h-4 text-[#a0b0c0] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => search(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="搜索文章、瞬间、项目..."
            className="flex-1 px-3 py-3.5 bg-transparent text-[#1e2d3d] placeholder-[#a0b0c0] outline-none text-sm"
          />
          <kbd className="text-[10px] text-[#a0b0c0] bg-[#e0e2db]/50 px-1.5 py-0.5 rounded ml-2">ESC</kbd>
        </div>

        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto py-2">
            {results.map((item, i) => (
              <button
                key={`${item.type}-${item.slug}`}
                onClick={() => navigate(item.url)}
                className={`w-full text-left px-4 py-3 flex gap-3 items-start transition-colors ${
                  i === selected ? "bg-[#e0e2db]/50" : "hover:bg-[#e0e2db]/30"
                }`}
              >
                <span className="shrink-0 w-6 h-6 rounded-md bg-[#e0e2db]/60 text-[10px] font-bold text-[#5a6d7e] flex items-center justify-center mt-0.5">
                  {ICON[item.type]}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[#1e2d3d] truncate">
                    {item.title || item.summary.slice(0, 40)}
                  </div>
                  <div className="text-xs text-[#8899aa] truncate mt-0.5">
                    {item.date}
                    {item.tags?.length > 0 && ` · ${item.tags.join(", ")}`}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {query && results.length === 0 && (
          <div className="py-12 text-center text-sm text-[#a0b0c0]">没有找到结果</div>
        )}
      </div>
    </div>
  );
}
