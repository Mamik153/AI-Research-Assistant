export function FooterSection() {
  return (
    <footer className="pt-16 pb-8 px-4 sm:px-6 border-t border-white/10 overflow-hidden relative">
      <div className="max-w-6xl mx-auto flex flex-col items-center justify-center relative z-10 mb-20 px-4">
        <h1 className="text-[11vw] sm:text-[12vw] font-black tracking-tighter text-white/[0.15] leading-none whitespace-nowrap">
          SLICKRESEARCH
        </h1>
        <div className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} SlickResearch. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
