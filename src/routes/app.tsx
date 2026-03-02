import { createFileRoute } from "@tanstack/react-router";
import { ResearchView } from "@/features/research";

export const Route = createFileRoute("/app")({
  component: ResearchView,
});
