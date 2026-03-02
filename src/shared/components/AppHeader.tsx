import { Link, useRouterState } from "@tanstack/react-router";

export function AppHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname }) ?? "/";

  return (
    <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between w-full bg-white/5 backdrop-blur-md pt-[calc(1.5rem+var(--safe-area-inset-top))] pb-6 px-4 sm:px-6">
      <div className="flex items-center justify-between max-w-6xl mx-auto w-full">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/90 no-underline hover:text-white transition-colors"
        >
          <img
            src="/logo1.png"
            alt="SlickResearch logo"
            className="h-8 w-auto object-contain rounded-full"
          />
          <span className="font-semibold tracking-wide text-xl">SlickResearch</span>
        </Link>
        <nav className="flex items-center gap-4">
          {pathname === "/" ? (
            <Link
              to="/app"
              className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-200 transition-colors no-underline text-sm"
            >
              Try it
            </Link>
          ) : (
            <Link
              to="/"
              className="text-gray-300 hover:text-white transition-colors no-underline text-sm font-medium"
            >
              Home
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
