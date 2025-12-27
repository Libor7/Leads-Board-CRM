import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";

import { rootRoute } from "@/routes/root";
import { pipelineRoute } from "@/routes/pipeline";
import { leadsRoute, leadDetailRoute, leadsIndexRoute } from "@/routes/leads";
import { LeadsProvider } from "@/context/leads/leads-provider";
import { rootIndexRoute } from "@/routes/root-index";
import { pipelineIndexRoute } from "@/routes/pipeline-index";
import NotFoundPage from "@/pages/NotFoundPage";
import "@/index.css";

const routeTree = rootRoute.addChildren([
  rootIndexRoute,
  pipelineRoute.addChildren([
    pipelineIndexRoute,
    leadsRoute.addChildren([leadsIndexRoute, leadDetailRoute]),
  ]),
]);

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: NotFoundPage,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LeadsProvider>
      <RouterProvider router={router} />
    </LeadsProvider>
  </StrictMode>
);
