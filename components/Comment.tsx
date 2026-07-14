"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { CUSDIS } from "@/lib/constants";

export default function Comment() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!CUSDIS.appId || !ref.current) return;
    if (ref.current.querySelector("iframe, #cusdis_thread script")) return;

    ref.current.innerHTML = "";
    const el = document.createElement("div");
    el.id = "cusdis_thread";
    el.setAttribute("data-host", CUSDIS.host);
    el.setAttribute("data-app-id", CUSDIS.appId);
    el.setAttribute("data-page-id", pathname);
    el.setAttribute("data-page-url", location.href);
    el.setAttribute("data-page-title", document.title);
    el.setAttribute("data-theme", CUSDIS.theme);
    ref.current.appendChild(el);

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = `${CUSDIS.host}/js/cusdis.es.js`;
    ref.current.appendChild(script);
  }, [pathname]);

  if (!CUSDIS.appId) {
    return (
      <div className="mt-12 pt-8 border-t border-[#e0e2db] text-center text-sm text-[#a0b0c0]">
        评论区待配置
      </div>
    );
  }

  return <div ref={ref} className="mt-12 pt-8 border-t border-[#e0e2db]" id="cusdis_thread" />;
}
