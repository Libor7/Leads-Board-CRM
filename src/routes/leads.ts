import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import { pipelineRoute } from "./pipeline";
import LeadsLayout from "@/layouts/LeadsLayout";
import LeadsPipeline from "@/features/leads/components/LeadsPipeline/LeadsPipeline";
import { LEAD_STATUSES } from "@/types";

export const leadsRoute = createRoute({
  getParentRoute: () => pipelineRoute,
  path: "leads",
  component: LeadsLayout,
});

export const leadsIndexRoute = createRoute({
  getParentRoute: () => leadsRoute,
  path: "/",
  component: LeadsPipeline,
  validateSearch: (search) => ({
    status: Array.isArray(search.status) ? search.status : LEAD_STATUSES,
    tags: Array.isArray(search.tags) ? search.tags : [],
  }),
});

export const leadDetailRoute = createRoute({
  getParentRoute: () => leadsRoute,
  path: "$id",
  parseParams: (params) => ({
    id: params.id,
  }),
  component: lazyRouteComponent(() => import("@/pages/LeadDetailPage")),
});
