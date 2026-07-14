import { getMoments } from "@/lib/markdown";
import FadeIn from "@/components/FadeIn";
import MomentCard from "@/components/MomentCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "瞬间 - 静谧录",
};

export default function MomentsPage() {
  const moments = getMoments();

  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-16">
      <FadeIn>
        <h1 className="text-3xl font-bold text-[#1e2d3d] mb-2">瞬间</h1>
        <p className="text-[#5a6d7e] mb-8">捕捉生活中的碎片。</p>
      </FadeIn>

      {moments.length === 0 ? (
        <FadeIn>
          <p className="text-[#8899aa] text-center py-20">暂无瞬间</p>
        </FadeIn>
      ) : (
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {moments.map((m, i) => (
            <FadeIn key={m.slug} delay={i * 0.05}>
              <MomentCard moment={m} />
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
