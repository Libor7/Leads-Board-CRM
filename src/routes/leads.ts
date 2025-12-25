import { createRoute } from "@tanstack/react-router";

import { rootRoute } from "./root";
import PipelinePage from "@/pages/PipelinePage";
import LeadDetailPage from "@/pages/LeadDetailPage";

export const leadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "leads",
  component: PipelinePage,
});

export const leadDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "leads/$id",
  component: LeadDetailPage,
});
