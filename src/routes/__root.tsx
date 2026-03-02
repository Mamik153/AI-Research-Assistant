import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen w-full bg-[#09090b] text-gray-200 overflow-x-hidden">
      <Outlet />
    </div>
  );
}
