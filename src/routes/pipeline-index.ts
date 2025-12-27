import { createRoute, redirect } from "@tanstack/react-router";
import { pipelineRoute } from "./pipeline";

export const pipelineIndexRoute = createRoute({
  getParentRoute: () => pipelineRoute,
  path: "/",
  beforeLoad: () => {
    throw redirect({ to: "/pipeline/leads" });
  },
});
