import { ErrorBoundary } from "@/shared/components";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
