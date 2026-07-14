import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-[#e0e2db] py-8 mt-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-sm text-[#8899aa]">
          &copy; {new Date().getFullYear()} {SITE.name}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
