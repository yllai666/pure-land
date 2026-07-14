"use client";

import { useEffect, useRef } from "react";
import { GISCUS } from "@/lib/constants";

export default function Comment() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!GISCUS.repo || !GISCUS.repoId || !GISCUS.categoryId) return;
    if (ref.current?.querySelector("script")) return;

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", GISCUS.repo);
    script.setAttribute("data-repo-id", GISCUS.repoId);
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", GISCUS.categoryId);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");
    ref.current?.appendChild(script);
  }, []);

  if (!GISCUS.repo || !GISCUS.repoId || !GISCUS.categoryId) {
    return (
      <div className="mt-12 pt-8 border-t border-[#e0e2db] text-center text-sm text-[#a0b0c0]">
        评论区待配置
      </div>
    );
  }

  return <div ref={ref} className="mt-12 pt-8 border-t border-[#e0e2db]" />;
}
