import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./root";
import PipelineLayout from "@/layouts/PipelineLayout/PipelineLayout";

export const pipelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "pipeline",
  component: PipelineLayout,
});
