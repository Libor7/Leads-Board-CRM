import { createRoute } from "@tanstack/react-router";

import { pipelineRoute } from "./pipeline";
import LeadsLayout from "@/layouts/LeadsLayout";
import LeadsPipeline from "@/features/leads/components/LeadsPipeline/LeadsPipeline";
import LeadDetailPage from "@/pages/LeadDetailPage";

export const leadsRoute = createRoute({
  getParentRoute: () => pipelineRoute,
  path: "leads",
  component: LeadsLayout,
});

export const leadsIndexRoute = createRoute({
  getParentRoute: () => leadsRoute,
  path: "/",
  component: LeadsPipeline,
});

export const leadDetailRoute = createRoute({
  getParentRoute: () => leadsRoute,
  path: "$id",
  parseParams: (params) => ({
    id: params.id,
  }),
  component: LeadDetailPage,
});
