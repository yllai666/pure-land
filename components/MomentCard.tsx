import type { MomentMeta } from "@/lib/markdown";

export default function MomentCard({ moment }: { moment: MomentMeta }) {
  return (
    <div className="rounded-lg border border-[#e0e2db] overflow-hidden hover:-translate-y-1 hover:shadow-md transition-all duration-200">
      {moment.mediaUrl && moment.mediaType !== "none" && (
        <div className="w-full aspect-[4/3] overflow-hidden bg-[#e0e2db]/30">
          {moment.mediaType === "image" ? (
            <img
              src={moment.mediaUrl}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <video
              src={moment.mediaUrl}
              className="w-full h-full object-cover"
              controls
              muted
            />
          )}
        </div>
      )}
      <div className="p-4">
        <time className="text-xs text-[#a0b0c0] tracking-wider">
          {moment.date}
        </time>
        <p className="text-sm text-[#5a6d7e] mt-1 leading-relaxed line-clamp-3">
          {moment.text}
        </p>
      </div>
    </div>
  );
}
