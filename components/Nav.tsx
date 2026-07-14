"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS, SITE } from "@/lib/constants";

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#f4f5f0]/85 backdrop-blur-sm border-b border-[#e0e2db]">
      <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-[#1e2d3d] font-bold text-lg tracking-wide no-underline hover:text-[#1e2d3d]"
        >
          {SITE.name}
        </Link>
        <div className="flex gap-5 items-center">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm tracking-wide no-underline transition-colors duration-200 ${
                pathname === href
                  ? "text-[#1e2d3d] font-medium"
                  : "text-[#5a6d7e] hover:text-[#1e2d3d]"
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            onClick={() => window.dispatchEvent(new Event("open-search"))}
            className="p-1 -mr-1 text-[#a0b0c0] hover:text-[#1e2d3d] transition-colors"
            title="搜索 (Ctrl+K)"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
